<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vaccinations extends Model
{
    use HasFactory;

    protected $table = 'vaccinations';

    public $timestamps = false;

    protected $fillable = [
        'dose',
        'date',
        'society_id',
        'spot_id',
        'vaccine_id',
    ];
}
