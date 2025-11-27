import { Lock } from "lucide-react";

export default function SeguridadSection({ onOpenModal }) {

    return (
        <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-200 mb-8">

            {/* HEADER */}
            <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#397C3C]/10">
                    <Lock size={18} className="text-[#397C3C]" />
                </span>

                <h2 className="font-bold text-[#397C3C] text-lg">
                    Seguridad
                </h2>
            </div>

            <p className="text-sm text-gray-600 mb-4">
                Actualiza tu contraseña de acceso a la intranet.
            </p>

            {/* CONTENEDOR DEL BOTÓN */}
            <div className="p-4 border rounded-2xl bg-gray-50 flex items-center justify-between">
                
                <div>
                    <p className="font-medium text-gray-800">Cambiar contraseña</p>
                    <p className="text-xs text-gray-500">
                        Modifica tu contraseña actual por una nueva.
                    </p>
                </div>

                <button
                    onClick={onOpenModal}
                    className="
                        bg-[#397C3C] 
                        hover:bg-[#2f612f] 
                        transition 
                        text-white 
                        px-5 
                        py-2.5 
                        rounded-xl 
                        font-semibold 
                        text-sm
                        shadow-sm
                    "
                >
                    Cambiar
                </button>
            </div>
        </div>
    );
}
