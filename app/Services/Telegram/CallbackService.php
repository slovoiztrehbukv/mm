<?php

namespace App\Services\Telegram;

use App\Enum;
use App\Models\Celebrity;
use App\Models\User;
use App\Services\CelebrityService;
use App\Services\QIWI\PaymentService;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Log;
use Telegram\Bot\Keyboard\Keyboard;
use Telegram\Bot\Laravel\Facades\Telegram;
use Telegram\Bot\Objects\Message;

class CallbackService
{
    private static $actToMethodSchema = [
        '/pay' => 'pay',
    ];
    
    private APIService $api;

    private ?Message $message;
    
    private ?User $user;

    public function __construct(Message $msg)
    {
        $this->message = $msg;
        $this->api = new APIService();
        $user = User::where(['tlg_id' => $msg['chat']['id']])->first();
        if ($user) {
            $this->user = $user;
            App::setLocale($user->locale);
        }
    }
    
    public static function process($callback)
    {
        $instance = new static($callback->getMessage());
        $data = $callback->getData();   
        
        $data = explode('_', $data);
        if(count($data) === 2) {
            $method = $data[0];
            $arg = $data[1];
            if(method_exists($instance, $method)){
                $instance->$method($arg);
            } else {
                Log::error('INCORRECT METHOD@CALLBACKSERVICE::PROCESS', (array)$data);
            }
        }else{
            Log::error('INCORRECT EXPLOSION@CALLBACKSERVICE::PROCESS', (array)$callback);
        }
    }



    private function initialSetLanguage(string $lang = 'en')
    {
        App::setLocale($lang);

        $this->user->locale = $lang;
        $this->user->save();

        $this->api->sendMessage([
            'chat_id' => $this->message['chat']['id'],
            'text' => getMessageTpl('initialLanguageWasSet'),
            'parse_mode' => 'html'
        ]);



        $targets = [ // ?TODO ENUM
            [
                'title' => 'friend_genitive',
                'value' => 'friend'
            ],
            [
                'title' => 'soulmate_genitive',
                'value' => 'soulmate'
            ]
            // [
            //     'title' => 'love_genitive',
            //     'value' => 'love'
            // ],
        ];

        $keyboard = Keyboard::make()->inline();


        foreach($targets as $target) {
            $keyboard->row(
                Keyboard::inlineButton([
                    'text' => __($target['title']),
                    'callback_data' => "lookingFor_{$target['value']}"
                ])
            );
        }
       
        

        $this->api->sendMessage([
            'chat_id' => $this->message['chat']['id'],
            'text' => getMessageTpl('whoWillWeLookFor'),
            'parse_mode' => 'html',
            'one_time_keyboard' => true,
            'reply_markup' => $keyboard
        ]);
    }

    public function lookingFor(string $target)
    {
        $this->api->sendMessage([
            'chat_id' => $this->message['chat']['id'],
            'text' => $target,
            'parse_mode' => 'html'
        ]);
    }
}
