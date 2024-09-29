<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    public function register(Request $request) {

        $validatedData = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:3|confirmed'
        ]);

        User::create($validatedData);

        return response()->json([
            'message' => 'User registered successfully'
        ]);
    }

    public function login(Request $request) {

        $validatedData = $request->validate([
            'email' => 'required|email|exists:users,email',
            'password' => 'required'
        ]);
    
        if (Auth::attempt($validatedData)) {
            $user = Auth::user();
            $token = $user->createToken($user->name)->plainTextToken;
    
            return response()->json([
                'success' => true,
                'message' => 'Login successfully!',
                'token' => $token
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Invalid credentials.'
            ]);
        }
    }

    public function logout(Request $request) {

        Auth::guard('sanctum')->user()->tokens()->delete();

        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

}
