<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'conversation_id',
        'remitente_id',
        'destinatario_id',
        'mensaje',
        'leido',
        'read_at',
    ];

    protected $casts = [
        'leido' => 'boolean',
        'read_at' => 'datetime',
    ];

    /**
     * Conversación a la que pertenece este mensaje.
     */
    public function conversation()
    {
        return $this->belongsTo(Conversation::class);
    }

    /**
     * Usuario remitente (quien envía el mensaje).
     */
    public function remitente()
    {
        return $this->belongsTo(User::class, 'remitente_id');
    }

    /**
     * Usuario destinatario (quien recibe el mensaje).
     */
    public function destinatario()
    {
        return $this->belongsTo(User::class, 'destinatario_id');
    }
}
