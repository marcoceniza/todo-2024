<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $todos = Auth::user()->todos()
                             ->with('user')
                             ->orderBy('created_at', 'DESC')
                             ->get();

        return response()->json([
            'success' => true,
            'message' => 'Fetch todos successfully',
            'result' => $todos
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        $validatedData = $request->validate([
            'title' => 'required|max:100'
        ]);

        $todo = Todo::create([...$validatedData, 'user_id' => $user->id]);

        return response()->json([
            'success' => true,
            'message' => 'Create new todo successfully',
            'result' => $todo
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Todo $todo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Todo $todo)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $todo = Auth::user()->todos()->where('id', $id)->first();
        
        if ($todo) {
            $todo->delete();

            return response()->json([
                'success' => true,
                'message' => 'Todo deleted successfully.'
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Todo not found.'
            ]);
        }
    }

    /**
     * Check if the todo is done.
     */
    public function done($id)
    {
        $todo = Auth::user()->todos()->where('id', $id)->first();

        if($todo->done === 0) {
            $todo->done = 1;
            $todo->important = 0;
            $todo->created_at = now();
        }else {
            $todo->done = 0;
        }

        $todo->save();
    }

    /**
     * Check if the todo is important.
     */
    public function important($id)
    {
        $todo = Auth::user()->todos()->where('id', $id)->first();

        if($todo->important === 0) {
            $todo->important = 1;
            $todo->created_at = now();
        }else {
            $todo->important = 0;
        }

        $todo->save();
    }

    /**
     * Check if the todo is important.
     */
    public function retrieve($id)
    {
        $todo = Auth::user()->todos()->where('id', $id)->first();

        $todo->done = 0;
        $todo->important = 0;
        $todo->created_at = now();
        $todo->save();

        return response()->json([
            'success' => true,
            'message' => 'Todo updated successfully'
        ]);
    }
}
