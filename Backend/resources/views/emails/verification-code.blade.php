<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Código de verificación - MaxiAlimentos</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f8f8f8; margin: 0; padding: 0;">

    <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
        <tr>
            <td style="background-color: #397C3C; color: white; padding: 20px; text-align: center; border-top-left-radius: 10px; border-top-right-radius: 10px;">
                <img src="logo.png" alt="MaxiAlimentos" style="max-width: 180px; display: block; margin: 0 auto 10px;">
                <h2 style="margin: 0; font-size: 22px;">Código de Verificación</h2>
            </td>
        </tr>

        <tr>
            <td style="padding: 30px; text-align: center; color: #333;">
                <p style="font-size: 16px; margin-bottom: 15px;">Hola <strong>{{ $nombre }}</strong>,</p>
                <p style="font-size: 15px; margin-bottom: 20px;">
                    Gracias por registrarte en la intranet de <strong>MaxiAlimentos S.A.S.</strong><br>
                    Usa el siguiente código para completar tu registro:
                </p>

                <p style="font-size: 36px; color: #397C3C; font-weight: bold; letter-spacing: 4px; margin: 25px 0;">
                    {{ $code }}
                </p>

                <p style="font-size: 14px; color: #555;">
                    Este código tiene una validez de <strong>15 minutos</strong>.<br>
                    Si no solicitaste este registro, puedes ignorar este correo.
                </p>
            </td>
        </tr>

        <tr>
            <td style="background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #666; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
                © {{ date('Y') }} MaxiAlimentos S.A.S. - Todos los derechos reservados.
            </td>
        </tr>
    </table>

</body>
</html>
