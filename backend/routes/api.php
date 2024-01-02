<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ConsultationController;
use App\Http\Controllers\VaccinationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/v1/auth/check_token', [AuthController::class, 'checkToken']);

Route::post('/v1/auth/login', [AuthController::class, 'login']);
Route::get('/v1/auth/logout', [AuthController::class, 'logout']);

Route::get('/v1/consultations', [ConsultationController::class, 'getConsultation']);
Route::post('/v1/consultations', [ConsultationController::class, 'postConsultation']);

Route::get('/v1/vaccinations', [VaccinationController::class, 'getVaccinations']);
Route::post('/v1/vaccinations', [VaccinationController::class, 'postVaccinations']);
Route::get('/v1/spots', [VaccinationController::class, 'getSpots']);
Route::get('/v1/spotid', [VaccinationController::class, 'getSpotById']);
Route::get('/v1/sessionbydate', [VaccinationController::class, 'getSessionByDate']);
