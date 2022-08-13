<?php

namespace App\Http\Controllers;

use App\Http\Resources\QuestionResource;
use App\Models\Question;
use Illuminate\Http\Request;

class DebugController extends Controller
{
    public function index()
    {
        $questions = Question::take(4)->get();

        dd(
            321,
            QuestionResource::collection($questions),
            get_class_methods(QuestionResource::collection($questions)),
            QuestionResource::collection($questions)->resolve(),
        );

        return QuestionResource::collection($questions);
    }
}
