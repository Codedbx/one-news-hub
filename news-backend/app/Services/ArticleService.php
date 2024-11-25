<?php

namespace App\Services;

use App\Repositories\ArticleRepository;

class ArticleService
{
    private $articleRepository;

    public function __construct(ArticleRepository $articleRepository)
    {
        $this->articleRepository = $articleRepository;
    }

    public function getAllArticles(array $filters = [])
    {
        return $this->articleRepository->getAllArticles($filters);
    } 
    public function getArticleById($id)
    {
        return $this->articleRepository->getArticleById($id);
    }

    public function saveArticle(array $data)
    {
        return $this->articleRepository->saveArticle($data);
    }

    public function saveArticleIfNotExists($data)
    {
        return $this->articleRepository->saveArticleIfNotExists($data);
    }

    public function updateArticle($id, array $data)
    {
        return $this->articleRepository->updateArticle($id, $data);
    }

    public function deleteArticle($id)
    {
        return $this->articleRepository->deleteArticle($id);
    }
    
}


