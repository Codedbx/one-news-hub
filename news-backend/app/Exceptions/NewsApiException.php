<?php

namespace App\Exceptions;

use Exception;

class NewsApiException extends Exception
{
    public function __construct($message = "", $code = 0, Exception $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }

    public function report(Exception $exception)
    {
        // Report the exception
    }

    public function render($request)
    {
        // Render the exception
    }
} 