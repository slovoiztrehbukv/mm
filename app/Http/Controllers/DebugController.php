<?php

namespace App\Http\Controllers;

use App\Enum;
use App\Models\User;
use App\Models\Batch;
use App\Models\Image;
use App\Models\Answer;
use App\Models\Author;
use App\Models\Category;
use App\Models\Question;
use App\Models\UserAnswer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Telegram\Bot\Keyboard\Keyboard;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\QuestionResource;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;

class DebugController extends Controller
{
    public function index()
    {
        $answersMatches = [];

        $this->userAnswer = UserAnswer::first();

        $potentialUserAnswers = UserAnswer::query()
            ->where(
                'answers_quantity',
                '=',
                $this->userAnswer->answers_quantity
            )
            ->where('batch_id', '=', $this->userAnswer->batch_id)
            ->where('id', '!=', $this->userAnswer->id)
            ->where('user_id', '!=', $this->userAnswer->user->id)
            ->whereNotIn(
                'user_id',
                $this->userAnswer->user->usersWereFound->pluck('id')->toArray()
            )
            ->whereNotIn(
                'user_id',
                $this->userAnswer->user->usersDidFound->pluck('id')->toArray()
            )
            ->get();

        $currentAnswers = $this->userAnswer->answers_ids;
        $targetAnswers = $potentialUserAnswers
            ->mapWithKeys(function ($targetUA) {
                return [$targetUA->id => $targetUA->answers_ids];
            })
            ->toArray();

        foreach ($targetAnswers as $id => $answers) {
            $answersMatches[$id] = count(
                array_intersect($answers, $currentAnswers)
            );
        }

        arsort($answersMatches);

        $bestPotentialMatchId = array_key_first($answersMatches);

        $accuracy =
            ((int) $answersMatches[$bestPotentialMatchId]) /
            ((int) $this->userAnswer->answers_quantity); // ??? TODO FIXME
        $accuracy = round(100 * $accuracy);

        dd(24, $accuracy);
        return;

        $user = UserAnswer::find(7)->user;

        $potentialUserAnswers = UserAnswer::query()
            ->where('answers_quantity', '=', 4)
            ->where('batch_id', '=', 49)
            ->where('id', '!=', 7)
            ->where('user_id', '!=', 4)
            ->whereNotIn(
                'user_id',
                $user->usersWereFound->pluck('id')->toArray()
            )
            ->whereNotIn(
                'user_id',
                $user->usersDidFound->pluck('id')->toArray()
            )
            ->get();

        dd(22, $potentialUserAnswers);

        dd(321, $user->usersDidFound->pluck('id')->toArray());
        $user = auth()->user();
        dd(321, $user->id, $user->usersWereFound);
        // $args = [
        //     'login' => 'admin',
        //     'password' => 'password',
        //     'login' => 'user2',
        //     'password' => 'password2',
        // ];

        // if (Auth::attempt([
        //     'login' => $args['login'],
        //     'password' => $args['password'],
        // ])) {
        //     request()->session()->regenerate();

        //     return ['success' => true];
        // }

        dd(222, Auth::user()->id);
        if (
            Auth::attempt([
                'login' => 'admin',
                'password' => 'password',
                'login' => 'user2',
                'password' => 'password2',
            ])
        ) {
            return ['success' => true];
        }
        // dd(333, Auth::user()->id);

        // return 777;
        dd(
            321,
            response()
                ->json([])
                ->withCookie(cookie('TESZZ!!!', '321312312'))
        );
        // return ;

        // Auth::loginUsingId(2, true);
        // Session::save();

        // Auth::logout();
        // Session::flush();
        // request()->session()->invalidate();
        // request()->session()->regenerate();

        // session()->flush();
        // $response = response()->json([]);

        // foreach(request()->cookies as $cookieKey => $cookieValue) {
        //     $response->withCookie(Cookie::forget($cookieKey));
        // }

        // return $response;
        dd(321, session()->all(), Auth::user());
        // dd(11, $res);
        try {
            $data = checkTelegramAuthorization(request()->query());
            dd($data);
        } catch (\Throwable $e) {
            dd(222, $e->getMessage());
        }

        dd(22, Socialite::driver('telegram')->redirect());
        // return Socialite::driver('telegram')->redirect();

        // ALGORITHM DRAFT

        $answersMatches = [];

        $srcUA = UserAnswer::find(1);

        $targetUAS = UserAnswer::query()
            ->where('answers_quantity', '=', $srcUA->answers_quantity)
            ->where('batch_id', '=', $srcUA->batch_id)
            ->where('id', '!=', $srcUA->id)
            ->whereNotNull('user_id')
            ->get();

        $srcAnswers = $srcUA->answers_ids;
        $targetAnswers = $targetUAS
            ->mapWithKeys(function ($targetUA) {
                return [$targetUA->id => $targetUA->answers_ids];
            })
            ->toArray();

        foreach ($targetAnswers as $id => $answers) {
            $answersMatches[$id] = count(
                array_intersect($answers, $srcAnswers)
            );
        }

        arsort($answersMatches);

        $matchedUserAnswerId = array_keys($answersMatches)[0];
        return $matchedUserAnswerId;

        $response = response()->json([true]);

        foreach (request()->cookies as $cookieKey => $cookieValue) {
            $response->withCookie(Cookie::forget($cookieKey));
        }

        return $response;
        dd(222);
        // $guard = Auth::guard('sanctum');
        // dd(555, $guard->user(), Auth::user());

        $response = redirect()->back();
        foreach (request()->cookies as $cookieKey => $cookieValue) {
            $response->withCookie(Cookie::forget($cookieKey));
        }
        return $response;
        dd(222, get_class_methods(Cookie::class));
        $img = Image::find(7);
        $answer = Answer::find(7);

        dd($answer->image->url());

        $args = [
            'questionsQuantity' => 3,
            'answersQuantity' => 12,
        ];

        $batch = Batch::where('title', 'like', '%Soulmating%')->firstWhere(
            'questions_quantity',
            $args['questionsQuantity']
        );

        $batch = $batch ?? Batch::firstWhere('questions_quantity', 2);
        $batch->questions->map(function (Question $question) use ($args) {
            $count = $question->answers->count();
            $take =
                $args['answersQuantity'] <= $count
                    ? $args['answersQuantity']
                    : $count;
            $take = min($take, 6);

            $question->answers = $question->answers->random($take);
            return $question;
        });

        return QuestionResource::collection($batch->questions);

        return;
        App::setLocale('ru');

        $targets = [
            // ?TODO ENUM
            'friend_genitive',
            'soulmate',
            // 'love',
        ];

        $keyboard = Keyboard::make()->inline();

        foreach ($targets as $target) {
            $keyboard->row(
                Keyboard::inlineButton([
                    'text' => __($target),
                    'callback_data' => "lookingFor_$target",
                ])
            );
        }

        dd(321, $keyboard->toArray());

        return;

        $keyboard = Keyboard::make()->inline();

        foreach (Enum::LANGUAGES as $code => $data) {
            $keyboard->row(
                Keyboard::inlineButton([
                    'text' => $data['icon'] . ' ' . $data['title'],
                    'callback_data' => "setLanguage_$code",
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

        dd(
            $var
                ->votes()
                ->with('user')
                ->get()
        );

        return;

        $args = [
            'questionsQuantity' => 4,
            'answersQuantity' => 2,
        ];
        $questions = Question::take($args['questionsQuantity'])->get();
        $questions->each(function (Question &$question) use ($args) {
            $question->answers = $question->answers->random(
                $args['answersQuantity']
            );
            return $question;
        });

        return QuestionResource::collection($questions);
    }
}
