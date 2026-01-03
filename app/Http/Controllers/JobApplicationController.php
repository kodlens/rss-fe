<?php

/*================================
    there journey is theirs and mine, is mine
    DOST-STII
    Eshen
    Dec 10, 2024 <- revision
    Dec 20, 2025 -> revision, using React for FE
        -> update laravel version

    This will manage and controll the 
    Applicant application information
===================================*/

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\JobPosition;

class JobApplicationController extends Controller
{


    public function index($slug){
        return Inertia::render('job-application', [
            'slug' => $slug
        ]);
    }


    public function store( Request $req, $slug){
        
        $req->validate([
            'lname' => ['required', 'string', 'max: 50'],
            'fname' => ['required', 'string', 'max: 50'],
            'sex' => ['required', 'string' ,'max: 15'],
            'province' => ['required', 'string', 'max: 100'],
            'city' => ['required', 'string', 'max: 100'],
            'barangay' => ['required', 'string', 'max: 100'],
            'job_position_slug' => ['required', 'string'],
            'email' => ['required', 'email'],
            'contact_no' => ['required', 'regex:/^(09|\+639)\d{9}$/'],

            'application_letter' => ['required'],
            'application_letter.0.response.filename' => ['required', 'string'],

            'pds' => ['required'],
            'pds.0.response.filename' => ['required', 'string'],

            'diploma' => ['required'],
            'diploma.0.response.filename' => ['required', 'string'],

            'tor' => ['required'],
            'tor.0.response.filename' => ['required', 'string'],

        ],[
            'lname.required' => 'Last Name is required.',
            'fname.required' => 'First Name is required.',
        ]);


        return $req;
        
        $jobPosition = JobPosition::with(['status_engagement'])
            ->where('job_position_slug', $slug)
            ->first();



        return $jobPosition;
    }

    
}
