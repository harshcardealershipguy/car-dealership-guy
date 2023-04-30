<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VehicleRequestController;
use App\Http\Controllers\DealerController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\VehicleController;

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

// TODO: only allow dealers+admins
Route::get('/vehicle-requests', [VehicleRequestController::class, 'getVehicleRequests']);

//TODO: only allow authenticated users to do
Route::get('/my-vehicle-requests', [VehicleRequestController::class, 'getOwnVehicleRequests']);


//TODO: only allow dealers+admins
Route::get('/vehicle-request/{externalId}', [VehicleRequestController::class, 'getVehicleRequest']);

// TODO: only allow dealers
Route::get('/my-vehicles', [VehicleController::class, 'getOwnVehicles']);

Route::get('/vehicles', [VehicleController::class, 'getVehicles']);

// TOOD: only allow dealers
Route::post('/add-vehicle', [VehicleController::class, 'store']);


//TODO: only allow getting messages and sending messages for yourself
Route::middleware(['auth:sanctum'])->get('/messages/{otherUserExternalId}', [MessageController::class, 'getMessages']);
Route::middleware(['auth:sanctum'])->post('/messages/{otherUserExternalId}', [MessageController::class, 'addMessage']);

Route::middleware(['auth:sanctum'])->get('/conversations', [MessageController::class, 'getConversations']);

Route::post('/upload-image', [ImageController::class, 'uploadImage']);
