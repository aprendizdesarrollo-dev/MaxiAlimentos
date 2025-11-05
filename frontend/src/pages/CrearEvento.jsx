import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { Upload, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function CrearEvento() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [imagen, setImagen] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // --- Envío del formulario ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("titulo", titulo);
      formData.append("descripcion", descripcion);
      formData.append("fecha", fecha);
      if (imagen) formData.append("imagen", imagen);

      await api.post("/eventos", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Evento creado correctamente 🎉");
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error) {
      console.error("Error al crear evento:", error);
      toast.error("Error al crear el evento ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#0D2611] p-6">
      {/* Overlay de carga (pantalla gris con animación) */}
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 flex items-center gap-3">
            <Loader2 className="animate-spin text-[#397C3C]" size={24} />
            <span className="text-gray-700 font-medium text-lg">
              Guardando evento...
            </span>
          </div>
        </div>
      )}

      {/* Contenedor principal */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative overflow-hidden">
        <h2 className="text-3xl font-bold text-[#397C3C] mb-8 text-center">
          Crear nuevo evento
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Título */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Título del evento
            </label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#397C3C] focus:border-transparent transition"
              placeholder="Ejemplo: Día de la Familia"
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Descripción
            </label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              rows="3"
              required
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#397C3C] focus:border-transparent transition"
              placeholder="Escribe una breve descripción del evento..."
            ></textarea>
          </div>

          {/* Fecha */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Fecha
            </label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#397C3C] focus:border-transparent transition"
            />
          </div>

          {/* Input de imagen personalizado */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Imagen del evento
            </label>

            <label
              htmlFor="imagen"
              className="flex items-center justify-center gap-2 border-2 border-dashed border-[#397C3C] rounded-xl py-4 px-4 cursor-pointer hover:bg-[#f1fdf1] transition"
            >
              <Upload size={22} className="text-[#397C3C]" />
              <span className="text-[#397C3C] font-medium truncate max-w-[240px]">
                {imagen ? imagen.name : "Seleccionar archivo"}
              </span>
            </label>

            <input
              id="imagen"
              type="file"
              accept="image/*"
              onChange={(e) => setImagen(e.target.files[0])}
              className="hidden"
              required
            />
          </div>
          {/* Botón principal */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#397C3C] text-white py-3 rounded-lg font-semibold transition transform hover:scale-[1.02] hover:bg-[#2f612f] ${
              loading ? "opacity-80 cursor-not-allowed" : ""
            }`}
          >
            Guardar evento
          </button>
        </form>
      </div>
    </section>
  );
}
