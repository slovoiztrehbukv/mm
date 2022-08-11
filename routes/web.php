<?php

use Illuminate\Support\Facades\Route;

Route::get('/{path?}', function () {
    return view(env('APP_ENV') === 'production' ? 'app_PROD' : 'app', [
        'API_HOST' => env('REACT_APP_API_HOST')
    ]);
})->where('path', '.*');