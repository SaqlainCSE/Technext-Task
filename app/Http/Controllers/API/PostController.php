<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::with('comments')->paginate(10);

        return response()->json([
            'success' => true,
            'message' => 'Post List',
            'data' => $posts,
            
        ]);
    }

    public function findById($id)
    {
        $post = Post::with('comments')->find($id);

        if(is_null($post))
        {
            return response()->json([
                'success' => false,
                'message' => 'Post Not Found',
                'data' => null,
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Post Find',
            'data' => $post,
        ]);
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => ['required'],
            'description' => ['required'],
        ]);

        if ($validator->fails()) 
        {
            return response()->json([
                'success' => false,
                'error' => $validator->errors(),
            ], 400);
        }

        $post = new Post();
        $post->title = $request->title;
        $post->description = $request->description;
        $post->user_id = Auth::id();
        $post->save();

        $post = Post::find($post->id);

        return response()->json([
            'success' => true,
            'message' => 'Post successfully!!!',
            'data' => $post,
        ], 200);
    }

    public function update(Request $request, $id)
    {

        $post = Post::find($id);


        if(is_null($post))
        {
            return response()->json([
                'success' => false,
                'message' => 'Post Not Found',
                'data' => null,
            ]);
        }

        $formData = $request->all();
        $validator = Validator::make($formData, [
            'title' => 'required',
            'description' => 'required',
        ], [

            'title.required' => 'Please Give Post Title',
            'description.required' => 'Please Give Post Description',
        ]);

        if($validator->fails())
        {
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag(),
            ]);
        }

        $post = Post::find($id);
        $post->title = $request->title;
        $post->description = $request->description;
        $post->user_id = 1;
        $post->save();

        return response()->json([
            'success' => true,
            'message' => 'Post Updated',
            'data' => $post,
        ]);
    }

    public function delete($id)
    {
        $post = Post::find($id);

        if(is_null($post))
        {
            return response()->json([
                'success' => false,
                'message' => 'Post Not Found',
                'data' => null,
            ]);
        }

        $post->delete();

        return response()->json([
            'success' => true,
            'message' => 'Post Deleted',
            'data' => $post,
        ]);
    }
}
