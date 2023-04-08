<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\VehicleRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\Password;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use App\Models\Role;


class VehicleRequestController extends Controller
{

    public function getVehicleRequests() {
        return VehicleRequest::all();
    }

    public function getVehicleRequest($externalId) {
        return VehicleRequest::where('external_id', $externalId)->firstOrFail();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     */
    public function store(Request $request)
    {
        $request->validate([
            'exact_vehicle_known' => 'required|boolean',
        ]);

        $vehicleRequest = VehicleRequest::create(
                [
                    'exact_vehicle_known' => $request->exact_vehicle_known,
                    'external_id' => Str::orderedUuid()
                ]
            );

        return [
            "external_id" => $vehicleRequest->external_id
        ];
    }


    public function updatePurchaseVehicleInfo(Request $request)
    {
        $vehicleRequest = VehicleRequest::where('external_id', $request->external_id)->firstOrFail();
        $vehicleRequest->fill($request->all());
        $vehicleRequest->save();
        return "OK";
    }

    public function updatePersonalInformation(Request $request)
    {
        $request->validate([
            'external_id' => ['required'],
            'name' => ['string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255'],
            'password' => ['confirmed', Password::defaults()],
            'city' => ['required'],
            'state' => ['required']
        ]);

        $vehicleRequest = VehicleRequest::where('external_id', $request->external_id)->firstOrFail();
        $vehicleRequest->fill($request->all()); //fill in city and state
        $vehicleRequest->save();

        $user = User::where('email', $request->email)->first();

        //if the user doesn't exist create one with the name/email/password
        if(!$user) {
            $customerRole = Role::where('name', 'customer')->firstOrFail();

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            $user->addRole($customerRole);

            event(new Registered($user));
        }

        $vehicleRequest = VehicleRequest::where('external_id', $request->external_id)->firstOrFail();
        $vehicleRequest->user_id = $user->id;
        $vehicleRequest->save();

        return "OK";
    }
}
