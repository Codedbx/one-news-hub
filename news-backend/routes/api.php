<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\UserPreferenceController;
use App\Jobs\UpdateArticlesJob;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


//Testing News with Backgroud Job

Route::get('/test-update-articles', function () {
    $filters = ['q' => 'technology']; 
    UpdateArticlesJob::dispatch($filters);
    return 'Job dispatched!';
});






//project routes
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user/validate', [AuthController::class, 'validate']);
    

    Route::get('/preferences/{id}', [UserPreferenceController::class, 'show']);
    Route::post('/preferences', [UserPreferenceController::class, 'store']);

    // Article search and personalized feed
    Route::get('/search-articles', [ArticleController::class, 'searchArticles']);
});
