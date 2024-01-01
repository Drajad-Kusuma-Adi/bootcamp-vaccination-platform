<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Consultations extends Model
{
    use HasFactory;

    protected $table = 'consultations';

    public $timestamps = false;

    protected $fillable = [
        'society_id',
        'current_symptoms',
        'disease_history'
    ];
}
