<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class StatusController extends Controller
{
    public function typing(Request $request)
    {
        $user = $request->user();

        $data = $request->validate([
            'typing' => 'required|boolean',
        ]);

        $user->forceFill([
            'is_typing' => $data['typing'],
            'last_activity' => now(),
        ])->save();

        return response()->json(['success' => true]);
    }

    public function show(Request $request, $id)
    {
        $other = User::findOrFail($id);

        $last = $other->last_activity;
        $enLinea = false;

        if ($last) {
            $enLinea = now()->diffInSeconds($last) <= 60;
        }

        return response()->json([
            'success' => true,
            'data' => [
                'is_typing' => $other->is_typing,
                'last_activity' => $last,
                'en_linea' => $enLinea,
            ]
        ]);
    }
}
