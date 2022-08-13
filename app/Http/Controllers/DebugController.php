<?php

namespace App\Http\Controllers;

use App\Http\Resources\QuestionResource;
use App\Models\Question;
use Illuminate\Http\Request;

class DebugController extends Controller
{
    public function index()
    {
        $args = [
            'questionsQuantity' => 4,
            'answersQuantity' => 2,
        ];
        $questions = Question::take($args['questionsQuantity'])->get();
        $questions->each(function(Question &$question) use ($args) {
            $question->answers = $question->answers->random($args['answersQuantity']);
            return $question;
        });


        return QuestionResource::collection($questions);
    }
}
