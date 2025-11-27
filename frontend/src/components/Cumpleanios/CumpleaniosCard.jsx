import { CalendarDays, Gift, Building2 } from "lucide-react";

export default function CumpleaniosCard({ data, onVerMas }) {

    if (!data) {
        return <p className="text-gray-500 text-sm">Cargando información...</p>;
    }

    const proximos = data.cumpleanios || [];
    const aniversarios = data.aniversarios || [];
    const empresa = data.empresa || {};

    return (
        <div className="p-5 relative">

            {/* Línea decorativa izquierda */}
            <div className="absolute left-0 top-0 h-full w-[4px] bg-[#397C3C] rounded-l-xl"></div>

            {/* Título */}
            <h2 className="text-xl font-bold text-[#397C3C] flex items-center gap-2 mb-4">
                <Gift size={22} />
                Cumpleaños y Aniversarios
            </h2>

            {/* CUMPLEAÑOS PRÓXIMOS */}
            <h3 className="text-lg font-semibold text-[#397C3C] flex items-center gap-2 mb-2">
                <CalendarDays size={18} />
                Cumpleaños próximos
            </h3>

            {proximos.length === 0 ? (
                <p className="text-gray-500 text-sm mb-4">No hay cumpleaños en los próximos 30 días.</p>
            ) : (
                <div className="space-y-2 mb-4">
                    {proximos.slice(0, 2).map((c, i) => (
                        <div key={i} className="flex justify-between text-sm">
                            <span className="font-medium">{c.nombre}</span>
                            <span className="text-gray-600">{c.fecha_legible}</span>
                        </div>
                    ))}
                </div>
            )}

            <div className="border-b border-gray-300 my-2"></div>

            {/* ANIVERSARIOS LABORALES */}
            <h3 className="text-lg font-semibold text-[#397C3C] flex items-center gap-2 mb-2">
                <Building2 size={18} />
                Aniversarios laborales
            </h3>

            {aniversarios.length === 0 ? (
                <p className="text-gray-500 text-sm mb-4">No hay aniversarios en los próximos 30 días.</p>
            ) : (
                <div className="space-y-2 mb-4">
                    {aniversarios.slice(0, 2).map((a, i) => (
                        <div key={i} className="flex justify-between text-sm">
                            <span className="font-medium">{a.nombre}</span>
                            <span className="text-gray-600">{a.anos} años</span>
                        </div>
                    ))}
                </div>
            )}

            <div className="border-b border-gray-300 my-2"></div>

            {/* CUMPLEAÑOS DE LA EMPRESA */}
            <h3 className="text-lg font-semibold text-[#397C3C] flex items-center gap-2 mb-2">
                <Building2 size={18} />
                Cumpleaños de la empresa
            </h3>

            <div className="flex justify-between text-sm mb-3">
                <span className="font-medium">{empresa.nombre}</span>
                <span className="text-gray-600">{empresa.anos} años</span>
            </div>

            {/* Botón estilizado */}
            <button
                onClick={onVerMas}
                className="
                    mt-3 
                    relative 
                    text-[#397C3C] 
                    font-semibold 
                    text-sm 
                    pl-1
                    transition-all 
                    after:content-[''] 
                    after:absolute 
                    after:left-0 
                    after:bottom-[-3px] 
                    after:w-0 
                    after:h-[2px] 
                    after:bg-[#397C3C] 
                    after:transition-all 
                    after:duration-300 
                    hover:after:w-full
                "
            >
                Ver más detalles →
            </button>

        </div>
    );
}
