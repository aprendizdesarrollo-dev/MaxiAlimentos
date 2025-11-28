<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Conversation extends Model
{
    use HasFactory;

    // Campos asignables en masa
    protected $fillable = [
        'user1_id',
        'user2_id',
        'last_message',
        'last_message_at',
        'unread_count_user1',
        'unread_count_user2',
    ];

    protected $dates = [
        'last_message_at',
    ];

    /**
     * Usuario 1 de la conversación.
     */
    public function user1()
    {
        return $this->belongsTo(User::class, 'user1_id');
    }

    /**
     * Usuario 2 de la conversación.
     */
    public function user2()
    {
        return $this->belongsTo(User::class, 'user2_id');
    }

    /**
     * Mensajes de la conversación.
     */
    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    /**
     * Devuelve el otro usuario de la conversación,
     * dado el id de un usuario autenticado.
     */
    public function otherUser(int $authUserId)
    {
        if ($this->user1_id === $authUserId) {
            return $this->user2;
        }

        return $this->user1;
    }
}
