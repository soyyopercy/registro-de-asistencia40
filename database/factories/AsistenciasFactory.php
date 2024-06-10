<?php

namespace Database\Factories;
use App\Models\Asistencias;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Asistencias>
 */
class AsistenciasFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {   $tipo_evento = ['Ingreso','Salida'];
       
        return [
            //
            
            'dni' => $this->faker->text(8),
            'tipo_evento' => $this->faker->randomElement($tipo_evento),
            'tiempo'=> $this ->faker->dateTimeThisMonth()->format('Y-m-d H:i:s'),
            'ip_publica' => $this->faker->text(15),
            'coordenadas' => $this ->faker->text(255),

        ];
    }
}
