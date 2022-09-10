<?php

namespace App\GraphQL\Queries;

use App\Models\UsersMatch;
use Illuminate\Support\Facades\Auth;


final class GetMyMatchesResolver
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        return UsersMatch::all();
    }
}
