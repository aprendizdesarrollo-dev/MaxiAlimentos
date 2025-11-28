import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export default function ModalEliminar({
    showDeleteModal,
    setShowDeleteModal,
    comunicadoEliminar,
    handleDelete,
    loading,
}) {

    // ✔️ Si no hay comunicado seleccionado, NO renderices nada
    if (!comunicadoEliminar) return null;

    return (
        <AnimatePresence>
            {showDeleteModal && (
                <motion.div
                    className="fixed inset-0 bg-[#00000080] backdrop-blur-md flex justify-center items-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.9 }}
                        className="bg-white w-full max-w-sm rounded-2xl shadow-xl p-6 text-center"
                    >
                        <AlertTriangle className="text-red-500 mx-auto mb-3" size={48} />

                        <h2 className="text-lg font-bold text-gray-800 mb-2">
                            ¿Eliminar comunicado?
                        </h2>

                        <p className="text-gray-600 text-sm mb-2">
                            <strong>{comunicadoEliminar.titulo}</strong>
                        </p>

                        <p className="text-gray-600 mb-6 text-sm">
                            Esta acción no se puede deshacer.
                        </p>

                        <div className="flex justify-center gap-4">
                            <button
                                onClick={handleDelete}
                                disabled={loading}
                                className={`
                                        flex items-center justify-center gap-2
                                        px-4 py-2 rounded-lg font-semibold text-white transition-all duration-200
                                        ${loading
                                        ? "bg-red-400 cursor-not-allowed opacity-80"
                                        : "bg-red-600 hover:bg-red-700 active:scale-[0.98]"
                                    }
                                 `}
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                        Eliminando...
                                    </span>
                                ) : (
                                    <>
                                        Eliminar
                                    </>
                                )}
                            </button>

                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition font-semibold"
                            >
                                Cancelar
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
