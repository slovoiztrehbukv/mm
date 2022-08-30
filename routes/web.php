<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\ServiceInformationController;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;

Route::group(['middleware' => 'web'], function(){
    Route::get('/sanctum/csrf-cookie', [CsrfCookieController::class, 'show']);

    Route::prefix('/service')->group(function() {
        Route::prefix('/hosts')->group(function() {
            Route::get('/api', [ServiceInformationController::class, 'getAPIHost']);
            Route::get('/gql', [ServiceInformationController::class, 'getGQLHost']);
        });

        Route::get('/languages', [ServiceInformationController::class, 'getLocalizationStrings']);
    });

    Route::get('/{path?}', function () {
        return view(env('APP_ENV') === 'production' ? 'app_PROD' : 'app', [
            'API_HOST' => env('REACT_APP_API_HOST'),
            'GQL_HOST' => env('REACT_APP_GQL_HOST'),
        ]);
    })->where('path', '.*');
});