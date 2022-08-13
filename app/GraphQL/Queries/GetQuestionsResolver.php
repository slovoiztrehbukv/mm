<?php

namespace App\GraphQL\Queries;

use App\Models\Question;
use App\Http\Resources\QuestionResource;

final class GetQuestionsResolver
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $questions = Question::take($args['questionsQuantity'])->get();
        
        return QuestionResource::collection($questions)
            ->resolve();
    }
}
