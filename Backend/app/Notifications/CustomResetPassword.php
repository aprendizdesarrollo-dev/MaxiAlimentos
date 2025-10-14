<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Notifications\Messages\MailMessage;

class CustomResetPassword extends ResetPassword
{
    public function toMail($notifiable)
    {
        // URL del frontend (React)
        $frontendUrl = env('FRONTEND_URL', 'http://localhost:5173'); // o el puerto de tu React

        $url = "{$frontendUrl}/reset-password/{$this->token}?email={$notifiable->getEmailForPasswordReset()}";

        return (new MailMessage)
            ->subject('Restablecer tu contraseña')
            ->greeting('Hola 👋')
            ->line('Recibiste este correo porque solicitaste restablecer tu contraseña.')
            ->action('Restablecer Contraseña', $url)
            ->line('Si no solicitaste el restablecimiento, puedes ignorar este mensaje.');
    }
}
