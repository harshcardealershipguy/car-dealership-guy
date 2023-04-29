<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Models\Vehicle;

class VehicleController extends Controller
{

    public function getOwnVehicles() {
        return Vehicle::where('user_id', Auth::user()->id)
            ->orderBy('updated_at', 'desc')
            ->get();
    }

    public function store(Request $request) {

        $request->validate([
            'vin' => 'required|string',
            'year' => 'required|digits:4|integer',
            'make' => 'required|string',
            'model' => 'required|string',
            'mileage' => 'required|integer',
            'condition' => 'required',
            'zip' => 'required',
            'msrp' => 'required|integer',
            'price' => 'required|integer',
            'description' => 'required',
            'images' => 'required|array'
        ]);

        $requestData = $request->all();
        $requestData['user_id'] = Auth::user()->id;
        $requestData['external_id'] = Str::orderedUuid();
        $requestData['images'] = $requestData['images'];
        $requestData['status'] = 'PENDING_REVIEW';

        $vehicle = Vehicle::create($requestData);

        return [
            "external_id" => $vehicle->external_id
        ];
    }
}
