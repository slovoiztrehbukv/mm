<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class QuestionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => ucfirst("{$this->faker->word} {$this->faker->word} {$this->faker->word}?"),
            'is_published' => rand(0, 1),
            'is_moderating' => rand(0, 1)
        ];
    }

    public function answers(int $count = 4)
    {
        return $this->state(function() use ($count){
            $answers = [];

            for ($i = 0; $i < $count; $i++) {
                $answers[] = $this->faker->word;
            }
            
            return [
                'answers' => $answers
            ];
        });
    }
}
