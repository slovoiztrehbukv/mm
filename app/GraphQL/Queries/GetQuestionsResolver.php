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
        $questions->each(function(Question &$question) use ($args) {
            $question->answers = $question->answers->random($args['answersQuantity']);
            return $question;
        });

        return QuestionResource::collection($questions);
    }
}
