<?php

use App\Http\Controllers\ServiceInformationController;
use Illuminate\Support\Facades\Route;

Route::prefix('/service')->group(function() {
    Route::prefix('/hosts')->group(function() {
        Route::get('/api', [ServiceInformationController::class, 'getAPIHost']);
        Route::get('/gql', [ServiceInformationController::class, 'getGQLHost']);
    });
});

Route::get('/{path?}', function () {
    return view(env('APP_ENV') === 'production' ? 'app_PROD' : 'app', [
        'API_HOST' => env('REACT_APP_API_HOST'),
        'GQL_HOST' => env('REACT_APP_GQL_HOST'),
    ]);
})->where('path', '.*');