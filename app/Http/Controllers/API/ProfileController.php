<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProfileController extends Controller
{
    public function index()
    {
        $profile = Profile::with(['user'])->paginate(10);
        return response()->json([
            'success' => true,
            'message' => 'User Profile Details',
            'data' => $profile,
        ]);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show($id)
    {
        $profile = Profile::with(['user'])->find($id);
        if (is_null($profile)) {
            return response()->json([
                'success' => false,
                'message' => 'Profile not found',
            ], 404);
        }
        return response()->json([
            'success' => true,
            'message' => 'Profile Details',
            'data' => $profile,
        ]);
    }

    public function showByUsername($username)
    {
        $profile = Profile::with(['user'])->whereHas('user', function (Builder $query) use ($username) {
            $query->where('username', $username);
        })->first();
        if (is_null($profile)) {
            return response()->json([
                'success' => false,
                'message' => 'Profile not found',
            ], 404);
        }
        return response()->json([
            'success' => true,
            'message' => 'Profile Details',
            'data' => $profile,
        ]);
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $username)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}