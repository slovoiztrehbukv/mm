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

class UsersMatched
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * @var UserAnswer
     */
    public UserAnswer $answerLatest;

    /**
     * @var UserAnswer
     */
    public UserAnswer $answerWaiting;

    /**
     * @var integer
     */
    public int $accuracy;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(array $data)
    {
        // TODO DATA TO DTO
        $this->answerLatest = $data['answerLatest'];
        $this->answerWaiting = $data['answerWaiting'];
        $this->accuracy = $data['accuracy'];
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
