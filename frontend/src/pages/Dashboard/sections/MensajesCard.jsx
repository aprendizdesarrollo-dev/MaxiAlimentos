import { useState, useEffect } from "react";
import { MessageSquare } from "lucide-react";
import useMensajes from "../../Mensajes/hooks/useMensajes"; // <-- CORREGIDO: SIN {}

export default function MensajesCard({ onVerMas }) {

    const { obtenerConversaciones } = useMensajes();
    const [conversaciones, setConversaciones] = useState([]);

    useEffect(() => {
        cargar();
    }, []);

    const cargar = async () => {
        const data = await obtenerConversaciones();
        if (!data) return;

        // mostrar SOLO 3 recientes
        setConversaciones(data.slice(0, 3));
    };

    return (
        <div className="bg-white shadow rounded-xl p-6 flex flex-col gap-4">

            {/* TÍTULO */}
            <div className="flex items-center gap-2 text-[#397C3C] font-semibold text-lg">
                <MessageSquare size={20} />
                <span>Mensajes Recientes</span>
            </div>

            {/* VACÍO */}
            {conversaciones.length === 0 && (
                <p className="text-gray-500 text-sm">
                    No tienes mensajes recientes.
                </p>
            )}

            {/* LISTA DE MENSAJES */}
            <div className="flex flex-col gap-4">
                {conversaciones.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">

                        {/* FOTO */}
                        <img
                            src={
                                item.other_user?.foto_perfil
                                    ? `http://127.0.0.1:8000/storage/${item.other_user.foto_perfil}`
                                    : "/default-avatar.png"
                            }
                            className="w-12 h-12 rounded-full object-cover"
                            alt="avatar"
                        />

                        {/* TEXTO */}
                        <div className="flex flex-col">
                            <span className="font-semibold">
                                {item.other_user?.nombre || "Usuario"}
                            </span>

                            <span className="text-gray-500 text-sm truncate max-w-[200px]">
                                {item.last_message || "Sin mensajes"}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* BOTÓN */}
            <button
                onClick={onVerMas}
                className="bg-[#397C3C] text-white py-2 rounded-lg hover:bg-[#2f6a31] transition"
            >
                Ver mensajes
            </button>
        </div>
    );
}
