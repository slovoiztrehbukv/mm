<?php

namespace App\GraphQL\Queries;

final class CurrentUserResolver
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        return auth()->user(); 
    }
}
