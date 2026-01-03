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
        return $req->application_letter[0]['response']['filename'];

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
        
        $jobPosition = JobPosition::with(['status_engagement'])
            ->where('job_position_slug', $slug)
            ->first();

        JobPosition::create([
            'job_position_id' => $jobPosition->job_position_id,
            'job_position_slug' => $jobPosition->job_position_slug,
            'lname' => strtoupper($req->lname),
            'fname' => strtoupper($req->fname),
            'mname' => strtoupper($req->mname),
            'sex' => $req->sex,
            'ethnicity' => $req->ethnicity,
            'religion' => $req->religion,
            'email' => $req->email,
            'contact_no' => $req->contact_no,
            'civil_status' => $req->civil_status,
            'citizenship' => $req->citizenship,
            'province' => $req->province,
            'city' => $req->city,
            'barangay' => $req->barangay,
            'street' => $req->street,

            'application_letter' => data_get($req->all(), 'application_letter.0.response.filename'),
            'pds' => data_get($req->all(), 'pds.0.response.filename'),
            'diploma' => data_get($req->all(), 'diploma.0.response.filename'),
            'tor' => data_get($req->all(), 'tor.0.response.filename'),
            'relevant_training' => data_get($req->all(), 'relevant_training.0.response.filename', ''),
            'coe' => data_get($req->all(), 'coe.0.response.filename', ''),
            'work_experience' => data_get($req->all(), 'work_experience.0.response.filename', ''),

        ]);



        return response()->json([
            'status' => 'success'
        ], 200);
    }

    
}
