<?php

namespace App\GraphQL\Queries;

use Illuminate\Support\Facades\Cookie;


final class LogOutResolver
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $response = redirect()->back();

        foreach(request()->cookies as $cookieKey => $cookieValue) {
            $response->withCookie(Cookie::forget($cookieKey));
        }

        return $response;
    }
}
