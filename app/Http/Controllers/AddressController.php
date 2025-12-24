<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Barangay;
use App\Models\City;
use App\Models\Province;


class AddressController extends Controller
{
    
    public function loadProvinces(){
        $provinces = Province::orderBy('provDesc', 'asc')
        ->get();
        return $provinces;
    }


    public function loadCities(Request $req){
        $provCode = $req->prov;
        $cities = City::where('provCode', $provCode)
            ->orderBy('citymunDesc', 'asc')
            ->get();
        return $cities;
    }

    public function loadBarangays(Request $req){
        $provCode = $req->prov;
        $cityCode = $req->city_code;

        $barangays = Barangay::where('provCode', $provCode)
            ->where('citymunCode', $cityCode)
            ->orderBy('brgyDesc', 'asc')
            ->get();
        return $barangays;
    }
}
