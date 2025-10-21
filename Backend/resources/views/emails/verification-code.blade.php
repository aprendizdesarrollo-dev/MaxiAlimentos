<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Código de verificación</title>
</head>
<body style="font-family: Arial, sans-serif; background: #f5f5f5; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 10px; overflow: hidden;">
        <div style="background: #397C3C; padding: 20px; text-align: center;">
            <h2 style="color: #fff;">MaxiAlimentos Intranet</h2>
        </div>

        <div style="padding: 30px; text-align: center;">
            <h3>Hola {{ $nombre }} 👋</h3>
            <p>Gracias por registrarte en la intranet de <strong>MaxiAlimentos</strong>.</p>
            <p>Tu código de verificación es:</p>

            <div style="font-size: 32px; font-weight: bold; color: #397C3C; margin: 20px 0;">
                {{ $code }}
            </div>

            <p>Este código expirará en <strong>15 minutos</strong>.</p>
            <p style="font-size: 12px; color: #888;">Si no solicitaste este registro, ignora este mensaje.</p>
        </div>

        <div style="background: #f0f0f0; padding: 10px; text-align: center;">
            <small>© {{ date('Y') }} MaxiAlimentos S.A.S - Todos los derechos reservados</small>
        </div>
    </div>
</body>
</html>
