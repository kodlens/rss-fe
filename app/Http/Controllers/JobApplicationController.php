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
        
        // $req->validate([
        //     'lname' => ['required', 'string', 'max: 50'],
        //     'fname' => ['required', 'string', 'max: 50'],
        //     'sex' => ['required', 'string' ,'max: 15'],
        //     'province' => ['required', 'string', 'max: 100'],
        //     'city' => ['required', 'string', 'max: 100'],
        //     'barangay' => ['required', 'string', 'max: 100'],
        //     'job_position_slug' => ['required', 'string'],
        //     'email' => ['required', 'email'],
        //     'contact_no' => ['required', 'regex:/^(09|\+639)\d{9}$/'],
            
        //     // 'application_letter' => ['required', 'file', 'mimes:pdf', 'max:1024 '],
        //     // 'pds' => ['required', 'file', 'mimes:pdf', 'max:1024 '],
        //     // 'diploma' => ['required', 'file', 'mimes:pdf', 'max:1024 '],
        //     // 'transcript_record' => ['required', 'file', 'mimes:pdf', 'max:1024 '],

        //     // 'attachment' => ['required'],
        //     // 'diploma' => ['required'],
        //     // 'work_ex' => ['required'],
        //     // 'tor_link' => ['required'],
        //     // 'application_letter' => ['required'],
        //     // 'pds' => ['required'],
        //     // 'cert_of_relevant_training_link' => ['required'],

        //     'application_letter' => ['required', 'file', 'mimes:pdf', 'max:1024 '],
        //     'pds' => ['required', 'file', 'mimes:pdf', 'max:1024 '],
        //     'diploma' => ['required', 'file', 'mimes:pdf', 'max:1024 '],
        //     'tor' => ['required', 'file', 'mimes:pdf', 'max:1024 '],
        //     'certificate_relevant_training' => ['mimes:pdf', 'max:1024 '],
        //     'coe' => ['mimes:pdf', 'max:1024 '],

        // ],[
        //     'lname.required' => 'Last Name is required.',
        //     'fname.required' => 'First Name is required.',
        //     // 'pds_link.required' => 'PDS link is required.',
        //     // 'work_ex_link.required' => 'Work Experience link is required.',
        //     // 'tor_link.required' => 'Diplome/TOR link is required.',
        //     // 'cert_of_relevant_training_link.required' => 'Certificate of relevant training link is required.',

        //     'application_letter.max' => 'The application letter must not be greater than 1MB in size.',
        //     'pds.max' => 'The pds must not be greater than 1MB in size.',
        //     'diploma.max' => 'The diploma must not be greater than 1MB in size.',
        //     'tor.max' => 'The TOR must not be greater than 1MB in size.',
        //     'certificate_relevant_training.max' => 'The TOR must not be greater than 1MB in size.',
        // ]);
        return $req;
        
        $jobPosition = JobPosition::with(['status_engagement'])
            ->where('job_position_slug', $slug)
            ->first();



        return $jobPosition;
    }

    
}
