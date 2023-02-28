<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesController extends Controller
{
    /**
     * Creates a new role.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function createRol(Request $request)
    {
        try {
            // Create a new role and sync its permissions.
            $role = Role::create(['name' => $request->name]);
            $role->syncPermissions($request->permissions);

            return response()->json(['message' => 'role created!'], 200);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'role Error create!'], 400);
        }
    }

    /**
     * Updates a role.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function updateRol(Request $request)
    {
        try {
            // Find the role and update its information and permissions.
            $role = Role::find($request->id);
            $role->update($request->all());
            $role->syncPermissions($request->permissions);
            $message = 'Role update successfully';
            return response()->json(compact('message'), 200);
        } catch (\Throwable $th) {
            $message = 'Role update error' . $th;
            return response()->json(compact('message'), 400);
        }
    }

    /**
     * Creates a new permission.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function createPermission(Request $request)
    {
        try {
            // Create a new permission.
            $permission = Permission::create(['name' => $request->name]);
            return response()->json(['message' => 'Permission create!'], 200);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Permission Error create!'], 400);
        }
    }

    /**
     * Gets all permissions.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function permissions(Request $request)
    {
        // Retrieve all permissions.
        $permissions = Permission::all();
        return response()->json(['permission' => $permissions], 200);
    }

    /**
     * Gets all roles.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function roles(Request $request)
    {
        // Retrieve all roles and their permissions.
        $roles = Role::with('permissions')->get();
        return response()->json(['roles' => $roles], 200);
    }

    /**
     * Updates a permission.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function updatePermission(Request $request)
    {
        try {
            // Find the permission and update its information.
            $permission = Permission::find($request->id);
            $permission->update($request->all());
            $message = 'Permission update successfully';
            return response()->json(compact('message'), 200);
        } catch (\Throwable $th) {
            $message = 'Permission update error';
            return response()->json(compact('message'), 400);
        }
    }

    /**
     * Gets all permissions for a specific user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function userPermissions(Request $request)
    {
        $roles = Role::findById($request->id);
        $permissions = $roles->permissions;

        return response()->json(['permissions' => $permissions], 200);
    }
}
