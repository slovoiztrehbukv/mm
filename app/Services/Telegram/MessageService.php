<?php

namespace App\Services\Telegram;

use App\Enum;
use App\Models\User;
use Illuminate\Support\Facades\App;
use Telegram\Bot\Laravel\Facades\Telegram;
use Telegram\Bot\Keyboard\Keyboard;
use Telegram\Bot\Objects\Message;

/**
 * MessageService means ReceivedMessageService
 */
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
            $instance->listenForCode();
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

        $keyboard = Keyboard::make()->inline();

        foreach (Enum::LANGUAGES as $code => $data) {
            $keyboard->row(
                Keyboard::inlineButton([
                    'text' => $data['icon'] . ' ' . $data['title'],
                    'callback_data' => "initialSetLanguage_$code"
                ])
            );
        }

        Telegram::sendMessage([
            'chat_id' => $this->message['from']['id'],
            'parse_mode' => 'html',
            'text' => getMessageTpl('start', ['user' => $this->user]),
            'one_time_keyboard' => true,
            'reply_markup' => $keyboard
        ]);
    }

    public function listenForCode()
    {
        if (!isset($this->user)) $this->userCreate();

        $code = isset($this->message['text']) ? trim($this->message['text']) : null;

        if (!$this->user->will_provide_answers_code || !$code) return;

        // TODO add answers to users logic here...

        Telegram::sendMessage([
            'chat_id' => $this->message['from']['id'],
            'parse_mode' => 'html',
            'text' => "код $code мне неизвестен :("
        ]);

    }
}
