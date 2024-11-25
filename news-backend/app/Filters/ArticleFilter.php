<?php
namespace App\Filters;

use EloquentFilter\ModelFilter;

class ArticleFilter extends ModelFilter
{
    public function keyword($keyword)
    {
        return $this->where('title', 'like', "%$keyword%");
    }

    public function source($source)
    {
        return $this->where('source', $source);
    }

    public function dateRange($startDate, $endDate)
    {
        return $this->whereBetween('published_at', [$startDate, $endDate]);
    }

    public function categories($categories)
    {
        return $this->whereIn('category', $categories);
    }

    public function authors($authors)
    {
        return $this->whereIn('author', $authors);
    }

    
}
