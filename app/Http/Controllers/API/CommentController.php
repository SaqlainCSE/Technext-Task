<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function index()
    {
        $comments = Comment::all();
        return response()->json([
            'success' => true,
            'message' => 'Comment List',
            'data' => $comments,
        ]);
    }

    public function findById($id)
    {
        $comment = Comment::with('post')->find($id);

        if(is_null($comment))
        {
            return response()->json([
                'success' => false,
                'message' => 'Comment Not Found',
                'data' => null,
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Comment Find',
            'data' => $comment,
        ]);
    }

    public function create(Request $request, $id)
    {
        $comment = new Comment();
        $comment->post_id = $id;
        $comment->user_id = 1;
        $comment->content = $request->content;
        $comment->save();

        $comment = comment::find($comment->id);

        return response()->json([
            'success' => true,
            'message' => 'comment given to post successfully',
            'data' => $comment,
        ], 201);
    }

    public function update(Request $request, $id)
    {

        $comment = Comment::find($id);

        if(is_null($comment))
        {
            return response()->json([
                'success' => false,
                'message' => 'Comment Not Found',
                'data' => null,
            ]);
        }

        //$comment->post_id = $id;
        $comment->user_id = 1;
        $comment->content = $request->content;
        $comment->save();

        return response()->json([
            'success' => true,
            'message' => 'Comment Updated',
            'data' => $comment,
        ]);
    }

    public function delete($id)
    {
        $comment = Comment::find($id);

        if(is_null($comment))
        {
            return response()->json([
                'success' => false,
                'message' => 'Comment Not Found',
                'data' => null,
            ]);
        }

        $comment->delete();

        return response()->json([
            'success' => true,
            'message' => 'Comment Deleted',
            'data' => $comment,
        ]);
    }
}
