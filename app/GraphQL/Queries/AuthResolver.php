<?php

namespace App\GraphQL\Queries;

use App\Models\User;
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
        $user = User::where('login', $args['login'])->first();

        if (! $user || ! Hash::check($args['password'], $user->password)) {
            $jwt = false;
        } else {
            $jwt = $user->createToken('web')->plainTextToken;
        }

        return [
            'jwt' => $jwt
        ];
    }
}
