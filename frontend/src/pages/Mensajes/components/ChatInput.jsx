import { useState } from "react";

export default function ChatInput({ onEnviar }) {
    const [texto, setTexto] = useState("");

    const handleSend = () => {
        if (texto.trim() === "") return;
        onEnviar(texto);
        setTexto("");
    };

    return (
        <div className="flex gap-3 p-3 border-t">
            <input
                className="flex-1 px-4 py-2 border rounded-lg"
                placeholder="Escribe un mensaje..."
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
            />
            <button
                onClick={handleSend}
                className="bg-[#397C3C] text-white px-4 py-2 rounded-lg"
            >
                Enviar
            </button>
        </div>
    );
}
