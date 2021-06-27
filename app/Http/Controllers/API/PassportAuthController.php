<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Profile;
use Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class PassportAuthController extends Controller
{
    public function register(Request $request)
    {
        $loginData = $request->all();
        $validator = Validator::make($loginData, [
            'username' => ['required', 'string', 'unique:users'],
            'email' => ['required', 'string', 'email', 'unique:users'],
            'password' => ['required', 'string', 'min:6', 'max:60'],
        ], [
            'username.required' => 'Please give your username!',
            'password.required' => 'Please give your password!',
            'email.required' => 'Please give your email!',
            'email.email' => 'Give a valid email address!',
            'email.unique' => 'Email has been used!',
            'username.unique' => 'Username has been used!',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->getMessageBag(),
            ], 404);
        }

        $user = new User();
        $user->username = $request->username;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->save();

        $profile = new Profile();
        $user->profile()->save($profile);
        $profile->save();
        $access_token = $user->createToken('authToken')->accessToken;
        $user->save();

        $user = User::find($user->id);
        

        return response()->json([
            'success' => true,
            'message' => 'Registration Successful!',
            'data' => ['user' => $user, 'access_token' => $access_token],
        ], 201);
    }

    public function login(Request $request)
    {
        $loginData = $request->all();
        $validator = Validator::make($loginData, [
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
        ], [
            'email.required' => 'Please give your email!',
            'password.required' => 'Please give your password!',
            'email.email' => 'Please give valid email address!',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->getMessageBag(),
            ]);
        }

        if (!Auth::attempt($loginData)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid email/password!',
            ], 200);
        } else {
            $user = User::find(Auth::user()->id);
            $access_token = $user->createToken('authToken')->accessToken;
            return response()->json([
                'success' => true,
                'message' => 'Login Successful!',
                'data' => ['user' => $user, 'access_token' => $access_token],
            ], 200);
        }
    }

    public function logout(Request $request){
        $request->user()->token()->revoke();
        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }
}
