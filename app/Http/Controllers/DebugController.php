<?php

namespace App\Http\Controllers;

use App\Enum;
use App\Models\User;
use App\Models\Batch;
use App\Models\Author;
use App\Models\Category;
use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Telegram\Bot\Keyboard\Keyboard;
use App\Http\Resources\QuestionResource;

class DebugController extends Controller
{
    public function index()
    {


        $args = [
            'questionsQuantity' => 3,
            'answersQuantity' => 12,
        ];


        $batch = Batch::where('title', 'like', '%Soulmating%')
            ->firstWhere('questions_quantity', $args['questionsQuantity']);

        $batch = $batch ?? Batch::firstWhere('questions_quantity', 2);
        $batch->questions->map(function(Question $question) use ($args){
            $count = $question->answers->count();
            $take = $args['answersQuantity'] <= $count ? $args['answersQuantity'] : $count;
            $take = min($take, 6);

            $question->answers = $question->answers->random($take);
            return $question;
        });

        return QuestionResource::collection($batch->questions);


        return;
        App::setLocale('ru');

        $targets = [ // ?TODO ENUM
            'friend_genitive',
            'soulmate',
            // 'love',
        ];

        $keyboard = Keyboard::make()->inline();


        foreach($targets as $target) {
            $keyboard->row(
                Keyboard::inlineButton([
                    'text' => __($target),
                    'callback_data' => "lookingFor_$target"
                ])
            );
        }
       
        dd(321, $keyboard->toArray());

        return;

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
