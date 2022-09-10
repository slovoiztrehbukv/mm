<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class CallbackController extends Controller
{
    public function VK()
    {
        $userData = Socialite::driver('vkontakte')->user();
        $user = User::firstWhere('vk_id', '=', $userData->getId());

        if (!$user) {
            $user = User::create([
                // 'login' => $userData->getNickname(), // unique check
                'vk_id' => $userData->getId(),
                'name' => $userData->getName(),
                'email' => $userData->getEmail(), // unique check
                'avatar' => $userData->getAvatar(),
            ]);
        }


        try {
            if (Auth::loginUsingId($user->id)) {
                request()->session()->regenerate();

                return redirect('/');
            } else {
                throw new \Exception("vk auth atempt failed", $user->toArray());
            }
        } catch(\Throwable $e) {
            Log::waring("Telegram callback response error: {$e->getMessage()} ", $userData);
        }
    }

    public function telegram()
    {
        $GET = request()->query();
        
        try {
            $data = checkTelegramAuthorization($GET);
            
            $user = User::firstOrCreate([
                'tlg_id' => $data['id']
            ]);

            if (Auth::loginUsingId($user->id)) {
                request()->session()->regenerate();

                return redirect('/');
            } else {
                throw new \Exception("tlg auth atempt failed", $user->toArray());
            }
        } catch(\Throwable $e) {
            Log::waring("Telegram callback response error: {$e->getMessage()} ", $GET);
        }
    }
}
