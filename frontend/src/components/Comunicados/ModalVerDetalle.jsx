import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function ModalVerDetalle({
  showViewModal,
  setShowViewModal,
  comunicadoActivo,
}) {
  return (
    <AnimatePresence>
      {showViewModal && comunicadoActivo && (
        <motion.div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-[999]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* CONTENEDOR DEL MODAL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="
              relative bg-white rounded-3xl shadow-2xl max-w-2xl w-[95%]
              border border-gray-200 overflow-hidden
            "
          >
            {/* ================================
                ENCABEZADO TIPO BENEFICIOS
            ================================= */}
            <div
              className="
                bg-gradient-to-r from-[#2f6f32] to-[#4aad57]
                text-white px-8 py-5 flex items-center justify-between
                rounded-t-3xl shadow-sm
              "
            >
              {/* Título */}
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 11v2a1 1 0 0 0 1 1h1l3 4v-16l-3 4h-1a1 1 0 0 0-1 1z" />
                  <path d="M15 8a5 5 0 0 1 0 8" />
                  <path d="M17.5 6.5a8 8 0 0 1 0 11" />
                </svg>

                <h2 className="text-xl font-extrabold">
                  {comunicadoActivo.titulo}
                </h2>
              </div>

              {/* Botón cerrar premium */}
              <button
                onClick={() => setShowViewModal(false)}
                className="
                  w-9 h-9 rounded-full border border-white/60 
                  hover:bg-white/20 transition flex items-center justify-center
                "
              >
                <X size={18} className="text-white" />
              </button>
            </div>

            {/* ================================
                CONTENIDO PREMIUM 
            ================================= */}
            <div className="p-10 relative">

              {/* Watermark delicado */}
              <div className="absolute right-5 bottom-5 opacity-[0.06] select-none pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="150"
                  height="150"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#397C3C"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 11v2a1 1 0 0 0 1 1h1l3 4v-16l-3 4h-1a1 1 0 0 0-1 1z" />
                  <path d="M15 8a5 5 0 0 1 0 8" />
                  <path d="M17.5 6.5a8 8 0 0 1 0 11" />
                </svg>
              </div>

              {/* Descripción */}
              <p className="text-gray-700 text-[17px] leading-relaxed mb-8 relative z-10">
                {comunicadoActivo.descripcion}
              </p>

              {/* Autor / Fecha */}
              <div
                className="
                  bg-gray-100 rounded-2xl p-5 flex items-center justify-between 
                  text-sm text-gray-700 font-medium border border-gray-200 relative z-10
                "
              >
                <p>
                  <span className="font-bold text-[#397C3C]">Autor:</span>{" "}
                  {comunicadoActivo.autor}
                </p>

                <p>
                  <span className="font-bold text-[#397C3C]">Fecha:</span>{" "}
                  {new Date(
                    comunicadoActivo.fecha + "T00:00:00"
                  ).toLocaleDateString("es-CO", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
