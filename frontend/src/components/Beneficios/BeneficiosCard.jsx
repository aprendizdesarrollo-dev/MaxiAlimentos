import { BadgeCheck, Image as ImageIcon } from "lucide-react";
import BeneficiosModal from "./BeneficiosModal";

export default function BeneficiosCard({ beneficios = [], onVerMas, modoAdmin = false }) {

    const resumen = beneficios.slice(0, 2);

    return (
        <div className="bg-white rounded-3xl shadow-md border border-gray-200 p-6 relative">

            {/* BORDE LATERAL IZQUIERDO PREMIUM */}
            <div className="absolute left-0 top-0 h-full w-1.5 bg-[#397C3C] rounded-l-3xl"></div>

            {/* TÍTULO */}
            <h2 className="text-xl font-bold text-[#397C3C] flex items-center gap-2 mb-5">
                <BadgeCheck size={22} />
                Beneficios de MaxiAlimentos
            </h2>

            {/* CONTENIDO */}
            {resumen.length === 0 ? (
                <p className="text-gray-500 text-sm">No hay beneficios registrados.</p>
            ) : (
                <div className="space-y-4">

                    {resumen.map((b) => (
                        <div 
                            key={b.id}
                            className="flex items-start justify-between border-b border-gray-200 pb-3 group"
                        >
                            {/* TEXTO */}
                            <div className="flex flex-col gap-1">

                                {/* Título */}
                                <span className="font-semibold text-gray-800 group-hover:text-[#397C3C] transition">
                                    {b.titulo}
                                </span>

                                {/* Descripción corta */}
                                <span className="text-xs text-gray-600 line-clamp-1">
                                    {b.descripcion}
                                </span>

                                {/* Fechas */}
                                <span className="text-xs text-gray-500 mt-1 flex gap-2">
                                    <span>Desde: <b>{b.vigencia_desde || "--"}</b></span>
                                    <span>Hasta: <b>{b.vigencia_hasta || "--"}</b></span>
                                </span>

                                {/* Estado */}
                                <span className={`
                                    text-[10px] px-2 py-[2px] mt-1 rounded-full border
                                    ${b.estado === "activo" 
                                        ? "border-green-400 text-green-700 bg-green-50" 
                                        : "border-gray-400 text-gray-600 bg-gray-100"
                                    }
                                `}>
                                    {b.estado === "activo" ? "Activo" : "Inactivo"}
                                </span>
                            </div>

                            {/* MINI IMAGEN */}
                            {b.imagen_url ? (
                                <img 
                                    src={b.imagen_url} 
                                    className="w-12 h-12 rounded-lg object-cover border shadow-sm"
                                />
                            ) : (
                                <div className="w-12 h-12 bg-gray-100 border rounded-lg flex items-center justify-center text-gray-400">
                                    <ImageIcon size={18} />
                                </div>
                            )}

                        </div>
                    ))}

                </div>
            )}

            {/* BOTÓN FINAL */}
            <div className="mt-5 flex justify-end">
                <button
                    onClick={onVerMas}
                    className="text-sm font-semibold text-[#397C3C] hover:underline transition"
                >
                    Ver más beneficios →
                </button>
            </div>

        </div>
    );
}
