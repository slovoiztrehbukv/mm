<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Batch extends Model
{
    use HasFactory;



    protected $fillable = [
        'title',
        'questions_quantity'
    ];



    public function questions()
    {
        return $this->belongsToMany(Question::class);
    }
}
