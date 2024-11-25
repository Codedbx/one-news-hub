<?php

namespace App\Repositories\Interfaces;

interface ArticleRepositoryInterface
{
    public function getAllArticles(array $filters = []);
    public function getArticleById($id);
    public function saveArticle(array $data);
    public function updateArticle($id, array $data);
    public function saveArticleIfNotExists($data);
    public function deleteArticle($id);
}
