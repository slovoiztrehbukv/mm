<?php

namespace Database\Seeders;

use App\Models\Batch;
use App\Models\Category;
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
        $categories = Category::with('questions')->get();
        $quantities = [2, 8, 10, 12, 14, 16, 18, 20];

        foreach($categories as $category) {
            $categoryQuestionsCount = $category->questions()->count();

            foreach($quantities as $quantity) {
                $quantityToSync = $quantity <= $categoryQuestionsCount ? $quantity : $categoryQuestionsCount;

                Batch::create([
                    'title' => ucfirst("{$category->title} for $quantity questions"),
                    'questions_quantity' => $quantity,
                    'category_id' => $category->id,
                ])
                    ->questions()
                    ->sync(array_column($category->questions->random($quantityToSync)->all(), 'id'));
            }
        }




        $category = $categories
            ->sortBy(fn(Category $cat) => $cat->questions->count())
            ->last();

        $categoryQuestionsCount = $category->questions()->count();

        foreach($quantities as $quantity) {
            $quantityToSync = $quantity <= $categoryQuestionsCount ? $quantity : $categoryQuestionsCount;

            Batch::create([
                'title' => "Soulmating for $quantity questions",
                'questions_quantity' => $quantity
            ])
                ->questions()
                ->sync(array_column($category->questions->random($quantityToSync)->all(), 'id'));
        }

    }
}
