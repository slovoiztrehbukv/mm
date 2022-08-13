<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class DevOnly
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        return env('APP_ENV') === 'production' ? redirect('/') : $next($request);
    }
}
