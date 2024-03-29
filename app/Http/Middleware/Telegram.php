<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class Telegram
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
        return $request->headers->get('X-Telegram-Bot-Api-Secret-Token') === env('MM_TELEGRAM_WEBHOOK_SECRET_TOKEN') ? $next($request) : redirect('/');
    }
}
