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
use Illuminate\Support\Facades\Auth;


class VehicleRequestController extends Controller
{

    public function getVehicleRequests() {
        return VehicleRequest::all();
    }

    public function getOwnVehicleRequests() {
        return VehicleRequest::where('user_id', Auth::user()->id)->get();
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

        $vehicleRequestData = [
              'exact_vehicle_known' => $request->exact_vehicle_known,
              'external_id' => Str::orderedUuid()
        ];

        //if this request was made by an authenticated user, associate it
        $user = Auth::user();
        if ($user !== null) {
            $vehicleRequestData['user_id'] = $user->id;
        }

        $vehicleRequest = VehicleRequest::create(
            $vehicleRequestData
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
            'zip' => ['required'],
        ]);

        $vehicleRequest = VehicleRequest::where('external_id', $request->external_id)->firstOrFail();
        $vehicleRequest->fill($request->all()); //fill in city and state
        $vehicleRequest->save();

        $user = User::where('email', $request->email)->first();

        //if the user doesn't exist and there isn't already a user assigned to this request, create a new user
        if(!$user && !$vehicleRequest->user_id) {
            $customerRole = Role::where('name', 'customer')->firstOrFail();

            $user = User::create([
                'external_id' => Str::orderedUuid(),
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'zip' => $request->zip
            ]);

            $user->addRole($customerRole);

            event(new Registered($user));

            //TODO: log the user in?
        }

        $vehicleRequest = VehicleRequest::where('external_id', $request->external_id)->firstOrFail();
        $vehicleRequest->user_id = $user->id;
        $vehicleRequest->save();

        return "OK";
    }
}
