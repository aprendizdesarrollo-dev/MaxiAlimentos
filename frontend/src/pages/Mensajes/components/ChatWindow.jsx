import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function ChatWindow({ mensajes, onEnviarMensaje, onEscribiendo }) {

    const inputRef = useRef();
    const bottomRef = useRef();

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [mensajes]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const texto = inputRef.current.value.trim();
        if (!texto) return;

        onEnviarMensaje(texto);
        inputRef.current.value = "";
    };

    /* ===========================
       FUNCIONES DE FECHA
    ============================ */

    const formatearFecha = (fecha) => {
        const f = new Date(fecha);
        return f.toLocaleDateString("es-CO", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }).replace(".", "");
    };

    const esHoy = (fecha) => {
        const f = new Date(fecha);
        const hoy = new Date();
        return (
            f.getDate() === hoy.getDate() &&
            f.getMonth() === hoy.getMonth() &&
            f.getFullYear() === hoy.getFullYear()
        );
    };

    const esAyer = (fecha) => {
        const f = new Date(fecha);
        const ayer = new Date();
        ayer.setDate(ayer.getDate() - 1);
        return (
            f.getDate() === ayer.getDate() &&
            f.getMonth() === ayer.getMonth() &&
            f.getFullYear() === ayer.getFullYear()
        );
    };

    /* ===========================
       CHECK DE VISTO ✓✓
    ============================ */

    const renderCheck = (msg) => {
        if (!msg.es_mio) return null;

        if (!msg.read_at) {
            return <span className="text-xs ml-1 opacity-80">✓</span>;
        }

        if (msg.read_at && !msg.leido) {
            return <span className="text-xs ml-1 opacity-80">✓✓</span>;
        }

        if (msg.leido) {
            return (
                <span className="text-xs ml-1 text-blue-500 font-bold">✓✓</span>
            );
        }
    };

    /* ===========================
       RENDER COMPLETO
    ============================ */

    let ultimaFecha = null;

    return (
        <div className="flex flex-col h-full">

            {/* ZONA DE MENSAJES */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-[#F7F7F7]">

                {mensajes.map((m, i) => {
                    const fecha = new Date(m.created_at);
                    const fechaKey = fecha.toDateString();

                    const mostrarSeparador = fechaKey !== ultimaFecha;
                    ultimaFecha = fechaKey;

                    return (
                        <div key={i} className="w-full flex flex-col gap-1">

                            {/* SEPARADOR DE FECHA */}
                            {mostrarSeparador && (
                                <div className="flex justify-center my-2">
                                    <div className="bg-gray-300 text-gray-700 text-xs px-3 py-1 rounded-full shadow">
                                        {esHoy(m.created_at)
                                            ? "Hoy"
                                            : esAyer(m.created_at)
                                            ? "Ayer"
                                            : formatearFecha(m.created_at)}
                                    </div>
                                </div>
                            )}

                            {/* BURBUJA */}
                            <div className={`w-full flex ${m.es_mio ? "justify-end" : "justify-start"}`}>

                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.18 }}
                                    className={`
                                        max-w-[65%] px-4 py-3 rounded-2xl shadow 
                                        ${m.es_mio
                                            ? "bg-[#397C3C] text-white rounded-br-md"
                                            : "bg-white text-gray-800 rounded-bl-md border border-gray-200"
                                        }
                                    `}
                                >
                                    <p className="leading-relaxed">{m.mensaje}</p>

                                    {/* HORA + CHECKS */}
                                    <div
                                        className={`text-xs mt-1 flex items-center justify-end gap-1 
                                            ${m.es_mio ? "text-white/80" : "text-gray-500"}`}
                                    >
                                        {fecha.toLocaleTimeString("es-CO", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                        {renderCheck(m)}
                                    </div>
                                </motion.div>
                            </div>

                        </div>
                    );
                })}

                <div ref={bottomRef}></div>
            </div>

            {/* INPUT DE MENSAJE */}
            <form
                onSubmit={handleSubmit}
                className="p-4 bg-white rounded-b-3xl border-t flex items-center gap-3 shadow-inner"
            >
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Escribe un mensaje…"
                    onChange={onEscribiendo}
                    className="
                        flex-1 px-4 py-3 rounded-full border border-gray-300
                        outline-none shadow-sm bg-gray-50
                        focus:ring-2 focus:ring-[#397C3C]/40
                    "
                />

                <button
                    type="submit"
                    className="
                        bg-[#397C3C] text-white font-medium 
                        px-6 py-2 rounded-full
                        hover:bg-[#2f5d2f] 
                        transition shadow
                    "
                >
                    Enviar
                </button>
            </form>
        </div>
    );
}
