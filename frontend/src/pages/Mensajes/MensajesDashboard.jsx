import { useState, useEffect } from "react";
import api from "../../services/api";

import ConversationItem from "./components/ConversationItem";
import ChatWindow from "./components/ChatWindow";
import useMensajes from "./hooks/useMensajes";

export default function MensajesDashboard() {

    const { obtenerChat, enviarMensaje } = useMensajes();

    const [usuarios, setUsuarios] = useState([]);
    const [activeChat, setActiveChat] = useState(null);
    const [chatActual, setChatActual] = useState([]);

    // =============================
    // CARGAR LISTA DE USUARIOS
    // =============================
    const cargarUsuarios = async () => {
        try {
            const res = await api.get("/directorio");
            setUsuarios(res.data.data);
        } catch (e) {
            console.error("Error cargando empleados:", e);
        }
    };

    // =============================
    // SELECCIONAR USUARIO Y CARGAR CHAT
    // =============================
    const seleccionarChat = async (id) => {
        console.log("Seleccionando chat con:", id);

        setActiveChat(id);

        // obtenerChat YA DEVUELVE UN ARRAY DE MENSAJES
        const mensajes = await obtenerChat(id);

        console.log("Mensajes cargados:", mensajes);

        setChatActual(mensajes);
    };

    // =============================
    // ENVIAR MENSAJE
    // =============================
    const handleEnviarMensaje = async (texto) => {

        if (!activeChat) return;

        console.log("Enviando mensaje a:", activeChat);

        await enviarMensaje(activeChat, texto);

        // Recargar mensajes actualizados
        const mensajes = await obtenerChat(activeChat);

        console.log("Mensajes luego de enviar:", mensajes);

        setChatActual(mensajes);
    };

    // =============================
    // CARGAR USUARIOS AL INICIAR
    // =============================
    useEffect(() => {
        cargarUsuarios();
    }, []);

    return (
        <div className="flex gap-6 w-full h-[85vh]">

            {/* LISTA DE CHATS */}
            <div className="w-[320px] bg-white shadow rounded-2xl p-4 overflow-y-auto">
                <h2 className="font-semibold text-[#397C3C] mb-4 text-lg">Chats</h2>

                <div className="flex flex-col gap-2">
                    {usuarios?.length > 0 ? (
                        usuarios.map((u) => (
                            <ConversationItem
                                key={u.id}
                                usuario={u}
                                ultimoMensaje={"Salúdalo"}
                                onClick={() => seleccionarChat(u.id)}
                                isActive={activeChat === u.id}
                            />
                        ))
                    ) : (
                        <p className="text-gray-500 text-sm">Cargando empleados...</p>
                    )}
                </div>
            </div>

            {/* VENTANA DE CHAT */}
            <div className="flex-1 bg-white shadow rounded-2xl p-4">
                {activeChat ? (
                    <ChatWindow
                        mensajes={chatActual}
                        onEnviarMensaje={handleEnviarMensaje}
                    />
                ) : (
                    <p className="text-center text-gray-500 mt-20 text-lg">
                        Selecciona un chat para comenzar.
                    </p>
                )}
            </div>
        </div>
    );
}
