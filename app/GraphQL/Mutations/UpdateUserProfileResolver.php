<?php

namespace App\GraphQL\Mutations;

use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;


final class UpdateUserProfileResolver
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        /**
         * @var ?User $user
         */
        $user = Auth::user();

        if (!$user) return ['success' => false];

        $user->update($args);

        return ['success' => true];
    }
}
