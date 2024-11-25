<?php

namespace App\Services\NewsApi;

use Illuminate\Support\Facades\Log;

class NewsApiService extends BaseNewsApiService
{
    public function __construct()
    {
        $this->baseUrl = 'https://newsapi.org/v2/';

        $this->apiKey = config('services.news_api.key'); 
    }

    public function getTopHeadlines($params = [])
    {
        return $this->makeRequest('top-headlines', $params);
    }

    public function searchArticles($params = [])
    {
        return $this->makeRequest('everything', $params);
    }
}