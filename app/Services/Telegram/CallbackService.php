<?php

namespace App\Services\Telegram;

use App\Enum;
use App\Models\Celebrity;
use App\User;
use App\Services\CelebrityService;
use App\Services\QIWI\PaymentService;
use Illuminate\Support\Facades\Log;
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
        if ($user) $this->user = $user;
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
}
