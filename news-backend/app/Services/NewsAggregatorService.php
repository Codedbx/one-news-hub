<?php


namespace App\Services;

use App\Services\NewsApi\NewsApiService;
use App\Services\NewsApi\GuardianApiService;
use App\Services\NewsApi\NYTimesApiService;
use App\Services\UserPreferenceService;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class NewsAggregatorService
{
    private $newsApiService;
    private $guardianApiService;
    private $nyTimesApiService;

    public function __construct(
        NewsApiService $newsApiService,
        GuardianApiService $guardianApiService,
        NYTimesApiService $nyTimesApiService
    ) {
        $this->newsApiService = $newsApiService;
        $this->guardianApiService = $guardianApiService;
        $this->nyTimesApiService = $nyTimesApiService;
    }

    public function fetchAndAggregateArticles($userId, $filters = [], $page = 1, $desiredSources = [])
    {
        // Cache key based on user preferences and page number
        $cacheKey = "user_feed_{$userId}_" . md5(serialize($filters)) . "_page_{$page}";

        return Cache::remember($cacheKey, 30, function () use ($userId, $filters, $page, $desiredSources) {
            // Fetch user preferences
            $preferences = app(UserPreferenceService::class)->getUserPreferences($userId);
            
            // Merge preferences with provided filters
            $filters = array_merge($filters, array_filter([
                'categories' => $preferences['categories'] ?? null,
                'author' => $preferences['authors'] ?? null,
                'page' => $page, 
            ]));
            
            $desiredSources = !empty($desiredSources) ? $desiredSources : ($preferences['sources'] ?? []);

            Log::info("Filters in here: " . json_encode($filters));
            if (empty($filters['q'])) {
                $filters['q'] = 'latest'; // Default search term
            }

            // Fetch articles from multiple sources
            $newsApiArticles = $this->newsApiService->searchArticles($filters);
            $guardianArticles = $this->guardianApiService->searchArticles($filters);
            $nyTimesArticles = $this->nyTimesApiService->searchArticles($filters);

            // Normalize and merge the results
            $articles = array_merge(
                $this->normalizeNewsApiArticles($newsApiArticles),
                $this->normalizeGuardianArticles($guardianArticles),
                $this->normalizeNYTimesArticles($nyTimesArticles)
            );

            if (!empty($desiredSources)) {
                $articles = array_filter($articles, function ($article) use ($desiredSources) {
                    return in_array($article['source'], $desiredSources);
                });
            }

            return $articles;
        });
    }

    private function normalizeNewsApiArticles($response)
    {
        $articles = [];
        foreach ($response['articles'] as $article) {
            // Exclude articles with title "[Removed]"
            if ($article['title'] === '[Removed]') {
                continue;
            }
            $articles[] = [
                'title' => $article['title'],
                'description' => $article['description'],
                'source' => 'News API',
                'author' => $article['author'],
                'category' => $article['category'] ?? 'general',
                'published_at' => date('Y-m-d H:i:s', strtotime($article['publishedAt'])),
                'url' => $article['url'],
                'image_url' => $article['urlToImage']
            ];
        }
        return $articles;
    }

    private function normalizeGuardianArticles($response)
    {
        $articles = [];
        foreach ($response['response']['results'] as $article) {
            // Exclude articles with title "[Removed]"
            if ($article['webTitle'] === '[Removed]') {
                continue;
            }
            $articles[] = [
                'title' => $article['webTitle'],
                'content' => $article['fields']['bodyText'] ?? '',
                'source' => 'The Guardian',
                'author' => $article['fields']['byline'] ?? null,
                'category' => $article['sectionName'],
                'published_at' => date('Y-m-d H:i:s', strtotime($article['webPublicationDate'])),
                'url' => $article['webUrl'],
                'image_url' => $article['fields']['thumbnail'] ?? null
            ];
        }
        return $articles;
    }

    private function normalizeNYTimesArticles($response)
    {
        $articles = [];
        foreach ($response['response']['docs'] as $article) {
            // Exclude articles with title "[Removed]"
            if ($article['headline']['main'] === '[Removed]') {
                continue;
            }
            $articles[] = [
                'title' => $article['headline']['main'],
                'content' => $article['abstract'],
                'source' => 'The New York Times',
                'author' => $article['byline']['original'] ?? null,
                'category' => $article['section_name'],
                'published_at' => date('Y-m-d H:i:s', strtotime($article['pub_date'])),
                'url' => $article['web_url'],
                'image_url' => $article['multimedia'][0]['url'] ?? null
            ];
        }
        return $articles;
    }
}
