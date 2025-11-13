import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import api from "../../services/api";
import { PlusCircle, X, CalendarDays } from "lucide-react";
import imageCompression from "browser-image-compression";

export default function EventosCarousel() {
  const [eventos, setEventos] = useState([]);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [eventoEditando, setEventoEditando] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [confirmarEliminar, setConfirmarEliminar] = useState(null);
  const [cargando, setCargando] = useState(false);

  // --- Cargar eventos ---
  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const res = await api.get("/eventos");
        setEventos(res.data.data || []);
      } catch (error) {
        console.error("Error cargando eventos:", error);
      }
    };
    fetchEventos();
  }, []);

  // --- Abrir modal evento ---
  const handleVerEvento = (evento) => setEventoSeleccionado(evento);

  // --- Cerrar modal evento ---
  const cerrarModal = () => setEventoSeleccionado(null);

  // --- Actualizar evento ---
  const actualizarEvento = async (id) => {
    setCargando(true);
    try {
      const formData = new FormData();
      formData.append("_method", "PUT");
      formData.append("titulo", eventoEditando.titulo || "");
      formData.append("descripcion", eventoEditando.descripcion || "");
      formData.append("fecha", eventoEditando.fecha || "");

      // Si el usuario subió una nueva imagen
      if (eventoEditando.imagenFile instanceof File) {
        try {
          // --- Comprimir antes de subir ---
          const options = {
            maxSizeMB: 1, // máximo 1 MB
            maxWidthOrHeight: 1920,
            useWebWorker: true,
          };

          const compressedFile = await imageCompression(eventoEditando.imagenFile, options);
          console.log(
            "Original:",
            (eventoEditando.imagenFile.size / 1024).toFixed(2),
            "KB → Comprimida:",
            (compressedFile.size / 1024).toFixed(2),
            "KB"
          );

          formData.append("imagen", compressedFile);
        } catch (err) {
          console.error("Error al comprimir la imagen:", err);
        }
      }

      // Obtener token si usas autenticación
      const token = localStorage.getItem("token");

      const res = await api.post(`/eventos/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        const nuevos = await api.get("/eventos");
        setEventos(nuevos.data.data || []);
        setModoEdicion(false);
        setEventoSeleccionado(null);
      } else {
        console.error("Error al actualizar:", res.data.message);
        alert(res.data.message || "Error al actualizar evento");
      }
    } catch (error) {
      console.error("Error al actualizar evento:", error);

      // Si Laravel devolvió errores de validación
      if (error.response?.data?.errors) {
        const errores = Object.values(error.response.data.errors).flat();
        alert(errores.join(", "));
      } else if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Error desconocido al actualizar el evento");
      }
    } finally {
      setCargando(false);
    }
  };

  // --- Eliminar evento ---
  const eliminarEvento = async (id) => {
    try {
      await api.delete(`/eventos/${id}`);
      setEventos((prev) => prev.filter((e) => e.id !== id));
      setConfirmarEliminar(null);
      setEventoSeleccionado(null);
    } catch (error) {
      console.error("Error al eliminar evento:", error);
    }
  };

  // --- Si no hay eventos ---
  if (eventos.length === 0) {
    return (
      <section className="relative rounded-2xl overflow-hidden shadow-md flex flex-col justify-center items-center bg-[#1a1a1a] text-white text-center h-[280px]">
        <h2 className="text-3xl font-bold mb-2">Eventos y Actividades</h2>
        <p className="text-gray-300 text-lg max-w-2xl mb-6">
          No hay eventos registrados por el momento.
        </p>
        <button
          onClick={() => (window.location.href = "/crear-evento")}
          className="flex items-center gap-2 bg-[#397C3C] hover:bg-[#2f612f] transition text-white px-6 py-3 rounded-lg font-medium"
        >
          <PlusCircle size={20} /> Crear evento
        </button>
      </section>
    );
  }

  // --- Render principal ---
  return (
    <section className="relative rounded-2xl shadow-md bg-white p-6">
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#397C3C] flex items-center gap-2">
          <CalendarDays className="text-[#397C3C]" size={22} /> Eventos y Actividades
        </h2>
        <button
          onClick={() => (window.location.href = "/crear-evento")}
          className="bg-[#397C3C] flex items-center gap-2 text-white px-4 py-2 rounded-lg hover:bg-[#2f612f] transition"
        >
          <PlusCircle size={20} /> Crear evento
        </button>
      </div>

      {/* Carrusel */}
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        loop
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true, el: ".custom-pagination" }}
        className="h-auto"
      >
        {eventos.map((evento) => (
          <SwiperSlide key={evento.id}>
            <div className="flex flex-col md:flex-row items-center bg-[#f9f9f9] rounded-xl overflow-hidden shadow-sm border border-gray-200">
              {/* Imagen */}
              <div className="md:w-1/2 w-full h-64 md:h-72 overflow-hidden">
                <img
                  src={evento.imagen}
                  alt={evento.titulo}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Información */}
              <div className="md:w-1/2 w-full p-6 flex flex-col justify-center text-center md:text-left">
                <h3 className="text-2xl font-semibold text-[#397C3C] mb-2">
                  {evento.titulo}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed line-clamp-4 overflow-hidden">
                  {evento.descripcion}
                </p>
                <p className="text-sm text-gray-500 mb-4 italic">
                  {new Date(evento.fecha).toLocaleDateString("es-CO", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <button
                  onClick={() => handleVerEvento(evento)}
                  className="bg-[#397C3C] text-white px-4 py-2 rounded-lg w-fit mx-auto md:mx-0 hover:bg-[#2f612f] transition"
                >
                  Ver evento
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Paginación */}
      <div className="custom-pagination mt-6 flex justify-center"></div>

      {/* Modal de evento */}
      {eventoSeleccionado && (
        <div className="fixed inset-0 bg-[#00000080] backdrop-blur-md flex justify-center items-center z-50 transition-all duration-300">
          <div className="bg-[#f5f5f5] rounded-3xl shadow-2xl w-[95%] max-w-5xl p-8 relative overflow-hidden animate-fadeIn">

            {/* Botón de cierre */}
            <button
              onClick={cerrarModal}
              className="absolute top-4 right-4 bg-[#397C3C] text-white w-9 h-9 rounded-full flex justify-center items-center hover:bg-[#2f612f] transition"
            >
              <X size={20} />
            </button>

            {/* Encabezado */}
            <h2 className="text-3xl font-bold text-[#397C3C] mb-6 flex items-center gap-2 justify-center">
              <CalendarDays size={30} strokeWidth={2.5} />
              Detalle del Evento
            </h2>

            {/* Contenedor principal */}
            <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">

              {/* Imagen del evento */}
              <div className="flex-1 w-full lg:w-1/2 flex items-center justify-center">
                <div className="w-full h-[420px] rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-inner">
                  <img
                    src={eventoSeleccionado.imagen}
                    alt={eventoSeleccionado.titulo}
                    className="w-full h-full object-contain rounded-2xl"
                  />
                </div>
              </div>


              {/* Información del evento */}
              <div className="flex-1 w-full lg:w-1/2 bg-[#e9e9e9] border border-gray-300 rounded-2xl p-6 shadow-inner">
                <h3 className="text-2xl font-semibold text-[#397C3C] mb-3 leading-snug">
                  {eventoSeleccionado.titulo}
                </h3>
                <p className="text-gray-700 text-base leading-relaxed mb-5">
                  {eventoSeleccionado.descripcion}
                </p>
                <p className="text-sm text-gray-500 italic text-right">
                  {new Date(eventoSeleccionado.fecha).toLocaleDateString("es-CO", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Botones inferiores */}
            <div className="flex justify-center gap-6 mt-8">
              <button
                onClick={() => {
                  setEventoEditando(eventoSeleccionado);
                  setModoEdicion(true);
                }}
                className="bg-[#397C3C] text-white px-8 py-3 rounded-lg hover:bg-[#2f612f] transition font-semibold shadow"
              >
                Actualizar
              </button>
              <button
                onClick={() => setConfirmarEliminar(eventoSeleccionado.id)}
                className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition font-semibold shadow"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de edición */}
      {modoEdicion && (
        <div className="fixed inset-0 bg-[#000000]/40 backdrop-blur-[2px] flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-8 shadow-lg w-[460px] max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-[#397C3C] mb-4 text-center">
              Editar Evento
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                actualizarEvento(eventoEditando.id);
              }}
              className="space-y-4"
            >
              {/* Título */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">Título</label>
                <input
                  type="text"
                  value={eventoEditando.titulo || ""}
                  onChange={(e) =>
                    setEventoEditando({ ...eventoEditando, titulo: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#397C3C] outline-none"
                  required
                />
              </div>

              {/* Descripción */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">Descripción</label>
                <textarea
                  value={eventoEditando.descripcion || ""}
                  onChange={(e) =>
                    setEventoEditando({ ...eventoEditando, descripcion: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#397C3C] outline-none"
                  rows="3"
                  required
                ></textarea>
              </div>

              {/* Fecha */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">Fecha</label>
                <input
                  type="date"
                  value={eventoEditando.fecha?.split("T")[0] || ""}
                  onChange={(e) =>
                    setEventoEditando({ ...eventoEditando, fecha: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#397C3C] outline-none"
                  required
                />
              </div>

              {/* Imagen */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">Imagen</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setEventoEditando({
                      ...eventoEditando,
                      imagenFile: e.target.files[0],
                    })
                  }
                  className="w-full border rounded-lg px-3 py-2 bg-gray-50 cursor-pointer"
                />
                {eventoEditando.imagen && (
                  <img
                    src={eventoEditando.imagen}
                    alt="preview"
                    className="w-full h-40 object-cover rounded-lg mt-3 border"
                  />
                )}
              </div>
              {/* Botones */}
              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setModoEdicion(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={cargando}
                  className={`flex justify-center items-center gap-2 bg-[#397C3C] text-white px-6 py-2 rounded-lg hover:bg-[#2f612f] transition ${cargando ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                >
                  {cargando ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        ></path>
                      </svg>
                      <span>Guardando...</span>
                    </>
                  ) : (
                    "Guardar cambios"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal confirmación */}
      {confirmarEliminar && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-[9999]">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-[380px] text-center">
            <h3 className="text-xl font-semibold text-[#397C3C] mb-3">
              ¿Eliminar evento?
            </h3>
            <p className="text-gray-600 mb-6">
              Esta acción no se puede deshacer. ¿Seguro que deseas eliminar este evento?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setConfirmarEliminar(null)}
                className="bg-gray-200 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={() => eliminarEvento(confirmarEliminar)}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition shadow"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
