<?php

use App\Http\Controllers\Auth\LoginController;
use Illuminate\Support\Facades\Route;



Route::controller(LoginController::class)->group(function() {
    Route::get('/logout', 'logout');

    Route::prefix('/redirect')->group(function() {
        Route::get('/vk', 'redirectVK');
        Route::get('/telegram', 'redirectTelegram');
    });

    Route::prefix('/callback')->group(function() {
        Route::get('/vk', 'callbackVK');
        Route::get('/telegram', 'callbackTelegram');
    });
});
