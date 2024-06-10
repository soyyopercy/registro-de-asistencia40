<?php

namespace App\Http\Controllers;

use App\Models\Asistencias;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AsistenciasController extends Controller


{
   
    public function index()
    {
        //
        $asistencias = Asistencias::all();
        return Inertia::render('Asistencias/Index',['asistencias'=>$asistencias]);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
        $request-> validate([
            'dni' => 'required|max:8',
            'tipo_evento' => 'required|max:15',
            'tiempo'=>'required|max:100',
            'ip_publica'=>'required|max:15',
            'coordenadas'=>'required|max:255'

        ]);
        $asistencias =new Asistencias($request->input());
        $asistencias->save();
        return redirect('asistencias');
    }

    public function show(Asistencias $asistencias)
    {
        //
    }

    public function edit(Asistencias $asistencias)
    {
        //
    }

    
    public function update(Request $request, Asistencias $asistencias)
    {
        //
        $asistencias = Asistencias::find($id);
        $asistencias = fill($request->input())->saveOrFail();
        return redirect('asistencias');
    }

   
    public function destroy(Asistencias $asistencias)
    {
        //
        $asistencias = Asistencias::find($id);
        $asistencias = delete();
        return redirect('asistencias');

    }
}
