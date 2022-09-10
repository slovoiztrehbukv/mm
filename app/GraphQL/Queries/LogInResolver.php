<?php

namespace App\GraphQL\Queries;

use Illuminate\Support\Facades\Auth;


final class LogInResolver
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $user = null;

        if (Auth::attempt([
            'login' => $args['login'],
            'password' => $args['password'],
        ])) {
            request()->session()->regenerate();
    
            $user = auth()->user();
        }

        return ['user' => $user];
    }
}
