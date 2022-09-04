<?php

namespace App\Listeners;

use App\Enum;
use App\Events\MatchFound;
use App\Mail\MatchFound as MailMatchFound;
use App\Services\UserService;
use App\Services\NotificationService;

class NotifyAnsweredUser
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle(MatchFound $event)
    {
        $answeredUser = $event->answerLatest->user;



        switch(UserService::getPreferedContactMethod($answeredUser)) {

            case ENUM::CONTACT_METHODS['tlg']: {

                NotificationService::sendTelegramMessage(
                    $answeredUser->tlg_id,
                    getMessageTpl('match_found__answered', $event)
                );

                break;
                
            }

            case ENUM::CONTACT_METHODS['vk']: {

                NotificationService::sendVKMessage(
                    $answeredUser->vk_id,
                    "VK MESSAGE TEXT HERE"
                );

                break;

            }

            case ENUM::CONTACT_METHODS['email']: {

                NotificationService::sendEmail(
                    $answeredUser->email,
                    new MailMatchFound($event)
                );

                break;

            }

        }
    }
}
