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

  // --- Comprimir imagen antes de subir ---
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      // Opciones de compresión (ajustables)
      const options = {
        maxSizeMB: 1, // tamaño máximo 1 MB
        maxWidthOrHeight: 1920, // redimensionar si es muy grande
        useWebWorker: true, // para no trabar la interfaz
      };

      const compressedFile = await imageCompression(file, options);

      console.log("Imagen original:", (file.size / 1024).toFixed(2), "KB");
      console.log("Imagen comprimida:", (compressedFile.size / 1024).toFixed(2), "KB");

      setImagen(compressedFile);
      toast.success("Imagen comprimida correctamente");
    } catch (error) {
      console.error("Error al comprimir la imagen:", error);
      toast.error("No se pudo comprimir la imagen");
    }
  };

  // --- Envío del formulario ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token"); // si usas autenticación JWT

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
        toast.success("Evento creado correctamente 🎉");
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        toast.error(response.data.message || "Error al crear el evento");
      }
    } catch (error) {
      console.error("Error al crear evento:", error);

      // Mostrar errores de Laravel si los devuelve
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
      {/* Overlay de carga */}
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

            {/* Vista previa opcional */}
            {imagen && (
              <img
                src={URL.createObjectURL(imagen)}
                alt="Vista previa"
                className="w-full h-48 object-cover rounded-xl mt-3 border border-gray-200"
              />
            )}
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
