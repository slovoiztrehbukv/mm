<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMatchesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users_matches', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_was_found_id')
				->comment('ID of desired (waiting) user')
                ->constrained('users')
                ->cascadeOnDelete();

            $table->foreignId('user_did_found_id')
				->comment('ID of latest user')
                ->constrained('users')
                ->cascadeOnDelete();

            $table->unique(['user_was_found_id', 'user_did_found_id']);

            $table->integer('accuracy')
                ->comment('Matching percentage');

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
        Schema::dropIfExists('users_matches');
    }
}
