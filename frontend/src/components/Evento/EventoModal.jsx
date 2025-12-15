import { X, CalendarDays } from "lucide-react";

export default function EventoModal({
  evento,
  cerrar,
  editar,
  eliminar,
  modoAdmin = false,
}) {
  if (!evento) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-start py-10 z-50 px-4">
      <div className="bg-white rounded-3xl w-full max-w-5xl shadow-2xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-[#397C3C] to-[#5bad5c] px-8 py-6 flex justify-between items-center text-white">
          <div className="flex items-center gap-3">
            <CalendarDays size={26} />
            <h2 className="text-2xl font-bold">Detalle del Evento</h2>
          </div>

          <button
            onClick={cerrar}
            className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center hover:bg-white/20"
          >
            <X size={20} />
          </button>
        </div>

        {/* CONTENIDO */}
        <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-2xl overflow-hidden border shadow">
            <img
              src={evento.imagen || "/fallback-evento.jpg"}
              alt={evento.titulo}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="bg-gray-50 border rounded-2xl p-6 overflow-y-auto">
            <h3 className="text-2xl font-semibold text-[#397C3C] mb-4">
              {evento.titulo}
            </h3>

            <p className="text-gray-700 whitespace-pre-line mb-4">
              {evento.descripcion}
            </p>

            <p className="text-sm text-gray-500 text-right italic">
              {evento.fecha
                ? new Date(evento.fecha).toLocaleDateString("es-CO", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "Fecha por definir"}
            </p>
          </div>
        </div>

        {/* BOTONES → SOLO ADMIN */}
        {modoAdmin && (
          <div className="flex justify-center gap-6 px-8 pb-8">
            <button
              onClick={() => editar(evento)}
              className="bg-[#397C3C] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#2f612f]"
            >
              Actualizar
            </button>

            <button
              onClick={() => eliminar(evento.id)}
              className="bg-red-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-red-700"
            >
              Eliminar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
