import api from "../../../services/api";

export default function useMensajes() {

    // Obtener nuevos mensajes en una conversación desde el último ID conocido
    const obtenerNuevosMensajes = async (conversationId, lastId) => {
        try {
            const res = await api.get(`/mensajes/nuevos/${conversationId}?last_id=${lastId}`);
            return res.data?.data || [];
        } catch (e) {
            console.error("Error obteniendo mensajes nuevos:", e);
            return [];
        }
    };


    // Obtener historial de chat
    const obtenerChat = async (id) => {
        try {
            const res = await api.get(`/mensajes/chat/${id}`);

            return {
                conversation_id: res.data?.data?.conversation_id,
                messages: res.data?.data?.messages || [],
                other_user: res.data?.data?.other_user
            };

        } catch (e) {
            console.error(`Error obteniendo chat con usuario ${id}:`, e);
            return { conversation_id: null, messages: [] };
        }
    };

    // Enviar mensaje compatible con tu backend
    const enviarMensaje = async (destinatario_id, mensaje) => {
        try {
            const body = {
                destinatario_id,
                mensaje: mensaje.trim(),
            };

            const res = await api.post("/mensajes/enviar", body);

            return res.data?.data || null;

        } catch (e) {
            console.error("Error enviando mensaje:", e?.response?.data || e);
            return null;
        }
    };

    const obtenerConversaciones = async () => {
        try {
            const res = await api.get("/mensajes/conversaciones");
            return res.data?.data || [];
        } catch (e) {
            console.error("Error obteniendo conversaciones:", e);
            return [];
        }
    };


    return {
        obtenerChat,
        enviarMensaje,
        obtenerNuevosMensajes,
        obtenerConversaciones,
    };
}
