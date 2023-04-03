<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VehicleRequestController;
use App\Http\Controllers\DealerController;

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
    $user = $request->user();

    $role = '';
    if ($user->hasRole(['admin'])) {
        $role = 'admin';
    } else if ($user->hasRole(['dealer'])) {
        $role = 'dealer';
    } else if ($user->hasRole(['customer'])) {
       $role = 'customer';
    }
    $user['role'] = $role;

    return $user;
});


Route::post('/request', [VehicleRequestController::class, 'store']);
Route::post('/request/vehicle-info', [VehicleRequestController::class, 'updatePurchaseVehicleInfo']);
Route::post('/request/personal-info', [VehicleRequestController::class, 'updatePersonalInformation']);

Route::post('/dealer-join-request', [DealerController::class, 'store']);

// TODO: only allow admins
Route::get('/vehicle-requests', [VehicleRequestController::class, 'getVehicleRequests']);
