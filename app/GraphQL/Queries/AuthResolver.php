<?php

namespace App\GraphQL\Queries;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;


final class AuthResolver
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
