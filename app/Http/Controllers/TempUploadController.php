<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TempUploadController extends Controller
{
    

    /** Applicationn Letter upload HANDLING */
    /* ================= */
    public function tempUploadApplicationLetter(Request $req){

        $req->validate([
            'application_letter' => ['required', 'mimes:pdf', 'max:1024']
        ],[
            'application_letter.max' => 'The upload field must not be greater than 1MB in size.'
        ]);

        $file = $req->application_letter;
        $fileGenerated = md5($file->getClientOriginalName() . time());
        $imageName = $fileGenerated .'_'. pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME) . '.' . $file->getClientOriginalExtension();
        $imagePath = $file->storeAs('public/temp-upload', $imageName);
        $n = explode('/', $imagePath);
        return $n[2];
    }

    public function removeUpload($fileName){
       
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
