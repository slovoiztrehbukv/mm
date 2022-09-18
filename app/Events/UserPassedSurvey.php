<?php

namespace App\Events;

use App\Models\UserAnswer;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class UserPassedSurvey
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * @var UserAnswer
     */
    private UserAnswer $userAnswer;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(UserAnswer $userAnswer)
    {
        $this->userAnswer = $userAnswer;
    }

    /**
     * UserAnswer getter`
     *
     * @return void
     */
    public function getUserAnswer()
    {
        return $this->userAnswer;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('channel-name');
    }
}
