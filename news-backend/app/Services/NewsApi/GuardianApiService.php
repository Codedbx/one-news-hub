<?php

namespace App\Services\NewsApi;

class GuardianApiService extends BaseNewsApiService
{
    public function __construct()
    {
        $this->baseUrl = 'https://content.guardianapis.com/';
        $this->apiKey = config('services.guardian_api.key');
    }

    public function searchArticles($params = [])
    {
        return $this->makeRequest('search', $params, 'api-key');
    }
}
