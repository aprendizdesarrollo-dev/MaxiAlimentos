import { FileText, PlusCircle } from "lucide-react";
import { motion } from "framer-motion";

import { useComunicados } from "../../hooks/useComunicados";

import ComunicadoCard from "../../components/Comunicados/ComunicadoCard";
import ModalCrearEditar from "../../components/Comunicados/ModalCrearEditar";
import ModalEliminar from "../../components/Comunicados/ModalEliminar";
import ModalVerDetalle from "../../components/Comunicados/ModalVerDetalle";

export default function ComunicadosDashboard() {
  const {
    comunicados,
    showModal,
    setShowModal,
    showDeleteModal,
    setShowDeleteModal,
    showViewModal,
    setShowViewModal,
    nuevo,
    setNuevo,
    editando,
    comunicadoEliminar,
    comunicadoActivo,
    handleSubmit,
    handleEdit,
    handleView,
    handleDelete,
    loading,

    // ✔️ ESTO FALTABA — SIN ESTO TODO FALLA
    setComunicadoEliminar,
  } = useComunicados();

  return (
    <section className="p-8 relative">
      {/* ================== ENCABEZADO ================== */}
      <motion.div>
        <div
          className="
            relative w-full rounded-3xl py-6 px-10 mb-10
            bg-gradient-to-r from-[#2f6f32] via-[#3d8c3f] to-[#4aad57]
            text-white shadow-lg overflow-hidden
          "
        >
          {/* Marca de agua */}
          <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="130"
              height="130"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 11v2a1 1 0 0 0 1 1h1l3 4v-16l-3 4h-1a1 1 0 0 0-1 1z" />
              <path d="M15 8a5 5 0 0 1 0 8" />
              <path d="M17.5 6.5a8 8 0 0 1 0 11" />
            </svg>
          </div>

          <div className="relative z-10 flex justify-between items-center gap-4">
            <div>
              <h1 className="text-3xl font-extrabold">Comunicados Internos</h1>
              <p className="text-white/90 text-base">
                Mantente informado sobre las novedades y anuncios oficiales de la empresa.
              </p>
            </div>

            <div className="flex flex-col items-end gap-3">
              <p className="text-white/90 font-medium text-sm">
                {new Date().toLocaleDateString("es-CO", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>

              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 bg-white text-[#397C3C] font-semibold px-5 py-2.5 rounded-lg shadow hover:scale-[1.03] active:scale-[0.98] transition"
              >
                <span className="text-xl">+</span>
                Crear Comunicado
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ================== LISTA ================== */}
      {comunicados.length === 0 ? (
        <p className="text-gray-600 text-center mt-20">
          No hay comunicados registrados aún.
        </p>
      ) : (
        <div className="bg-white rounded-3xl shadow-md p-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            {comunicados.map((item) => (
              <ComunicadoCard
                key={item.id}
                item={item}
                handleEdit={handleEdit}
                handleView={handleView}
                setShowDeleteModal={setShowDeleteModal}
                setComunicadoEliminar={setComunicadoEliminar}
              />
            ))}
          </div>
        </div>
      )}

      {/* ================== MODALES ================== */}
      <ModalCrearEditar
        showModal={showModal}
        setShowModal={setShowModal}
        nuevo={nuevo}
        setNuevo={setNuevo}
        editando={editando}
        handleSubmit={handleSubmit}
        loading={loading}
      />

      <ModalEliminar
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        comunicadoEliminar={comunicadoEliminar}
        handleDelete={handleDelete}
        loading={loading}  
      />

      <ModalVerDetalle
        showViewModal={showViewModal}
        setShowViewModal={setShowViewModal}
        comunicadoActivo={comunicadoActivo}
      />
    </section>
  );
}
