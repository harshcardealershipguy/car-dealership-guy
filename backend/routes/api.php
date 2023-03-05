<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VehicleRequestController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/request', [VehicleRequestController::class, 'store']);
Route::post('/request/vehicle-info', [VehicleRequestController::class, 'updatePurchaseVehicleInfo']);
Route::post('/request/personal-info', [VehicleRequestController::class, 'updatePersonalInformation']);
