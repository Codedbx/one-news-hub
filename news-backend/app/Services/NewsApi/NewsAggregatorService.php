<?php

 /*****
  * 
**** initial approach storing Articles in DB
    had to change due to some bottle necks 

*******/



// namespace App\Services\NewsApi;

// use App\Repositories\Interfaces\ArticleRepositoryInterface;
// use App\Services\NewsApi\NewsApiService;
// use App\Services\NewsApi\NYTimesApiService;
// use App\Services\NewsApi\GuardianApiService;
// use App\Services\UserPreferenceService;
// use Illuminate\Support\Facades\Cache;
// use Illuminate\Support\Facades\Log;

// class NewsAggregatorService
// {

    // private $articleRepository;
    // private $newsApiService;
    // private $guardianApiService;
    // private $nyTimesApiService;

    // public function __construct(
    //     ArticleRepositoryInterface $articleRepository,
    //     NewsApiService $newsApiService,
    //     GuardianApiService $guardianApiService,
    //     NYTimesApiService $nyTimesApiService
    // ) {
    //     $this->articleRepository = $articleRepository;
    //     $this->newsApiService = $newsApiService;
    //     $this->guardianApiService = $guardianApiService;
    //     $this->nyTimesApiService = $nyTimesApiService;
    // }

    

    // public function fetchAndSyncArticles($filters = []) {
    //     $articles = [];

    //     // Fetch from APIs
    //     $newsApiArticles = $this->newsApiService->searchArticles($filters);
    //     $guardianArticles = $this->guardianApiService->searchArticles($filters);
    //     $nyTimesArticles = $this->nyTimesApiService->searchArticles($filters);

    //     // Log::info('Guardian Articles fetched', ['data' => $guardianArticles]);
    //     // Log::info('NY Times Articles fetched', ['data' => $nyTimesArticles]);

    //     // Normalize and merge results
    //     $articles = array_merge(
    //         $this->normalizeNewsApiArticles($newsApiArticles),
    //         $this->normalizeGuardianArticles($guardianArticles),
    //         $this->normalizeNYTimesArticles($nyTimesArticles)
    //     );

    //     // Log::info('Guardians articles to be saved', ['data' => $guardianArticles]); 
    //     Log::info('Guardians articles to be saved', ['data' => $articles]); 

    //     $articles = $this->filterRemovedArticles($articles);

    //     // // Save to the database
    //     foreach ($articles as $article) {
    //         $this->articleRepository->saveArticleIfNotExists($article); 
    //     }

    //     // return $articles;
    // }

    // private function filterRemovedArticles($articles) {
    //     return array_filter($articles, function($article) {
    //         return strpos($article['title'], '[Removed]') === false; 
    //     });
    // }

    // private function normalizeNewsApiArticles($response)
    // {
    //     $articles = [];
    //     foreach ($response['articles'] as $article) {
    //         $articles[] = [
    //             'title' => $article['title'],
    //             'description' => $article['description'],
    //             'source' => $article['source']['name'],
    //             'author' => $article['author'],
    //             'category' => $article['category'] ?? 'general',
    //             'published_at' => date('Y-m-d H:i:s', strtotime($article['publishedAt'])),
    //             'url' => $article['url'],
    //             'image_url' => $article['urlToImage']
    //         ];
    //     }
    //     return $articles;
    // }


    // private function normalizeGuardianArticles($response)
    // {
    //     $articles = [];
    //     foreach ($response['response']['results'] as $article) {
    //         $articles[] = [
    //             'title' => $article['webTitle'],
    //             'content' => $article['fields']['bodyText'] ?? '',
    //             'source' => 'The Guardian',
    //             'author' => $article['fields']['byline'] ?? null,
    //             'category' => $article['sectionName'],
    //             'published_at' => date('Y-m-d H:i:s', strtotime($article['webPublicationDate'])),
    //             'url' => $article['webUrl'],
    //             'image_url' => $article['fields']['thumbnail'] ?? null
    //         ];
    //     }
    //     return $articles;
    // }

    // private function normalizeNYTimesArticles($response)
    // {
    //     $articles = [];
    //     foreach ($response['response']['docs'] as $article) {
    //         $articles[] = [
    //             'title' => $article['headline']['main'],
    //             'content' => $article['abstract'],
    //             'source' => 'The New York Times',
    //             'author' => $article['byline']['original'] ?? null,
    //             'category' => $article['section_name'],
    //             'published_at' => date('Y-m-d H:i:s', strtotime($article['pub_date'])),
    //             'url' => $article['web_url'],
    //             'image_url' => $article['multimedia'][0]['url'] ?? null
    //         ];
    //     }
        
    //     return $articles;
    // }

    // public function getPersonalizedFeed($userId, $filters = [])
    // {
    //     $cacheKey = "user_feed_{$userId}_" . md5(serialize($filters));
        
    //     return Cache::remember($cacheKey, 3600, function () use ($userId, $filters) {
    //         $preferences = app(UserPreferenceService::class)->getUserPreferences($userId);
            
    //         $filters = array_merge($filters, [
    //             'sources' => $preferences['preferred_sources'] ?? [],
    //             'categories' => $preferences['preferred_categories'] ?? [],
    //             'authors' => $preferences['preferred_authors'] ?? [],
    //         ]);

    //         return $this->articleRepository->getAllArticles($filters);
    //     });
    // }
// }