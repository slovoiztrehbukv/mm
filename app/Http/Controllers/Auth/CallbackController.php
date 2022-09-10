<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class CallbackController extends Controller
{
    public function VK()
    {
        Log::info("VK callback response ", (array)request());
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
                throw new \Exception("auth atempt failed", $user->toArray());
            }
        } catch(\Throwable $e) {
            Log::waring("Telegram callback response error: {$e->getMessage()} ", $GET);
        }
    }
}
