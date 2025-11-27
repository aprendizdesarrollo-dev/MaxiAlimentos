import { X, CalendarDays } from "lucide-react";

export default function EventoModal({ evento, cerrar, editar, eliminar }) {
  return (
    <div className="fixed inset-0 bg-[#00000080] backdrop-blur-sm flex justify-center items-start py-10 z-50 overflow-y-auto px-4">
      
      <div className="bg-white rounded-3xl w-full max-w-5xl shadow-2xl overflow-hidden">

        {/* ENCABEZADO PREMIUM */}
        <div className="w-full bg-gradient-to-r from-[#397C3C] to-[#5bad5c] px-8 py-6 flex justify-between items-center text-white">
          <div className="flex items-center gap-3">
            <CalendarDays size={28} />
            <h2 className="text-2xl font-bold">Detalle del Evento</h2>
          </div>

          <button
            onClick={cerrar}
            className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center hover:bg-white/20 transition"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        {/* CONTENIDO */}
        <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Imagen */}
          <div className="rounded-2xl overflow-hidden shadow-md border bg-white max-h-[420px]">
            <img
              src={evento.imagen || "/fallback-evento.jpg"}
              alt={evento.titulo || "Evento"}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Información */}
          <div className="bg-[#f4f4f4] border border-gray-300 rounded-2xl p-6 shadow-inner max-h-[420px] overflow-y-auto">
            <h3 className="text-2xl font-semibold text-[#397C3C] mb-4">
              {evento.titulo}
            </h3>

            <p className="text-gray-700 text-base leading-relaxed mb-5 whitespace-pre-line">
              {evento.descripcion}
            </p>

            <p className="text-sm text-gray-600 italic text-right">
              {evento.fecha
                ? new Date(evento.fecha).toLocaleDateString("es-CO", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "Fecha por definir"}
            </p>
          </div>
        </div>

        {/* BOTONES */}
        <div className="flex justify-center gap-6 px-8 pb-10">

          <button
            onClick={() => editar(evento)}
            className="bg-[#397C3C] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#2f612f] transition"
          >
            Actualizar
          </button>

          <button
            onClick={() => eliminar(evento.id)}
            className="bg-red-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-red-700 transition"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
