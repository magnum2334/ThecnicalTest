<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Error;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class AuthController extends Controller
{

    // authentication functions
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        $credentials = $request->only('email', 'password');
        $token = Auth::attempt($credentials);
        if (!$token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }

        $user = User::where('email', $credentials['email'])->first();
        $userAut = Auth::user();
        return response()->json(compact('token', 'user'), 200);
    }


    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);
        if ($request->email == 'admin@admin.com') {
            $rol = 1;
        } else {
            $rol = $request->rol;
        }
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'id_rol' => $rol
        ]);

        $token = Auth::login($user);
        return response()->json([
            'status' => 'success',
            'message' => 'User created successfully',
            'user' => $user,
            'authorization' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);
    }
    public function logout()
    {
        Auth::logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }

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
    public function me()
    {
        return response()->json(auth()->user());
    }
    # users functions
    public function users(Request $request)
    {
        $users = DB::table('users')
            ->where('email', '!=', 'admin@admin.com')
            ->get();
        return response()->json(compact('users'), 200);
    }

    public function updateUser(Request $request, $id)
    {

        try {
            $user = User::find($id);
            $user->update($request->all());
            $mess = 'User update successfully';
            return response()->json(compact('mess'), 200);
        } catch (\Throwable $th) {
            $mess = 'User update error';
            return response()->json(compact('mess'), 200);
        }
    }
    public function userstatus(Request $request, $id)
    {

        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado.'], 404);
        }

        if ($user->status == false) {
            $user->status = true;
            $user->update();
            return response()->json(['message' => 'El usuario ya está activo.'], 200);
        }
        if ($user->status == true) {
            $user->status = false;
            $user->update();
            return response()->json(['message' => 'El usuario ya está inactivo.'], 200);
        }
    }
    # users roles and permission functions
    public function createRol(Request $request)
    {
        try {
            $role = Role::create(['name' => $request->name]);
            $role->syncPermissions($request->permissions);

            return response()->json(['message' => 'role created!'], 200);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'role Error create!'], 400);
        }
    }
    public function updateRol(Request $request)
    {
        try {
            $role = Role::find($request->id);
            $role->update($request->all());
            $role->syncPermissions($request->permissions);
            $message = 'Role update successfully';
            return response()->json(compact('message'), 200);
        } catch (\Throwable $th) {
            $message = 'Role update error'.$th;
            return response()->json(compact('message'), 400);
        }
    }

    public function createPermission(Request $request)
    {
        try {
            $permission = Permission::create(['name' => $request->name]);
            return response()->json(['message' => 'Permission create!'], 200);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Permission Error create!'], 400);
        }
    }

    public function permissions(Request $request)
    {
        $permissions = Permission::all();
        return response()->json(['permission' => $permissions], 200);
    }
    public function roles(Request $request)
    {
        $roles = Role::with('permissions')->get();
        return response()->json(['roles' => $roles], 200);
    }

    public function updatePermission(Request $request)
    {
        try {
            $permission = Permission::find($request->id);
            $permission->update($request->all());
            $message = 'Permission update successfully';
            return response()->json(compact('message'), 200);
        } catch (\Throwable $th) {
            $message = 'Permission update error';
            return response()->json(compact('message'), 400);
        }
    }
    # Error software functions
    public function createError(Request $request)
    {
        try {
            $file = $request->file('file_path');
            if (isset($file)) {
                $file_path = $file->store('pdf', 'public');
                if($file_path){
                    $error = new Error;
                    $error->title = $request->title;
                    $error->description = $request->description;
                    $error->importance_level = $request->importance_level;
                    $error->file_path =$file_path;
                    $error->save();
                }
                return response()->json(['message' => ' create Error software successfully !!'], 200);
            } else {
                return response()->json(['message' => '  Error file is null !!'], 400);
            }


         } catch (\Throwable $th) {
            // Handle any exceptions that occurred
            return response()->json(['message' => 'Error consult'.$th], 500);
         }
    }

    public function errors(Request $request)
    {
        $errors = Error::all();
        return response()->json(['errors' => $errors], 200);
    }
    public function updateError(Request $request)
    {
        try {

            $permission = Error::find($request->id);
            $permission->update($request->all());
            $message = 'Error software update successfully';
            return response()->json(compact('message'), 200);
        } catch (\Throwable $th) {
            $message = 'Error update error';
            return response()->json(compact('message'), 400);
        }
    }
    public function userPermissions(Request $request)
    {
        $roles = Role::findById($request->id);
        $permissions = $roles->permissions;

        return response()->json(['permissions' => $permissions], 200);
    }
    public function pdf(Request $request){
        $file = storage_path('app/' . $request->name);
        return response()->file($file);
    }


}
