<?php

namespace App\Services\Telegram;

use App\Enum;
use App\Models\User;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Log;
use Telegram\Bot\Laravel\Facades\Telegram;
use Telegram\Bot\Keyboard\Keyboard;
use Telegram\Bot\Objects\Message;

class MessageService
{
    private static $msgToMethodSchema = [
        '/start' => 'start',
        '/set_language' => 'setLanguage',
        '/balance' => 'balance',
    ];

    private ?Message $message;
    
    private ?User $user;

    public function __construct(Message $msg)
    {
        $this->message = $msg;
        $user = User::where(['tlg_id' => $msg['from']['id']])->first();
        if ($user) {
            $this->userInit($user);
            App::setLocale($user->locale);
        }
    }

    public static function process(Message $msg)
    {
        $instance = new static($msg);
        $methods = self::$msgToMethodSchema;
        $method = isset($msg['text']) ? trim($msg['text']) : 'unknown';
        
        if (isset($methods[$method])){
            $method = $methods[$method];
            $instance->$method();
        } else {
            // $instance->searchByName();
        }
        
    }
    
    private function userCreate()
    {
        $user = User::firstOrCreate([
            'tlg_id' => $this->message['from']['id']
        ]);
        
        $user->name = trim($this->message['from']['first_name']);
        $user->save();
        
        $this->userInit($user);
    }
    
    private function userInit(User $user)
    {
        $this->user = $user;
    }



    // message handlers bellow (must be contained in routes at self::$msgToMethodSchema)
    public function start()
    {
        $this->userCreate();
        
        Telegram::sendMessage([
            'chat_id' => $this->message['from']['id'],
            'parse_mode' => 'html',
            'text' => getMessageTpl('start', ['user' => $this->user])
        ]);
    }

    public function setLanguage()
    {
        if (!isset($this->user)) $this->userCreate();

        foreach (Enum::LANGUAGES as $code => $data) {
            $btn = new \stdClass();
            $btn->callback_data = "setLanguage_$code";
            $btn->text = $data['icon'] . ' ' . $data['title'];
            $btns[] = [$btn];
        }

        Telegram::sendMessage([
            'chat_id' => $this->message['from']['id'],
            'parse_mode' => 'html',
            'text' => getMessageTpl('start', ['user' => $this->user]),
            'one_time_keyboard' => true,
            'reply_markup' => Keyboard::make([
                'keyboard' => $btns,
                'resize_keyboard' => true, 
                'one_time_keyboard' => true
            ])
        ]);
    }
    
    public function unknown()
    {
        Telegram::sendMessage([
            'chat_id' => $this->message['from']['id'],
            'parse_mode' => 'html',
            'text' => getMessageTpl('unknown', ['text' => 'oops... something went wrong...'])
        ]);
    }
}
