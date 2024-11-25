<?php   

namespace App\Services\NewsApi;


class NYTimesApiService extends BaseNewsApiService
{
    public function __construct()
    {
        $this->baseUrl = 'https://api.nytimes.com/svc/';
        $this->apiKey = config('services.nytimes_api.key'); 
    }

    public function searchArticles($params = [])
    {
        return $this->makeRequest('search/v2/articlesearch.json', $params, 'api-key');
    }
}