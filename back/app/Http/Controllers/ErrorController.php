<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Error;

class ErrorController extends Controller
{
    /**
     * Create Error Software
     *
     * @param  Request  $request  The HTTP request.
     * @return Response           The HTTP response with the authentication token and user details on success, or an error message on failure.
     */
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

    /**
     * All  Errors Software
     *
     * @param  Request  $request  The HTTP request.
     * @return Response           The HTTP response with the authentication token and user details on success, or an error message on failure.
     */
      public function errors(Request $request)
      {
          $errors = Error::all();
          return response()->json(['errors' => $errors], 200);
      }
    /**
     * update Error Software
     *
     * @param  Request  $request  The HTTP request.
     * @return Response           The HTTP response with the authentication token and user details on success, or an error message on failure.
     */
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
    /**
     * Pdf Error Software
     *
     * @param  Request  $request  The HTTP request.
     * @return Response           The HTTP response with the authentication token and user details on success, or an error message on failure.
     */
      public function pdf(Request $request){
          $file = storage_path('app/' . $request->name);
          return response()->file($file);
      }
}
