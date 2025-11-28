import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function ModalCrearEditar({
    showModal,
    setShowModal,
    nuevo,
    setNuevo,
    editando,
    handleSubmit,
    loading,
}) {
    return (
        <AnimatePresence>
            {showModal && (
                <motion.div
                    className="fixed inset-0 bg-[#00000080] backdrop-blur-md flex justify-center items-center z-50 transition-all duration-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-8 relative"
                    >
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
                        >
                            <X size={20} />
                        </button>

                        <h2 className="text-2xl font-bold text-[#397C3C] mb-6 text-center">
                            {editando ? "Editar Comunicado" : "Nuevo Comunicado"}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Título
                                </label>
                                <input
                                    type="text"
                                    value={nuevo.titulo}
                                    onChange={(e) =>
                                        setNuevo({ ...nuevo, titulo: e.target.value })
                                    }
                                    required
                                    className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-[#397C3C]"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Descripción
                                </label>
                                <textarea
                                    value={nuevo.descripcion}
                                    onChange={(e) =>
                                        setNuevo({ ...nuevo, descripcion: e.target.value })
                                    }
                                    rows="4"
                                    required
                                    className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-[#397C3C]"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`
                                        w-full py-2.5 rounded-lg font-semibold transition flex items-center justify-center
                                        ${loading
                                        ? "bg-[#2f6f32] cursor-not-allowed opacity-80"
                                        : "bg-[#397C3C] hover:bg-[#2f612f] text-white"
                                    }
                                 `}
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                        Guardando...
                                    </span>
                                ) : (
                                    editando ? "Guardar Cambios" : "Guardar Comunicado"
                                )}
                            </button>

                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
