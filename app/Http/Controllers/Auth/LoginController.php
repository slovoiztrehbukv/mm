<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use App\Providers\RouteServiceProvider;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('lighthouse');
    }



    public function logout()
    {
        // $user = Auth::guard('sanctum')->user();
        $response = response()->json([true]);

        foreach(request()->cookies as $cookieKey => $cookieValue) {
            $response->withCookie(Cookie::forget($cookieKey));
        }

        return $response;
    }

    public function redirectVK()
    {
        return Socialite::driver('vkontakte')->redirect();
    }

    public function redirectTelegram()
    {
        return Socialite::driver('telegram')->redirect();
    }

    public function callbackVK()
    {
        Log::info("VK callback response ", (array)request());
    }

    public function callbackTelegram()
    {
        $GET = request()->query();
        
        try {
            $data = checkTelegramAuthorization($GET);
            Log::info("Telegram callback response success", $data);
        } catch(\Throwable $e) {
            Log::waring("Telegram callback response error: {$e->getMessage()} ", $GET);
        }
    }
}
