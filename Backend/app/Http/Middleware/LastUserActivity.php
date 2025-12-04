<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class LastUserActivity
{
    public function handle(Request $request, Closure $next)
    {
        if ($user = $request->user()) {
            $user->forceFill([
                'last_activity' => now(),
            ])->save();
        }

        return $next($request);
    }
}
