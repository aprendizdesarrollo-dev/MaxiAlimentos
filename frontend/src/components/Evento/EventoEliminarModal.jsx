import api from "../../services/api";

export default function EventoEliminarModal({ id, cerrar, refrescar }) {
  const eliminar = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/eventos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      await refrescar();
      cerrar();
    } catch (error) {
      console.error("Error eliminando evento:", error);
      alert("No se pudo eliminar el evento.");
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
            onClick={eliminar}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Eliminar
          </button>
        </div>

      </div>
    </div>
  );
}
