import React from "react";
import { CalendarDays } from "lucide-react";

export default function EventoCard({ evento, ver }) {
    return (
        <div
            className="
        bg-white 
        rounded-3xl 
        shadow-[0_8px_30px_rgba(0,0,0,0.08)] 
        border border-gray-100 
        overflow-hidden 
        transition-all duration-300 
        hover:shadow-[0_12px_45px_rgba(0,0,0,0.12)]
      "
        >

            {/* HEADER PREMIUM */}
            <div className="flex items-center gap-2 px-6 py-3 bg-[#F3FDF4] border-b border-gray-200">
                <CalendarDays size={18} className="text-[#397C3C]" />
                <span className="text-sm text-[#397C3C] font-medium">
                    {new Date(evento.fecha).toLocaleDateString("es-CO", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </span>
            </div>

            {/* CONTENIDO */}
            <div className="flex flex-col md:flex-row">

                {/* IMAGEN PREMIUM */}
                <div className="md:w-1/2 w-full h-64 overflow-hidden relative">
                    <img
                        src={evento.imagen || "/fallback-evento.jpg"}
                        alt={evento.titulo}
                        className="
              w-full 
              h-full 
              object-cover 
              rounded-none
              transform 
              hover:scale-110 
              transition-all 
              duration-700
            "
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                </div>

                {/* INFO */}
                <div className="md:w-1/2 w-full px-8 py-6 flex flex-col justify-center">

                    <h2
                        className="
                                text-xl
                                font-semibold
                                text-[#397C3C]
                                leading-snug
                                capitalize
                            "
                    >
                        {evento.titulo}
                    </h2>

                    <p
                        className="
              text-gray-700 
              text-base 
              leading-relaxed 
              line-clamp-3 
              whitespace-pre-line
              mb-4
            "
                    >
                        <div className="w-full h-[1px] bg-gray-200 my-3"></div>

                        {evento.descripcion}
                    </p>

                    <button
                        onClick={() => ver(evento)}
                        className="
              bg-[#397C3C] 
              text-white 
              px-6 
              py-3 
              rounded-xl 
              font-semibold 
              shadow-md 
              hover:bg-[#2f612f] 
              hover:shadow-lg 
              transition-all 
              w-fit
            "
                    >
                        Ver evento
                    </button>
                </div>
            </div>
        </div>
    );
}
