import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { PlusCircle, CalendarDays } from "lucide-react";
import api from "../../services/api";

import EventoCard from "./EventoCard";
import EventoModal from "./EventoModal";
import EventoEditarModal from "./EventoEditarModal";
import EventoEliminarModal from "./EventoEliminarModal";

export default function EventoCarousel({ onChange }) {
  const [eventos, setEventos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [eventoEditando, setEventoEditando] = useState(null);
  const [confirmarEliminar, setConfirmarEliminar] = useState(null);

  // Normalizar
  const normalizar = (lista) =>
    Array.isArray(lista)
      ? lista.filter((e) => e && typeof e === "object" && e.id && e.titulo)
      : [];

  // Cargar eventos
  const cargarEventos = async () => {
    try {
      setCargando(true);
      const res = await api.get("/eventos");
      const lista = normalizar(res.data?.data);
      setEventos(lista);
    } catch (err) {
      setError("Error al cargar los eventos.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarEventos();
  }, []);

  const abrirEvento = (evento) => {
    setEventoSeleccionado(evento);
    document.body.style.overflow = "hidden";
  };

  const cerrarModal = () => {
    setEventoSeleccionado(null);
    document.body.style.overflow = "auto";
  };

  const editar = (evento) => {
    setEventoEditando(evento);
    setModoEdicion(true);
  };

  const cerrarEditar = () => {
    setModoEdicion(false);
    setEventoSeleccionado(null);
    document.body.style.overflow = "auto";
  };

  const confirmar = (id) => setConfirmarEliminar(id);
  const cerrarConfirmar = () => {
    setConfirmarEliminar(null);
    setEventoSeleccionado(null);
    document.body.style.overflow = "auto";
  };
  // Mensajes de carga y error
  if (cargando) {
    return (
      <section className="rounded-2xl bg-white shadow-md border p-6 h-[260px] flex items-center justify-center">
        <p className="text-gray-500 text-sm">Cargando eventos...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="rounded-2xl bg-white shadow-md border p-6">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold text-red-600">{error}</h2>
          <button
            className="text-[#397C3C] underline text-sm"
            onClick={cargarEventos}
          >
            Reintentar
          </button>
        </div>
      </section>
    );
  }

  if (eventos.length === 0) {
    return (
      <section className="relative rounded-2xl bg-[#1a1a1a] text-white text-center h-[280px] px-6 flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold mb-2">Eventos y Actividades</h2>
        <p className="text-gray-300 text-lg mb-6">
          No hay eventos registrados por el momento.
        </p>

        <button
          onClick={() => (window.location.href = "/crear-evento")}
          className="flex items-center gap-2 bg-[#397C3C] hover:bg-[#2f612f] text-white px-6 py-3 rounded-lg"
        >
          <PlusCircle size={20} />
          Crear evento
        </button>
      </section>
    );
  }

  return (
    <section className="p-0">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#397C3C] flex items-center gap-2">
          <CalendarDays size={22} />
          Eventos y Actividades
        </h2>

        <button
          onClick={() => (window.location.href = "/crear-evento")}
          className="bg-[#397C3C] flex items-center gap-2 text-white px-4 py-2 rounded-lg hover:bg-[#2f612f]"
        >
          <PlusCircle size={20} />
          Crear evento
        </button>
      </div>

      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        loop
        autoplay={{ delay: 4500 }}
        pagination={{ clickable: true, el: ".custom-pagination" }}
        className="min-h-[350px]"
      >
        {eventos.map((evento) => (
          <SwiperSlide key={evento.id}>
            <EventoCard evento={evento} ver={abrirEvento} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="custom-pagination mt-6 flex justify-center"></div>

      {/* Modal ver */}
      {eventoSeleccionado && (
        <EventoModal
          evento={eventoSeleccionado}
          cerrar={cerrarModal}
          editar={editar}
          eliminar={confirmar}
        />
      )}

      {/* Modal editar */}
      {modoEdicion && eventoEditando && (
        <EventoEditarModal
          evento={eventoEditando}
          cerrar={cerrarEditar}
          refrescar={cargarEventos}
          onChange={onChange}
        />
      )}

      {/* Modal eliminar */}
      {confirmarEliminar && (
        <EventoEliminarModal
          id={confirmarEliminar}
          cerrar={cerrarConfirmar}
          refrescar={cargarEventos}
        />
      )}
    </section>
  );
}
