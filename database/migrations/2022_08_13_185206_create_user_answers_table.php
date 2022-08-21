<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserAnswersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_answers', function (Blueprint $table) {
            $table->id();


            $table->foreignId('batch_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('user_id')
                ->nullable()
                ->comment('Null means: temporary answers')
                ->constrained()
                ->nullOnDelete();


            $table->integer('answers_quantity');
            $table->json('answers_ids');

            $table->string('code', 16)
                ->unique()
                ->nullable()
                ->comment('Code for user\'s answers ownership check');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_answers');
    }
}
