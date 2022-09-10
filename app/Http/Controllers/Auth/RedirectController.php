<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Laravel\Socialite\Facades\Socialite;

class RedirectController extends Controller
{
    public function VK()
    {
        return Socialite::driver('vkontakte')->redirect();
    }

    public function telegram()
    {
        return Socialite::driver('telegram')->redirect();
    }
}
