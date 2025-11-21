import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import api from "../../services/api";
import { PlusCircle, X, CalendarDays } from "lucide-react";
import imageCompression from "browser-image-compression";

export default function EventosCarousel({ onChange }) {
  const [eventos, setEventos] = useState([]);
  const [cargandoEventos, setCargandoEventos] = useState(true);
  const [errorEventos, setErrorEventos] = useState(null);

  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [eventoEditando, setEventoEditando] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [confirmarEliminar, setConfirmarEliminar] = useState(null);
  const [cargando, setCargando] = useState(false);

  const restoreScroll = () => {
    document.body.style.overflow = "auto";
  };


  // Normaliza la lista que llega desde la API
  const normalizarEventos = (lista) => {
    if (!Array.isArray(lista)) return [];

    return lista.filter((e) => {
      // Filtra null, undefined, tipos raros o eventos sin datos básicos
      if (!e || typeof e !== "object") return false;
      if (!e.id || !e.titulo) return false;
      return true;
    });
  };

  // Cargar eventos solo una vez
  useEffect(() => {
    const fetchEventos = async () => {
      try {
        setCargandoEventos(true);
        setErrorEventos(null);

        const res = await api.get("/eventos");
        const listaCruda = res?.data?.data ?? [];
        const listaNormalizada = normalizarEventos(listaCruda);

        setEventos(listaNormalizada);
      } catch (error) {
        console.error("Error cargando eventos:", error);
        setErrorEventos("Ocurrió un error al cargar los eventos.");
      } finally {
        setCargandoEventos(false);
      }
    };

    fetchEventos();
  }, []);

  const handleVerEvento = (evento) => {
    if (!evento) return;
    setEventoSeleccionado(evento);
    document.body.style.overflow = "hidden";
  };

  const cerrarModal = () => {
    setEventoSeleccionado(null);
    restoreScroll();
  };


  const actualizarEvento = async (id) => {
    if (!eventoEditando) return;

    setCargando(true);
    if (onChange) onChange();

    try {
      const formData = new FormData();
      formData.append("_method", "PUT");
      formData.append("titulo", eventoEditando.titulo || "");
      formData.append("descripcion", eventoEditando.descripcion || "");
      formData.append("fecha", eventoEditando.fecha || "");

      // Compresión opcional de la imagen nueva
      if (eventoEditando.imagenFile instanceof File) {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };

        try {
          const compressedFile = await imageCompression(
            eventoEditando.imagenFile,
            options
          );
          formData.append("imagen", compressedFile);
        } catch (err) {
          console.error("Error al comprimir la imagen:", err);
          // Si falla la compresión, igual se intenta subir la original
          formData.append("imagen", eventoEditando.imagenFile);
        }
      }

      const token = localStorage.getItem("token");

      const res = await api.post(`/eventos/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        // Recargar lista actualizada, pero siempre normalizada
        const nuevos = await api.get("/eventos");
        const listaCruda = nuevos?.data?.data ?? [];
        const listaNormalizada = normalizarEventos(listaCruda);
        setEventos(listaNormalizada);
        if (onChange) onChange();
        setModoEdicion(false);
        setEventoSeleccionado(null);

        restoreScroll();
      } else {
        alert(res.data.message || "Error al actualizar el evento.");
      }
    } catch (error) {
      console.error("Error al actualizar evento:", error);

      if (error.response?.data?.errors) {
        const errores = Object.values(error.response.data.errors).flat();
        alert(errores.join(", "));
      } else if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Error desconocido al actualizar el evento.");
      }
    } finally {
      setCargando(false);
    }
  };

  const eliminarEvento = async (id) => {
    try {
      await api.delete(`/eventos/${id}`);
      setEventos((prev) => prev.filter((e) => e.id !== id));
      setConfirmarEliminar(null);
      setEventoSeleccionado(null);
      restoreScroll();
      if (onChange) onChange();
    } catch (error) {
      console.error("Error al eliminar evento:", error);
    }
  };


  // Eventos seguros para renderizar en Swiper
  const eventosValidos = normalizarEventos(eventos);

  // Estado de carga
  if (cargandoEventos) {
    return (
      <section className="rounded-2xl bg-white shadow-md border border-gray-200 p-6 h-[260px] flex items-center justify-center">
        <p className="text-gray-500 text-sm">
          Cargando eventos, por favor espera...
        </p>
      </section>
    );
  }

  // Estado de error
  if (errorEventos) {
    return (
      <section className="rounded-2xl bg-white shadow-md border border-red-200 p-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold text-red-600">
            Error al cargar eventos
          </h2>
          <button
            className="text-sm text-[#397C3C] underline"
            onClick={() => window.location.reload()}
          >
            Reintentar
          </button>
        </div>
        <p className="text-gray-600 text-sm">{errorEventos}</p>
      </section>
    );
  }

  // Sin eventos
  if (eventosValidos.length === 0) {
    return (
      <section className="relative rounded-2xl overflow-hidden shadow-md flex flex-col justify-center items-center bg-[#1a1a1a] text-white text-center h-[280px] px-6">
        <h2 className="text-3xl font-bold mb-2">Eventos y Actividades</h2>
        <p className="text-gray-300 text-lg max-w-2xl mb-6">
          No hay eventos registrados por el momento.
        </p>
        <button
          onClick={() => (window.location.href = "/crear-evento")}
          className="flex items-center gap-2 bg-[#397C3C] hover:bg-[#2f612f] transition text-white px-6 py-3 rounded-lg font-medium"
        >
          <PlusCircle size={20} />
          Crear evento
        </button>
      </section>
    );
  }

  return (
    <section className="p-0">
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#397C3C] flex items-center gap-2">
          <CalendarDays size={22} />
          Eventos y Actividades
        </h2>
        <button
          onClick={() => (window.location.href = "/crear-evento")}
          className="bg-[#397C3C] flex items-center gap-2 text-white px-4 py-2 rounded-lg hover:bg-[#2f612f] transition"
        >
          <PlusCircle size={20} />
          Crear evento
        </button>
      </div>

      {/* Carrusel */}
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        loop
        autoplay={{ delay: 4500 }}
        pagination={{ clickable: true, el: ".custom-pagination" }}
        className="min-h-[350px]"
      >
        {eventosValidos.map((evento) => (
          <SwiperSlide key={evento.id}>
            <div className="bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-gray-200 overflow-hidden hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)] transition-all duration-300">

              {/* Encabezado tipo “Cumpleaños” */}
              <div className="flex items-center justify-between px-6 py-4 border-b bg-[#f8faf8]">
                
                <span className="text-sm text-gray-500 italic">
                  {new Date(evento.fecha).toLocaleDateString("es-CO", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>

              {/* Contenido principal */}
              <div className="flex flex-col md:flex-row">

                {/* Imagen con vida */}
                <div className="md:w-1/2 w-full h-60 md:h-64 overflow-hidden relative">
                  <img
                    src={evento.imagen || "/fallback-evento.jpg"}
                    alt={evento.titulo}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                  />

                  {/* Capa sutil degradada (Efecto pro) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                </div>

                {/* Info */}
                <div className="md:w-1/2 w-full px-6 py-5 space-y-3">

                  {/* Título grande */}
                  <h2 className="text-2xl font-extrabold text-[#397C3C] leading-tight">
                    {evento.titulo}
                  </h2>

                  {/* Descripción con vida */}
                  <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line line-clamp-4">
                    {evento.descripcion}
                  </p>

                  {/* Línea decorativa */}
                  <div className="w-full h-[1px] bg-gray-200 my-2"></div>

                  {/* Botón */}
                  <button
                    onClick={() => handleVerEvento(evento)}
                    className="mt-2 bg-[#397C3C] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-[#2f612f] transition shadow-sm hover:shadow-md"
                  >
                    Ver evento
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Paginación */}
      <div className="custom-pagination mt-6 flex justify-center"></div>

      {/* Modal de evento */}
      {eventoSeleccionado && eventoSeleccionado.id && (
        <div className="fixed inset-0 bg-[#00000080] backdrop-blur-sm flex justify-center items-start py-10 z-50 overflow-y-auto px-4">

          <div className="bg-white rounded-3xl w-full max-w-5xl shadow-2xl overflow-hidden">

            {/* ------------------------------------------- */}
            {/* ENCABEZADO PREMIUM */}
            {/* ------------------------------------------- */}
            <div
              className="
                    w-full 
                    bg-gradient-to-r 
                    from-[#397C3C] 
                    to-[#5bad5c] 
                    px-8 py-6 
                    flex 
                    justify-between 
                    items-center 
                    text-white
                "
            >
              <div className="flex items-center gap-3">
                <CalendarDays size={28} />
                <h2 className="text-2xl font-bold">Detalle del Evento</h2>
              </div>

              {/* Botón cerrar premium */}
              <button
                onClick={cerrarModal}
                className="
                        w-10 h-10 
                        rounded-full 
                        border border-white/40 
                        flex items-center justify-center 
                        hover:bg-white/20 
                        transition
                    "
              >
                <X size={20} className="text-white" />
              </button>
            </div>

            {/* ------------------------------------------- */}
            {/* CONTENIDO PRINCIPAL */}
            {/* ------------------------------------------- */}
            <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">

              {/* Imagen del evento */}
              <div className="rounded-2xl overflow-hidden shadow-md border bg-white max-h-[420px]">
                <img src={eventoSeleccionado.imagen || "/fallback-evento.jpg"}
                  alt={eventoSeleccionado.titulo || "Evento"}
                  className="w-full h-full object-cover" />
              </div>

              {/* Información */}
              <div className="bg-[#f4f4f4] border border-gray-300 rounded-2xl p-6 shadow-inner max-h-[420px] overflow-y-auto">
                <h3 className="text-2xl font-semibold text-[#397C3C] mb-4">
                  {eventoSeleccionado.titulo}
                </h3>

                <p className="text-gray-700 text-base leading-relaxed mb-5 whitespace-pre-line">
                  {eventoSeleccionado.descripcion}
                </p>

                <p className="text-sm text-gray-600 italic text-right">
                  {eventoSeleccionado.fecha
                    ? new Date(eventoSeleccionado.fecha).toLocaleDateString(
                      "es-CO",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )
                    : "Fecha por definir"}
                </p>
              </div>
            </div>

            {/* ------------------------------------------- */}
            {/* BOTONES INFERIORES */}
            {/* ------------------------------------------- */}
            <div className="flex justify-center gap-6 px-8 pb-10">

              <button
                onClick={() => {
                  setEventoEditando(eventoSeleccionado);
                  setModoEdicion(true);
                }}
                className="
                        bg-[#397C3C] 
                        text-white 
                        px-8 py-3 
                        rounded-xl 
                        font-semibold 
                        hover:bg-[#2f612f] 
                        transition
                    "
              >
                Actualizar
              </button>

              <button
                onClick={() => setConfirmarEliminar(eventoSeleccionado.id)}
                className="
                        bg-red-600 
                        text-white 
                        px-8 py-3 
                        rounded-xl 
                        font-semibold 
                        hover:bg-red-700 
                        transition
                    "
              >
                Eliminar
              </button>

            </div>
          </div>
        </div>
      )}

      {/* Modal edición */}
      {modoEdicion && eventoEditando && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-[#397C3C] mb-6 text-center">
              Editar Evento
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                actualizarEvento(eventoEditando.id);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Título
                </label>
                <input
                  type="text"
                  value={eventoEditando.titulo || ""}
                  onChange={(e) =>
                    setEventoEditando({
                      ...eventoEditando,
                      titulo: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#397C3C] outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Descripción
                </label>
                <textarea
                  value={eventoEditando.descripcion || ""}
                  onChange={(e) =>
                    setEventoEditando({
                      ...eventoEditando,
                      descripcion: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#397C3C] outline-none"
                  rows="4"
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Fecha
                </label>
                <input
                  type="date"
                  value={eventoEditando.fecha?.split("T")[0] || ""}
                  onChange={(e) =>
                    setEventoEditando({
                      ...eventoEditando,
                      fecha: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#397C3C] outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Imagen
                </label>
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

              <div className="flex justify-end gap-3 pt-4">
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
                  className={`bg-[#397C3C] text-white px-6 py-2 rounded-lg hover:bg-[#2f612f] transition ${cargando ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                >
                  {cargando ? "Guardando..." : "Guardar cambios"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal confirmación */}
      {confirmarEliminar && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-[380px] text-center">
            <h3 className="text-xl font-semibold text-[#397C3C] mb-3">
              ¿Eliminar evento?
            </h3>
            <p className="text-gray-600 mb-6">
              Esta acción no se puede deshacer. ¿Seguro que deseas eliminar este
              evento?
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
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
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
