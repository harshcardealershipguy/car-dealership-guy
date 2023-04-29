<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use App\Models\Role;
use App\Models\Message;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class MessageController extends Controller
{
    public function getMessages($otherUserExternalId) {
        $currentUser = Auth::user()->external_id;

        $messages = DB::select("SELECT * FROM messages WHERE
            (from_user_external_id= :currentUser AND to_user_external_id= :otherUserExternalId) OR
            (from_user_external_id= :otherUserExternalId AND to_user_external_id= :currentUser)
            ORDER BY created_at
            "
        , array('currentUser' => $currentUser, 'otherUserExternalId' => $otherUserExternalId));

        $otherUser = User::select('name')->where('external_id', $otherUserExternalId)->first();

        return ['otherUser' => $otherUser, 'messages' => $messages];
    }

    public function getConversations() {
        $currentUser = Auth::user()->external_id;

        return DB::select("SELECT name, other_user_external_id, message_created_at::TIMESTAMP WITH TIME ZONE as last_message_at, content
                           FROM (

                               (SELECT DISTINCT ON (other_user_external_id) other_user_external_id, created_at as message_created_at, content
                               FROM ((SELECT DISTINCT ON (to_user_external_id) to_user_external_id as other_user_external_id, created_at, content
                                      FROM messages
                                      WHERE from_user_external_id = :currentUser
                                      ORDER BY to_user_external_id, created_at desc, content)

                                     UNION ALL

                                     (SELECT DISTINCT ON (from_user_external_id) from_user_external_id as other_user_external_id, created_at, content
                                      FROM messages
                                      WHERE to_user_external_id = :currentUser
                                      ORDER BY from_user_external_id, created_at desc, content)) as subquery

                               ORDER BY other_user_external_id, created_at desc) aggregated_messages

                               LEFT JOIN users
                               ON  other_user_external_id = external_id
                           ) as aggregated_messages
                            "
                        , array('currentUser' => $currentUser));


    }

    public function addMessage(Request $request, $otherUserExternalId)
    {
        $request->validate([
            'content' => ['required', 'max:65535']
        ]);

        $user = Message::create([
            'from_user_external_id' => Auth::user()->external_id,
            'to_user_external_id' => $otherUserExternalId,
            'content' => $request->content
        ]);


        return response()->noContent();
    }
}
