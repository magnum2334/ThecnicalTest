<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use Illuminate\Support\Facades\DB;


class UserController extends Controller
{

    /**
     * All users
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
      public function users(Request $request)
      {
          $users = DB::table('users')
              ->where('email', '!=', 'admin@admin.com')
              ->get();
          return response()->json(compact('users'), 200);
      }
    /**
     * Update user
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
      public function updateUser(Request $request, $id)
      {

          try {
              $user = User::find($id);
              $user->update($request->all());
              $message = 'User update successfully';
              return response()->json(compact('message'), 200);
          } catch (\Throwable $th) {
              $message = 'User update error';
              return response()->json(compact('message'), 200);
          }
      }
    /**
     *  Users update status
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
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
}
