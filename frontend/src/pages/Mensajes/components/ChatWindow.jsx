import { useEffect, useRef } from "react";

export default function ChatWindow({ mensajes, onEnviarMensaje }) {

    const inputRef = useRef();
    const bottomRef = useRef();

    // Auto-scroll al final cuando llegan mensajes
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

    return (
        <div className="flex flex-col h-full">

            {/* LISTA DE MENSAJES */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 bg-gray-50 rounded-xl">

                {mensajes.map((m) => (
                    <div
                        key={m.id}
                        className={`flex w-full ${m.es_mio ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`
                                max-w-[70%] px-4 py-2 rounded-2xl shadow-sm text-[15px] leading-snug
                                ${m.es_mio
                                    ? "bg-[#397C3C] text-white rounded-br-none"
                                    : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
                                }
                            `}
                        >
                            {m.mensaje}

                            {/* HORA - OPCIONAL, ACTIVAR SI QUIERES */}
                            {/*<div className="text-[11px] opacity-70 mt-1 text-right">
                                10:32 AM
                            </div>*/}
                        </div>
                    </div>
                ))}

                <div ref={bottomRef} />
            </div>

            {/* INPUT DE MENSAJES */}
            <form
                onSubmit={handleSubmit}
                className="mt-3 flex gap-3 items-center border-t pt-4"
            >
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Escribe un mensaje..."
                    className="flex-1 bg-white border border-gray-300 rounded-xl px-4 py-2 shadow-sm focus:ring-2 focus:ring-[#397C3C] outline-none transition"
                />

                <button
                    type="submit"
                    className="bg-[#397C3C] text-white px-6 py-2 rounded-xl font-medium shadow hover:bg-[#2f662f] transition"
                >
                    Enviar
                </button>
            </form>

        </div>
    );
}
