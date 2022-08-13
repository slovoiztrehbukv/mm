<?php

namespace Database\Seeders;

use App\Models\Batch;
use App\Models\Question;
use Illuminate\Database\Seeder;

class BatchSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $questions = Question::all();

        foreach([2, 8, 10, 12, 16, 16, 18, 20] as $quantity) {
            Batch::create([
                'title' => "Batch for $quantity questions",
                'questions_quantity' => $quantity
            ])
                ->questions()
                ->sync(array_column($questions->random($quantity)->all(), 'id'));
        }
    }
}
