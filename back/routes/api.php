<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RolesController;
use App\Http\Controllers\ErrorController;


Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
    Route::get('me', 'me');


    Route::post('createError', 'createError');
    Route::get('errors', 'errors');
    Route::put('updateError/{id}', 'updateError');


    Route::get('pdf/{nombreArchivo}', 'pdf');

});
Route::controller(UserController::class)->group(function () {

    Route::get('users', 'users');
    Route::put('updateuser/{id}', 'updateuser');
    Route::put('userstatus/{id}', 'userstatus');
    });
Route::controller(RolesController::class)->group(function () {

    Route::get('permissions', 'permissions');
    Route::get('roles', 'roles');

    Route::post('createRol', 'createRol');
    Route::put('updateRol', 'updateRol');

    Route::post('createPermission', 'createPermission');
    Route::put('updatePermission', 'updatePermission');

    Route::get('userPermissions/{id}', 'userPermissions');
});
Route::controller(ErrorController::class)->group(function () {
    Route::post('createError', 'createError');
    Route::get('errors', 'errors');
    Route::put('updateError/{id}', 'updateError');
    Route::get('pdf/{nombreArchivo}', 'pdf');

});





