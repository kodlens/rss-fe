<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TempUploadController extends Controller
{
    /** Applicationn Letter upload HANDLING */
    /* ================= */
    public function tempUploadFile(Request $request)
    {
        $allowedFields = ['application_letter', 'pds', 'diploma', 'tor'];

        $field = collect($allowedFields)->first(fn ($f) => $request->hasFile($f));

        if (!$field) {
            return response()->json([
                'message' => 'No valid upload field provided.'
            ], 422);
        }

        $request->validate([
            $field => ['required', 'mimes:pdf', 'max:1024'],
        ], [
            "$field.max" => 'The upload field must not be greater than 1MB in size.',
        ]);

        $file = $request->file($field);

        $hash = md5($file->getClientOriginalName() . microtime(true));
        $name = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $ext  = $file->getClientOriginalExtension();

        $filename = "{$hash}_{$name}.{$ext}";

        // Store explicitly on the private disk
        $path = $file->storeAs('temp-upload', $filename, 'local');

        return response()->json([
            'path' => $path,
            'filename' => $filename,
        ]);
    }


    public function tempRemoveFile($fileName){
        if(Storage::exists('public/temp-upload/' .$fileName)) {
            Storage::delete('public/temp-upload/' . $fileName);
            return response()->json([
                'status' => 'temp_deleted'
            ], 200);
        }

        return response()->json([
            'status' => 'temp_error'
        ], 200);
    }


    // //remove from featured_image folder
    public function imageRemove($id, $fileName){

        $data = Post::find($id);
        $data->featured_image = null;
        $data->save();

        if(Storage::exists('public/featured_images/' .$fileName)) {
            Storage::delete('public/featured_images/' . $fileName);

            if(Storage::exists('public/temp/' .$fileName)) {
                Storage::delete('public/temp/' . $fileName);
            }

            return response()->json([
                'status' => 'temp_deleted'
            ], 200);
        }

        return response()->json([
            'status' => 'temp_error'
        ], 200);
    }
}
