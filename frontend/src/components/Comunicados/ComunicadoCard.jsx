import { motion } from "framer-motion";
import { Edit2, Trash2, Eye } from "lucide-react";

export default function ComunicadoCard({
    item,
    handleEdit,
    handleView,
    setShowDeleteModal,
    setComunicadoEliminar,   // ✔️ FALTABA
}) {

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#f9f9f9] p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition"
        >
            <h3 className="text-xl font-bold text-[#397C3C] mb-2">{item.titulo}</h3>

            <p className="text-gray-700 text-sm line-clamp-3 mb-3">
                {item.descripcion}
            </p>

            <p className="text-xs text-gray-500 mb-3">
                Publicado por: <strong>{item.autor}</strong> —{" "}
                {item.fecha
                    ? new Date(item.fecha + "T00:00:00").toLocaleDateString("es-CO", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })
                    : "Sin fecha"}
            </p>

            <div className="flex justify-between items-center mt-2">
                <button
                    onClick={() => handleView(item)}
                    className="flex items-center gap-1 text-sm text-[#397C3C] font-semibold hover:underline transition"
                >
                    <Eye size={16} /> Ver más
                </button>

                <div className="flex gap-3">
                    <button
                        onClick={() => handleEdit(item)}
                        className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition"
                    >
                        <Edit2 size={16} /> Editar
                    </button>

                    <button
                        onClick={() => {
                            setComunicadoEliminar(item);   // ✔️ Guarda el item
                            setShowDeleteModal(true);        // ✔️ Abre el modal
                        }}
                        className="flex items-center gap-1 text-sm text-red-600 hover:text-red-800 transition"
                    >
                        <Trash2 size={16} /> Eliminar
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
