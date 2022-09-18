<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class UsersMatched extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * @var UsersMatched
     */
    private UsersMatched $event;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(UsersMatched $event)
    {
        $this->event = $event;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('mail.match-found');
    }
}
