import api from "../../../services/api";

export default function useMensajes() {

    // 🟢 Obtener conversaciones recientes (para MensajesCard y Dashboard)
    const obtenerConversaciones = async () => {
        try {
            const res = await api.get("/mensajes/conversaciones");

            return Array.isArray(res.data?.data) ? res.data.data : [];

        } catch (e) {
            console.error("Error obteniendo conversaciones:", e);
            return [];
        }
    };

    // 🟢 Obtener historial de chat con un usuario
    const obtenerChat = async (id) => {
        try {
            const res = await api.get(`/mensajes/chat/${id}`);

            return res.data?.data?.messages || [];

        } catch (e) {
            console.error(`Error obteniendo chat con usuario ${id}:`, e);
            return [];
        }
    };

    // 🟢 Enviar mensaje
    const enviarMensaje = async (id, mensaje) => {
        try {
            const body = {
                destinatario_id: Number(id),
                mensaje: mensaje.trim(),
            };

            const res = await api.post("/mensajes/enviar", body);

            return res.data?.data || null;

        } catch (e) {
            console.error("Error enviando mensaje:", e?.response?.data || e);
            return null;
        }
    };

    return {
        obtenerConversaciones,
        obtenerChat,
        enviarMensaje,
    };
}
