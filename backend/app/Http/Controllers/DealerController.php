<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use App\Models\Role;

class DealerController extends Controller
{

    public function store(Request $request)
    {
        $request->validate([
            'zip' => ['required'],
            'name' => ['string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255'],
            'password' => ['confirmed', Password::defaults()],
        ]);

        $user = User::where('email', $request->email)->first();

        //if the user doesn't exist create one with the name/email/password
        if(!$user) {
            $dealerRole = Role::where('name', 'dealer')->firstOrFail();

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'zip' => $request->zip
            ]);

            $user->addRole($dealerRole);

            event(new Registered($user));

            Auth::login($user);
        }

        return response()->noContent();
    }
}
