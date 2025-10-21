<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class VerificationCodeMail extends Mailable
{
    use Queueable, SerializesModels;

    public $code;
    public $nombre;

    public function __construct($code, $nombre)
    {
        $this->code = $code;
        $this->nombre = $nombre;
    }

    public function build()
    {
        return $this->subject('Código de verificación - MaxiAlimentos Intranet')
                    ->view('emails.verification-code');
    }
}
