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
        Schema::create('matches', function (Blueprint $table) {
            $table->id();

            // TODO
            $table->foreignId('user_1_id')
                ->constrained('users')
                ->cascadeOnDelete();

            $table->foreignId('user_2_id')
                ->constrained('users')
                ->cascadeOnDelete();
            // ^ TODO 
            

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
        Schema::dropIfExists('matches');
    }
}
