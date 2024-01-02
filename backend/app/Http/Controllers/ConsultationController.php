<?php

namespace App\Http\Controllers;

use App\Models\Consultations;
use App\Models\Doctors;
use App\Models\Societies;
use Illuminate\Http\Request;

class ConsultationController extends Controller
{
    public function getConsultation(Request $request)
    {
        $validation = $request->validate([
            'token' => 'required'
        ]);

        $society = Societies::where('login_tokens', $request['token'])->first();
        if (!$society) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid token'
            ], 401);
        }

        $consultation = Consultations::where('society_id', $society->id)->first();
        if (!$consultation) {
            return response()->json([
                'status' => 'success',
                'message' => "You haven't consulted yet"
            ], 200);
        }

        $doctor = Doctors::where('user_id', $consultation->doctor_id)->first();

        if (!$doctor) {
            return response()->json([
                'status' => 'success',
                'consultation_status' => $consultation->status,
                'current_symptoms' => $consultation->current_symptoms,
                'disease_history' => $consultation->disease_history,
                'doctor_name' => null,
                'doctor_notes' => null
            ], 200);
        } else {
            return response()->json([
                'status' => 'success',
                'consultation_status' => $consultation->status,
                'current_symptoms' => $consultation->current_symptoms,
                'disease_history' => $consultation->disease_history,
                'doctor_name' => $doctor->name,
                'doctor_notes' => $consultation->doctor_notes
            ], 200);
        }
    }

    public function postConsultation(Request $request)
    {
        $validation = $request->validate([
            'token' => 'required'
        ]);

        $society = Societies::where('login_tokens', $request['token'])->first();
        if (!$society) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid token'
            ], 401);
        }

        $consultation = Consultations::create([
            'society_id' => $society->id,
            'disease_history' => $request['disease_history'],
            'current_symptoms' => $request['current_symptoms']
        ]);
        if (!$consultation) {
            return response()->json([
                'status' => 'error',
                'message' => 'Something went wrong'
            ], 500);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Consultation successful'
        ], 200);
    }
}
