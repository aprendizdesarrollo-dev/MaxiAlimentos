import { useState } from "react";
import api from "../../services/api";

export default function EventoEliminarModal({ id, cerrar, refrescar }) {

  const [cargando, setCargando] = useState(false);

  const handleEliminar = async () => {
    try {
      setCargando(true);

      const token = localStorage.getItem("token");

      await api.delete(`/eventos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // 1. Refrescar la lista
      await refrescar();

      // 2. Cerrar modal
      cerrar();

      // 3. Evitar que se abra el modal de evento eliminado
      localStorage.removeItem("noti_tipo");
      localStorage.removeItem("noti_id");

    } catch (error) {
      console.error("Error eliminando evento:", error);
      alert("No se pudo eliminar el evento.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-[380px] text-center">

        <h3 className="text-xl font-semibold text-[#397C3C] mb-3">
          ¿Eliminar evento?
        </h3>

        <p className="text-gray-600 mb-6">
          Esta acción no se puede deshacer. ¿Seguro que deseas eliminar este evento?
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={cerrar}
            className="bg-gray-200 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-300"
          >
            Cancelar
          </button>

          <button
            onClick={handleEliminar}
            disabled={cargando}
            className={`bg-red-600 text-white px-6 py-2 rounded-lg 
                        hover:bg-red-700 transition 
                        ${cargando ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {cargando ? "Eliminando..." : "Eliminar"}
          </button>
        </div>

      </div>
    </div>
  );
}
