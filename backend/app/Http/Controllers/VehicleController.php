<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Models\Vehicle;

class VehicleController extends Controller
{

    public function getVehicles(Request $request) {

        $query = Vehicle::limit($request->limit)
            ->orderBy('updated_at', 'desc')
            ->where('status', '=', 'APPROVED');

        if ($request->year_low) {
            $query->where('year', '>=', $request->year_low);
        }

        if ($request->year_high) {
            $query->where('year', '<=', $request->year_high);
        }

        if ($request->make) {
            $query->where('make', '=', $request->make);
        }
        if ($request->model) {
            $query->where('model', '=', $request->model);
        }

        return $query->get();
    }

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
