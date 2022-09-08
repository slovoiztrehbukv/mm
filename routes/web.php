<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\ServiceInformationController;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;

Route::get('/sanctum/csrf-cookie', [CsrfCookieController::class, 'show']);

Route::group(['middleware' => 'web'], function(){
    Route::prefix('/service')->group(function() {
        Route::prefix('/hosts')->group(function() {
            Route::get('/api', [ServiceInformationController::class, 'getAPIHost']);
            Route::get('/gql', [ServiceInformationController::class, 'getGQLHost']);
        });

        Route::get('/languages', [ServiceInformationController::class, 'getLocalizationStrings']);

        // ADMIN ONLY (TODO ! add middleware)
        Route::get('/logs', [\Rap2hpoutre\LaravelLogViewer\LogViewerController::class, 'index']);
    });

    Route::get('/{path?}', function () {
        return view(env('APP_ENV') === 'production' ? 'app_PROD' : 'app', [
            'API_HOST' => env('REACT_APP_API_HOST'),
            'GQL_HOST' => env('REACT_APP_GQL_HOST'),
        ]);
    })->where('path', '.*');
});