<?php

namespace App\Http\Controllers;

use App\Enum;
use App\Http\Resources\QuestionResource;
use App\Models\Author;
use App\Models\Question;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Telegram\Bot\Keyboard\Keyboard;

class DebugController extends Controller
{
    public function index()
    {

        $keyboard = Keyboard::make()
            ->inline();

        foreach (Enum::LANGUAGES as $code => $data) {
           
            $keyboard->row(
                Keyboard::inlineButton([
                    'text' => $data['icon'] . ' ' . $data['title'],
                    'callback_data' => "setLanguage_$code"
                ])
            );
        }

        dd(321, $keyboard);
        

        return;

        $user = User::find(1);
        App::setLocale($user->locale);

        // dd(321, App::currentLocale());

        dd(123, view('messages.start', ['user' => User::find(1)])->render());



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
