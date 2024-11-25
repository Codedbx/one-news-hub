<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use EloquentFilter\Filterable;
use App\Filters\ArticleFilter;

class Article extends Model
{
    use Filterable;

    protected $fillable = ['title', 'description', 'category', 'author', 'source', 'url', 'published_at', 'image_url'];


    public function modelFilter()
    {
        return $this->provideFilter(ArticleFilter::class);
    }
}

