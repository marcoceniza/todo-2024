<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TodoController;

// auth
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::get('/test', [AuthController::class, 'test']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::apiResource('todo', TodoController::class);

    Route::post('/done/{todo}', [TodoController::class, 'done'])->name('todos.done');
    Route::post('/important/{todo}', [TodoController::class, 'important'])->name('todos.important');
    Route::put('/retrieve/{todo}', [TodoController::class, 'retrieve'])->name('todos.retrieve');
});