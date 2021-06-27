<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login', [App\Http\Controllers\API\PassportAuthController::class, 'login']);
Route::post('logout', [App\Http\Controllers\API\PassportAuthController::class, 'logout']);
Route::post('register', [App\Http\Controllers\API\PassportAuthController::class, 'register']);

Route::get('/posts', [App\Http\Controllers\API\PostController::class, 'index']);
Route::get('/posts/{id}', [App\Http\Controllers\API\PostController::class, 'findById']);
Route::post('/posts', [App\Http\Controllers\API\PostController::class, 'create']);
Route::put('/posts/{id}', [App\Http\Controllers\API\PostController::class, 'update']);
Route::delete('/posts/{id}', [App\Http\Controllers\API\PostController::class, 'delete']);

Route::get('/comments', [App\Http\Controllers\API\CommentController::class, 'index']);
Route::get('/comments/{id}', [App\Http\Controllers\API\CommentController::class, 'findById']);
Route::post('/comments/{id}', [App\Http\Controllers\API\CommentController::class, 'create']);
Route::put('/comments/{id}', [App\Http\Controllers\API\CommentController::class, 'update']);
Route::delete('/comments/{id}', [App\Http\Controllers\API\CommentController::class, 'delete']);

Route::get('/profiles', [App\Http\Controllers\API\ProfileController::class, 'index']);
Route::get('/profiles/{id}', [App\Http\Controllers\API\ProfileController::class, 'show']);
Route::get('/profiles/{username}', [App\Http\Controllers\API\ProfileController::class, 'showByUsername']);