<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DebugController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\CallbackController;
use App\Http\Controllers\Auth\RedirectController;
use Rap2hpoutre\LaravelLogViewer\LogViewerController;
use App\Http\Controllers\ServiceInformationController;



Route::group(['middleware' => 'web'], function(){

    Route::prefix('/auth')
        ->group(function() {
            Route::get('/logout', [LoginController::class, 'logout']);
                // ->middleware('auth');

            Route::prefix('/redirect')->group(function() {
                Route::get('/vk', [RedirectController::class, 'VK']);
                Route::get('/telegram', [RedirectController::class, 'telegram']);
            });

            Route::prefix('/callback')->group(function() {
                Route::get('/vk', [CallbackController::class, 'VK']);
                Route::get('/telegram', [CallbackController::class, 'telegram']);
            });
        });



    Route::middleware(['admin'])
        ->prefix('/admin')
        ->group(function() {
            Route::get('/logs', [LogViewerController::class, 'index']);
        });



    Route::controller(DebugController::class)
        ->middleware(['admin'])
        ->prefix('/debug')
        ->group(function() {
            Route::get('/', 'index');
        });



    Route::prefix('/service')->group(function() {
        Route::prefix('/hosts')->group(function() {
            Route::get('/api', [ServiceInformationController::class, 'getAPIHost']);
            Route::get('/gql', [ServiceInformationController::class, 'getGQLHost']);
        });

        Route::get('/languages', [ServiceInformationController::class, 'getLocalizationStrings']);
    });



    // PASSING CONTROL TO JS ROUTER:
    Route::get('/login', function () {
        return redirect('/sign-in');
    })
        ->name('login');

    Route::get('/{path?}', function () {
        return view(env('APP_ENV') === 'production' ? 'app_PROD' : 'app', [
            'API_HOST' => env('REACT_APP_API_HOST'),
            'GQL_HOST' => env('REACT_APP_GQL_HOST'),
        ]);
    })
        ->name('home')
        ->where('path', '.*');

});
