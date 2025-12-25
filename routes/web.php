<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});




//LOAD ADDRESS
//ADDRESS
Route::get('/load-provinces', [App\Http\Controllers\AddressController::class, 'loadProvinces']);
Route::get('/load-cities', [App\Http\Controllers\AddressController::class, 'loadCities']);
Route::get('/load-barangays', [App\Http\Controllers\AddressController::class, 'loadBarangays']);

//APPLICATION ROUTE
Route::get('/job-application/{slug}', [App\Http\Controllers\JobApplicationController::class, 'index']);
Route::post('/job-application/{slug}', [App\Http\Controllers\JobApplicationController::class, 'store']);


/*================================
TEMP Upload Routes
These routes are responsible for managing temporary upload
=================================*/

Route::post('/temp-upload', [App\Http\Controllers\TempUploadController::class, 'tempUploadFile']);
Route::post('/temp-remove/{file}', [App\Http\Controllers\TempUploadController::class, 'tempRemoveFile']);

/*=============END====================*/


require __DIR__.'/settings.php';
