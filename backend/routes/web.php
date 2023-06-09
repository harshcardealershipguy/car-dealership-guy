<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

Route::get('/health', function () {
     return 'OK';
});

Route::get('/health-check', function () {
    return response('OK ', 200);
});

Route::get('/mailable', function () {
    return new App\Mail\Welcome();
});

require __DIR__.'/auth.php';
