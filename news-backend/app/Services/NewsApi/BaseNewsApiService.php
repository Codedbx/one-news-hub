<?php

namespace App\Services\NewsApi;

use Illuminate\Support\Facades\Http;
use App\Exceptions\NewsApiException;
use Illuminate\Support\Facades\Log;

abstract class BaseNewsApiService
{
    protected $baseUrl;
    protected $apiKey;

    public function __construct($apiKey = null)
    {
        $this->apiKey = $apiKey;
    }

    protected function makeRequest($endpoint, $params = [], $apiKeyParam = 'apiKey')
    {
        try {
            $response = Http::get($this->baseUrl . $endpoint, array_merge($params, [
                $apiKeyParam => $this->apiKey
            ]));

            if ($response->successful()) {
                return $response->json();
            }

            throw new NewsApiException("API request failed: " . $response->body());
        } catch (\Exception $e) {
            Log::error("Failed to fetch news: " . $e->getMessage());
            throw new NewsApiException("Failed to fetch news: " . $e->getMessage());
        }
    }
}
