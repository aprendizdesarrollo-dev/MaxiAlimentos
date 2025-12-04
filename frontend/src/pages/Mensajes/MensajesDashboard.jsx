import { useState, useEffect, useRef } from "react";
import { useUser } from "../Dashboard/hooks/useUser";
import useMensajes from "./hooks/useMensajes";

import ConversationItem from "./components/ConversationItem";
import ChatSearch from "./components/ChatSearch";
import ChatHeader from "./components/ChatHeader";
import ChatWindow from "./components/ChatWindow";

export default function MensajesDashboard() {

    const { user } = useUser();
    const authUserId = user?.id;

    const {
        obtenerConversaciones,
        obtenerChat,
        enviarMensaje,
        obtenerNuevosMensajes
    } = useMensajes();

    const [conversaciones, setConversaciones] = useState([]);
    const [activeChat, setActiveChat] = useState(null);
    const [conversationId, setConversationId] = useState(null);
    const [chatActual, setChatActual] = useState([]);
    const [busqueda, setBusqueda] = useState("");

    const escribiendoTimeout = useRef(null);
    const [estadoOtro, setEstadoOtro] = useState({
        escribiendo: false,
        enLinea: false,
        ultima_vez: null
    });

    // =============================
    // 1. CARGAR CONVERSACIONES
    // =============================
    useEffect(() => {
        const load = async () => {
            const data = await obtenerConversaciones();
            setConversaciones(data);
        };
        load();
    }, []);

    // =============================
    // 2. SELECCIONAR CHAT
    // =============================
    const seleccionarChat = async (usuario) => {
        setActiveChat(usuario);

        const data = await obtenerChat(usuario.id);

        setConversationId(data.conversation_id);
        setChatActual(data.messages);

        // Marcar unread_count en 0
        setConversaciones((prev) =>
            prev.map((c) =>
                c.other_user.id === usuario.id
                    ? { ...c, unread_count: 0 }
                    : c
            )
        );
    };

    // =============================
    // 3. ENVIAR MENSAJE
    // =============================
    const handleEnviarMensaje = async (texto) => {
        if (!activeChat) return;

        await enviarMensaje(activeChat.id, texto);

        // recargar chat completo
        const data = await obtenerChat(activeChat.id);
        setChatActual(data.messages);
        setConversationId(data.conversation_id);

        // actualizar panel izquierdo
        setConversaciones((prev) =>
            prev
                .map((c) =>
                    c.other_user.id === activeChat.id
                        ? {
                              ...c,
                              last_message: texto,
                              last_message_at: new Date().toISOString(),
                              unread_count: 0
                          }
                        : c
                )
                .sort((a, b) => new Date(b.last_message_at) - new Date(a.last_message_at))
        );
    };

    // =============================
    // 4. POLLING DE ESTADO
    // =============================
    useEffect(() => {
        if (!activeChat) return;

        const interval = setInterval(async () => {
            try {
                const res = await api.get(`/status/${activeChat.id}`);
                const data = res.data?.data;

                setEstadoOtro({
                    escribiendo: data.is_typing,
                    enLinea: data.en_linea,
                    ultima_vez: data.last_activity
                });
            } catch {}
        }, 1500);

        return () => clearInterval(interval);
    }, [activeChat]);

    // =============================
    // 5. POLLING DE MENSAJES NUEVOS
    // =============================
    useEffect(() => {
        if (!conversationId) return;

        const interval = setInterval(async () => {
            const lastId = chatActual.length > 0 ? chatActual[chatActual.length - 1].id : 0;

            const nuevos = await obtenerNuevosMensajes(conversationId, lastId);

            if (nuevos.length > 0) {
                setChatActual((prev) => [...prev, ...nuevos]);

                const ultimo = nuevos[nuevos.length - 1];

                // actualizar panel izquierdo
                setConversaciones((prev) =>
                    prev
                        .map((c) =>
                            c.other_user.id === activeChat.id
                                ? {
                                      ...c,
                                      last_message: ultimo.mensaje,
                                      last_message_at: ultimo.created_at,
                                      unread_count: 0
                                  }
                                : c
                        )
                        .sort((a, b) => new Date(b.last_message_at) - new Date(a.last_message_at))
                );
            }
        }, 1200);

        return () => clearInterval(interval);
    }, [conversationId, chatActual, activeChat]);

    // =============================
    // FILTRO
    // =============================
    const conversacionesFiltradas = conversaciones.filter((c) =>
        c.other_user.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    // =============================
    // RENDER
    // =============================
    return (
        <div className="flex gap-6 w-full h-[85vh]">

            {/* PANEL IZQUIERDO */}
            <div
                className="
                    w-[320px] bg-white rounded-3xl shadow-lg p-4
                    flex flex-col overflow-hidden border border-gray-200
                "
            >
                <h2 className="font-semibold text-[#397C3C] text-[17px] mb-2">Chats</h2>

                <ChatSearch value={busqueda} onChange={setBusqueda} />

                <div
                    className="
                        flex flex-col gap-1 overflow-y-auto scrollbar-thin 
                        scrollbar-thumb-gray-300 scrollbar-track-transparent pr-1
                    "
                    style={{ maxHeight: "calc(85vh - 120px)" }}
                >
                    {conversacionesFiltradas.map((c) => (
                        <ConversationItem
                            key={c.id}
                            usuario={c.other_user}
                            ultimoMensaje={c.last_message}
                            ultimaHora={c.last_message_at}
                            unreadCount={c.unread_count}
                            onClick={() => seleccionarChat(c.other_user)}
                            isActive={activeChat?.id === c.other_user.id}
                        />
                    ))}
                </div>
            </div>

            {/* VENTANA DE CHAT */}
            <div className="flex-1 bg-white rounded-3xl shadow p-0">
                {activeChat ? (
                    <>
                        <ChatHeader
                            usuario={activeChat}
                            escribiendo={estadoOtro.escribiendo}
                            estado={estadoOtro}
                        />
                        <ChatWindow
                            mensajes={chatActual}
                            onEnviarMensaje={handleEnviarMensaje}
                            onEscribiendo={() => {}}
                        />
                    </>
                ) : (
                    <div className="h-full flex items-center justify-center text-gray-400">
                        Selecciona un chat para comenzar
                    </div>
                )}
            </div>
        </div>
    );
}
