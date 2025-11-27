import { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { Upload, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import imageCompression from "browser-image-compression";

export default function CrearEvento() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [imagen, setImagen] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Manejo de imagen con compresión
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);

      setImagen(compressedFile);
      toast.success("Imagen comprimida correctamente");
    } catch (error) {
      console.error("Error al comprimir la imagen:", error);
      toast.error("No se pudo comprimir la imagen");
    }
  };

  // Guardar evento
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("titulo", titulo);
      formData.append("descripcion", descripcion);
      formData.append("fecha", fecha);
      if (imagen) formData.append("imagen", imagen);

      const response = await api.post("/eventos", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success("Evento creado correctamente");
        setTimeout(() => navigate("/dashboard"), 800);
      } else {
        toast.error(response.data.message || "Error al crear el evento");
      }
    } catch (error) {
      console.error("Error al crear evento:", error);

      if (error.response?.data?.errors) {
        const errores = Object.values(error.response.data.errors).flat();
        toast.error(errores.join(", "));
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error inesperado al crear el evento");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#0D2611] p-6">
      {loading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 flex items-center gap-3">
            <Loader2 className="animate-spin text-[#397C3C]" size={24} />
            <span className="text-gray-700 font-medium text-lg">
              Guardando evento...
            </span>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative overflow-hidden">
        <h2 className="text-3xl font-bold text-[#397C3C] mb-8 text-center">
          Crear nuevo evento
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Titulo */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Título del evento
            </label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#397C3C]"
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
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#397C3C]"
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
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#397C3C]"
            />
          </div>

          {/* Imagen */}
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
              onChange={handleImageChange}
              className="hidden"
              required
            />

            {imagen && (
              <img
                src={URL.createObjectURL(imagen)}
                alt="Vista previa"
                className="w-full h-48 object-cover rounded-xl mt-3 border border-gray-200"
              />
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#397C3C] text-white py-3 rounded-lg font-semibold transition hover:bg-[#2f612f] ${
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
