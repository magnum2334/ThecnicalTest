<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

use App\Models\User;

class AuthController extends Controller
{

    /**
     * Attempts to log in a user with the given email and password.
     *
     * @param  Request  $request  The HTTP request.
     * @return Response           The HTTP response with the authentication token and user details on success, or an error message on failure.
     */
    public function login(Request $request)
    {
        // validator data

        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        // Get the email and password fields from the request
        $credentials = $request->only('email', 'password');

        // Attempt to authenticate the user using the input credentials
        $token = Auth::attempt($credentials);

        // If authentication is unsuccessful, return an error response with a 401 status code
        if (!$token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }

        // Retrieve the user data using the authenticated email
        $user = User::where('email', $credentials['email'])->first();

        // Retrieve the authenticated user
        $userAut = Auth::user();

        // Return a success response with the token and user data
        return response()->json(compact('token', 'user'), 200);
    }


    /**
     * Registers a new user with the given name, email, password, and role.
     *
     * @param  Request  $request  The HTTP request.
     * @return Response           The HTTP response with the new user details and authentication token on success, or an error message on failure.
     */
    public function register(Request $request)
    {
        //validate data user
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        // Create a new user with the name, email, password, and role fields
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'id_rol' =>  $request->rol
        ]);

        // Authenticate the newly created user and get the authentication token
        $token = Auth::login($user);

        // Return a success response with the token, user data, and bearer authorization type
        return response()->json([
            'status' => 'success',
            'message' => 'User created successfully',
            'user' => $user,
            'authorization' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ], 201);
    }

    /**
     * Logs out the currently authenticated user.
     *
     * @return Response  The HTTP response with a success message.
     */
    public function logout()
    {
        // Return a success response logged out
        Auth::logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }

    /**
     * Refreshes the authentication token for the currently authenticated user.
     *
     * @return Response  The HTTP response with the new authentication token and user details.
     */
    public function refresh()
    {
        return response()->json([
            'status' => 'success',
            'user' => Auth::user(),
            'authorization' => [
                'token' => Auth::refresh(),
                'type' => 'bearer',
            ]
        ]);
    }
    /**
     * Gets the details of the currently authenticated user.
     *
     * @return Response  The HTTP response
     */
    public function me()
    {
        return response()->json(auth()->user());
    }
}
