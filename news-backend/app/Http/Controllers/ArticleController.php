<?php

namespace App\Http\Controllers;

use App\Services\ArticleService;
use App\Services\NewsAggregatorService;
use App\Services\NewsApi\NewsApiService;
use App\Transformers\UtilResource;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ArticleController extends Controller
{

    protected $newsAggregatorService;

    public function __construct(NewsAggregatorService $newsAggregatorService)
    {
        $this->newsAggregatorService = $newsAggregatorService;
    }

    public function searchArticles(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'q' => 'nullable|string',
                'categories' => 'nullable|array',
                'sources' => 'nullable|array',
                'authors' => 'nullable|array',
                'from' => 'nullable|date_format:Y-m-d',
                'page' => 'nullable|integer|min:1',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 400);
            }

            $filters = $request->only(['q', 'categories', 'from', 'authors']);
            $page = $request->get('page', 1);
            $sources = $request->get('sources', []);

            $preferences = Auth::user()->preference;

            if ($preferences) {
                $filters['sources'] = array_merge($preferences->sources ?? [], $filters['sources'] ?? []);
                $filters['categories'] = array_merge($preferences->categories ?? [], $filters['categories'] ?? []);
                $filters['authors'] = array_merge($preferences->authors ?? [], $filters['authors'] ?? []);
            }

            $articles = $this->newsAggregatorService->fetchAndAggregateArticles(Auth::id(), $filters, $page, $sources);

            return new UtilResource($articles, false, 200);

        } catch (\Exception $e) {
            return new UtilResource($e->getMessage(), true,  500);
        }
    }

    // Get Personalized News Feed
    public function getPersonalizedFeed(Request $request)
    {
        
        try {
            $preferences = Auth::user()->preference;

            $filters = [];
            if ($preferences) {
                $filters['sources'] = $preferences->preferred_sources ?? [];
                $filters['categories'] = $preferences->preferred_categories;
                $filters['authors'] = $preferences->preferred_authors;
            }
            
            $page = $request->get('page', 1);  

            $articles = $this->newsAggregatorService->fetchAndAggregateArticles(Auth::id(), $filters, $page);

            return new UtilResource($articles, false, 200);
        } catch (\Exception $e) {
             return new UtilResource($e->getMessage(), true,  500);
        }
    }

    // protected $articleService;

    // public function __construct(ArticleService $articleService)
    // {
    //     $this->articleService = $articleService;
    // }

    // protected $newsApiService;


    // public function __construct(NewsApiService $newsApiService)
    // {
    //     $this->newsApiService = $newsApiService;
    // }

    // public function testApi()
    // {
    //     $response = $this->newsApiService->searchArticles(['q' => 'technology']);
    //     return response()->json($response);
    // }
    // private $newsAggregatorService;

    // public function __construct(NewsAggregatorService $newsAggregatorService)
    // {
    //     $this->newsAggregatorService = $newsAggregatorService;
    // }

    // public function index(Request $request)
    // {
    //     $filters = $request->only(['category', 'author']);
    //     $userId = auth()->id();

    //     // Get cached or pre-stored articles
    //     $articles = $this->newsAggregatorService->getPersonalizedFeed($userId, $filters);

    //     // Dispatch background job to update articles asynchronously
    //     \App\Jobs\UpdateArticlesJob::dispatch($filters);

    //     return response()->json($articles);
    // }

    // public function index(Request $request)
    // {
    //     try {
    //         // $articles = $this->articleService->getAllArticles($request->all());

    //         $filters = $request->only(['sources', 'categories', 'authors', 'date_range']);
    //     $articles = $this->articleService->getAllArticles($filters);
    //         return new UtilResource($articles, false, 200);
    //     } catch (\Exception $e) {
    //         return new UtilResource($e->getMessage(), true,  500);
    //     }
    // }

    // public function getPersonalizedFeed(Request $request)
    // {
    //     $userId = $request->user()->id; // Assume the user is authenticated
    //     $filters = $request->only(['date_range', 'sources', 'categories', 'authors']);

    //     // $personalizedFeed = $this->newsAggregatorService->getPersonalizedFeed($userId, $filters);

    //     // return response()->json($personalizedFeed);
    // }
    

    // public function show($id)
    // {
    //     try {
    //         $article = $this->articleService->getArticleById($id);
    //         if (!$article) {
    //             throw new \Exception('Article not found.');
    //         }
    //         return new UtilResource($article, false, 200);
    //     } catch(ModelNotFoundException $e)  {
    //         return new UtilResource($e->getMessage(), true,  404);
    //     }
    //     catch (\Exception $e) {
    //         return new UtilResource($e->getMessage(), true,  500);
    //     }
    // }

    // public function store(Request $request)
    // {
    //     try {
    //         $validatedData = $request->validate([
    //             'title' => 'required|max:255',
    //             'description' => 'required',
    //             'author' => 'required',
    //             'source' => 'required',
    //             'url' => 'required|url',
    //             'published_at' => 'required|date',
    //         ]);

    //         $article = $this->articleService->saveArticle($validatedData);
    //         return new UtilResource($article, false, 201);
    //     } catch (\Exception $e) {
    //         return new UtilResource($e->getMessage(), true,  500);
    //     }
    // }

    // public function update(Request $request, $id)
    // {
    //     try {
    //         $validatedData = $request->validate([
    //             'title' => 'sometimes|required|max:255',
    //             'description' => 'sometimes|required',
    //             'author' => 'sometimes|required',
    //             'source' => 'sometimes|required',
    //             'url' => 'sometimes|required|url',
    //             'published_at' => 'sometimes|required|date',
    //         ]);

    //         $article = $this->articleService->updateArticle($id, $validatedData);
    //         if (!$article) {
    //             throw new \Exception('Article not found.');
    //         }
    //         return new UtilResource($article, false, 200);
    //     } catch (\Exception $e) {
    //         return new UtilResource($e->getMessage(), true,  500);
    //     }
    // }

    // public function destroy($id)
    // {
    //     try {
    //         $result = $this->articleService->deleteArticle($id);
    //         if (!$result) {
    //             throw new \Exception('Article not found.');
    //         }
    //         return new UtilResource("Deleted successfully", false, 204);
    //     } catch (\Exception $e) {
    //         return new UtilResource($e->getMessage(), true,  500);
    //     }
    // }
}

