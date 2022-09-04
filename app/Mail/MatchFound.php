<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class MatchFound extends Mailable
{
    use Queueable, SerializesModels;



    /**
     * @var MatchFound
     */
    private MatchFound $event;



    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(MatchFound $event)
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
