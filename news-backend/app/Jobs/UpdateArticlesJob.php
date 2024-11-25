<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use App\Services\NewsApi\NewsAggregatorService;

class UpdateArticlesJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    private $filters;

    public function __construct($filters)
    {
        $this->filters = $filters;
    }

    /**
     * Execute the job.
     */
    public function handle(NewsAggregatorService $newsAggregatorService): void
    {
        $newsAggregatorService->fetchAndSyncArticles($this->filters);
    }
}
