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
        if (Auth::attempt([
            'login' => $args['login'],
            'password' => $args['password'],
        ])) {
            request()->session()->regenerate();
    
            return ['success' => true];
        }

        return ['success' => false];
    }
}
