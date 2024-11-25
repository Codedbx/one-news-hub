<?php

namespace App\Repositories;

use App\Repositories\Interfaces\ArticleRepositoryInterface;
use App\Models\Article;

class ArticleRepository implements ArticleRepositoryInterface
{
    public function getAllArticles(array $filters = [])
    {
        return Article::filter($filters)->get();
    }
    public function getArticleById($id)
    {
        return Article::find($id);
    }

    public function saveArticle(array $data)
    {
        return Article::create($data);
    }

    public function updateArticle($id, array $data)
    {
        $article = Article::find($id);
        if ($article) {
            $article->update($data);
            return $article;
        }
        return null;
    }

    public function saveArticleIfNotExists($data)
    {
        return Article::updateOrCreate(
            ['url' => $data['url']], // Unique constraint
            $data
        );
    }

    public function deleteArticle($id)
    {
        return Article::destroy($id);
    }
}


