<?php

namespace App\Http\Controllers;

use App\Models\Societies;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function checkToken(Request $request)
    {
        $validation = $request->validate([
            'token' => 'required'
        ]);

        $society = Societies::where('login_tokens', $request['token'])->first();
        if (!$society) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid token'
            ], 401);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Token is valid',
            'name' => $society->name
        ], 200);
    }

    public function login(Request $request)
    {
        $validation = $request->validate([
            'id_card_number' => 'required',
            'password' => 'required'
        ]);

        $society = Societies::where('id_card_number', $request['id_card_number'])->first();
        if (!$society) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid id card number'
            ], 401);
        }
        if ($society->password !== $request['password']) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid password'
            ], 401);
        }

        $token = md5($request['id_card_number'] . $request['password']);
        $login = Societies::where('id_card_number', $request['id_card_number'])->update([
            'login_tokens' => $token
        ]);
        // if (!$login) {
        //     return response()->json([
        //         'status' => 'error',
        //         'message' => 'Something went wrong'
        //     ], 500);
        // }

        return response()->json([
            'status' => 'success',
            'message' => 'Login successful',
            'name' => $society->name,
            'token' => $token
        ], 200);
    }

    public function logout(Request $request)
    {
        $validation = $request->validate([
            'token' => 'required'
        ]);

        $logout = Societies::where('login_tokens', $request['token'])->update([
            'login_tokens' => null
        ]);
        if (!$logout) {
            return response()->json([
                'status' => 'error',
                'message' => 'You are already logged out'
            ], 200);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Logout successful'
        ], 200);
    }
}
