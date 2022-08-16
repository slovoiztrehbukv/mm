<?php

namespace App\Http\Controllers;

use App\Http\Resources\QuestionResource;
use App\Models\Author;
use App\Models\Question;
use App\Models\User;
use Illuminate\Http\Request;

class DebugController extends Controller
{
    public function index()
    {


        return;


        $var = User::find(1);
        $var = Author::find(2);

        dd($var->votes()->with('user')->get());




        return;



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
