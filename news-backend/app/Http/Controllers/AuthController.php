<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use App\Transformers\UtilResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        try {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            $token = $user->createToken('auth_token')->plainTextToken;

            return new UtilResource([
                'user' => $user,
                'token' => $token,
                'message' => 'Registration successful'
            ], false, 201);
        } catch (ValidationException $e) {
            return new UtilResource($e->errors(), true, 422);
        } catch (\Exception $e) {
            return new UtilResource($e->getMessage(), true, 500);
        }
    }

    public function login(LoginRequest $request)
    {
        try {
            $user = User::where('email', $request->email)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                throw ValidationException::withMessages([
                    'email' => ['The provided credentials are incorrect.'],
                ]);
            }

            // Revoke previous tokens to allow only one active token
            $user->tokens()->delete();

            $token = $user->createToken('auth_token')->plainTextToken;

            return new UtilResource([
                'user' => $user,
                'token' => $token,
                'message' => 'Login successful'
            ], false, 200);
        } catch (ValidationException $e) {
            return new UtilResource($e->errors(), true, 422);
        } catch (\Exception $e) {
            return new UtilResource($e->getMessage(), true, 500);
        }
    }
    public function validate(Request $request)
    {
        try {

            if (Auth::check()) {
                return new UtilResource(
                    Auth::user(), false, 200);
            }
            return new UtilResource(
                'You are not loggedin'
            , true, 403);
        } catch (ValidationException $e) {
            return new UtilResource($e->errors(), true, 422);
        } catch (\Exception $e) {
            return new UtilResource($e->getMessage(), true, 500);
        }
    }

    public function logout(Request $request)
    {
        try {
            if (Auth::check()) {
                $request->user()->tokens()->delete();
            }

            return new UtilResource('Successfully logged out'
            , false, 200);
        } catch (\Exception $e) {
            return new UtilResource($e->getMessage(), true, 500);
        }
    }
}
