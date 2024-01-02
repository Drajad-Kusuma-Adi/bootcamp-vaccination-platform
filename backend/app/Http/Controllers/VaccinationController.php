<?php

namespace App\Http\Controllers;

use App\Models\Societies;
use App\Models\Spots;
use App\Models\Vaccinations;
use App\Models\Vaccines;
use Carbon\Carbon;
use Illuminate\Http\Request;

class VaccinationController extends Controller
{
    public function getVaccinations(Request $request)
    {
        $validation = $request->validate([
            'token' => 'required',
        ]);

        $society = Societies::where('login_tokens', $request['token'])->first();
        if (!$society) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid token'
            ], 401);
        }

        $secondVaccination = Vaccinations::where('society_id', $society->id)->where('dose', 2)->first();
        if (!$secondVaccination) {
            $firstVaccination = Vaccinations::where('society_id', $society->id)->where('dose', 1)->first();
            if (!$firstVaccination) {
                return response()->json([
                    'status' => 'success',
                    'message' => "You haven't vaccinate yet",
                ], 200);
            }

            $vaccination = $firstVaccination;
        } else {
            $vaccination = $secondVaccination;
        }

        $vaccine = Vaccines::where('id', $vaccination->vaccine_id)->first();

        return response()->json([
            'date' => $vaccination->date,
            // 'vaccine' => $vaccine->name,
            'dose' => $vaccination->dose,
        ], 200);
    }

    public function getSpots(Request $request)
    {
        $validation = $request->validate([
            'token' => 'required',
        ]);

        $society = Societies::where('login_tokens', $request->token)->first();
        if (!$society) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid token'
            ], 401);
        }

        $spots = Spots::where('regional_id', $society->regional_id)->get();
        if (!$spots) {
            return response()->json([
                'status' => 'success',
                'message' => 'Vaccination is not yet available in your area'
            ], 200);
        }

        return response()->json($spots, 200);
    }

    public function getSpotById(Request $request)
    {
        $validation = $request->validate([
            'id' => 'required'
        ]);

        $spot = Spots::where('id', $request['id'])->first();
        if (!$spot) {
            return response()->json([
                'status' => 'error',
                'message' => 'Spot not found'
            ], 404);
        }

        return response()->json($spot, 200);
    }

    public function getSessionById(Request $request)
    {
        $validation = $request->validate([
            'id' => 'required',
            'date' => 'required'
        ]);

        $occupied = Vaccinations::where('spot_id', $request->id)->get();
        if (!$occupied) {
            return response()->json([
                'status' => 'success',
                'occupied' => 0
            ], 200);
        }

        return response()->json([
            'status' => 'success',
            'occupied' => $occupied->count()
        ], 200);
    }

    public function postVaccinations(Request $request)
    {
        $validation = $request->validate([
            'token' => 'required',
            'spot_id' => 'required'
        ]);

        $society = Societies::where('login_tokens', $request['token'])->first();
        if (!$society) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid token'
            ], 401);
        }

        $vaccinations = Vaccinations::where('society_id', $society->id)->get();
        if ($vaccinations->count() == 2) {
            return response()->json([
                'status' => 'success',
                'message' => 'You can only be vaccinated two times'
            ], 200);
        } else if ($vaccinations->count() == 1) {
            $vaccination = Vaccinations::create([
                'dose' => 2,
                'date' =>  Carbon::now(),
                'society_id' =>  $society->id,
                'spot_id' =>  $request->spot_id,
                'vaccine_id' =>  null,
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Your second vaccine registration is done.'
            ], 200);
        } else {
            $vaccination = Vaccinations::create([
                'dose' => 1,
                'date' =>  Carbon::now(),
                'society_id' =>  $society->id,
                'spot_id' =>  $request->spot_id,
                'vaccine_id' =>  null,
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Your vaccine registration is done.'
            ], 200);
        }
    }
}
