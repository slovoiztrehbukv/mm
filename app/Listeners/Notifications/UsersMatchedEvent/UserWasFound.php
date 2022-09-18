<?php

namespace App\Listeners\Notifications\UsersMatchedEvent;

use App\Enum;
use App\Events\UsersMatched;
use App\Services\UserService;
use Illuminate\Support\Facades\Log;
use App\Services\NotificationService;
use App\Mail\UsersMatched as MailUsersMatched;

/**
 * Notify User that was found
 */
class UserWasFound
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
    public function handle(UsersMatched $event)
    {
        switch (UserService::getPreferedContactMethod($event->userWasFound)) {
            case ENUM::CONTACT_METHODS['tlg']:
                NotificationService::sendTelegramMessage(
                    $event->userWasFound->tlg_id,
                    getMessageTpl('users_matched__user_was_found', [
                        'event' => $event,
                    ])
                );

                break;

            case ENUM::CONTACT_METHODS['vk']:
                NotificationService::sendVKMessage(
                    $event->userWasFound->vk_id,
                    'VK MESSAGE TEXT HERE'
                );

                break;

            case ENUM::CONTACT_METHODS['email']:
                NotificationService::sendEmail(
                    $event->userWasFound->email,
                    new MailUsersMatched($event)
                );

                break;
        }
    }
}
