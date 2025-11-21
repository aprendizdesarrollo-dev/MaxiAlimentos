import { X, BadgeCheck, PlusCircle, Pencil, Trash2, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-hot-toast";

// Helper para armar la URL de imagen
const getImageUrl = (ruta) => {
    if (!ruta) return null;
    if (ruta.startsWith("http")) return ruta;
    return `http://127.0.0.1:8000/storage/${ruta}`;
};

export default function BeneficiosModal({
    data = [],
    onClose,
    onCreate,
    onEdit,
    onDelete,
}) {
    const [showForm, setShowForm] = useState(false);
    const [editando, setEditando] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [cargando, setCargando] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-[#00000080] backdrop-blur-sm flex justify-center items-start py-10 z-[999]"
        >
            {/* MODAL PRINCIPAL */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-3xl shadow-2xl w-[95%] max-w-4xl overflow-hidden relative"
            >
                {/* HEADER */}
                <div className="bg-gradient-to-r from-[#397C3C] to-[#5bad5c] px-8 py-5 text-white flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <BadgeCheck size={26} />
                        <h2 className="text-2xl font-bold">Beneficios de MaxiAlimentos</h2>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-9 h-9 rounded-full border border-white/40 flex justify-center items-center hover:bg-white/20 transition"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* CONTENIDO */}
                <div className="max-h-[70vh] overflow-y-auto p-8 space-y-6">
                    {(!data || data.length === 0) && (
                        <p className="text-gray-500 text-sm">No hay beneficios registrados.</p>
                    )}

                    {data && data.length > 0 && (
                        <section className="space-y-4">

                            {data.map((b) => {
                                // *** CORREGIDO ***
                                const imagenUrl = getImageUrl(b.imagen_url);

                                return (
                                    <div
                                        key={b.id}
                                        className="border border-gray-200 rounded-xl p-4 bg-gray-50 hover:shadow-md transition relative flex gap-4"
                                    >
                                        {/* MINI IMAGEN */}
                                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-white border border-dashed border-gray-300 flex items-center justify-center shrink-0">
                                            {imagenUrl ? (
                                                <img
                                                    src={imagenUrl}
                                                    alt={b.titulo}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex flex-col items-center text-[10px] text-gray-400">
                                                    <ImageIcon size={16} className="mb-1" />
                                                    <span>Sin imagen</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* TEXTO */}
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900">{b.titulo}</h3>
                                            <p className="text-sm text-gray-600 mt-1">{b.descripcion}</p>

                                            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                                                {b.vigencia_desde && (
                                                    <span>
                                                        Desde: <b>{b.vigencia_desde}</b>
                                                    </span>
                                                )}

                                                {b.vigencia_hasta && (
                                                    <span>
                                                        Hasta: <b>{b.vigencia_hasta}</b>
                                                    </span>
                                                )}

                                                {b.estado && (
                                                    <span
                                                        className={`px-2 py-[2px] rounded-full border text-[11px] ${
                                                            b.estado === "activo"
                                                                ? "border-green-500 text-green-700 bg-green-50"
                                                                : "border-gray-400 text-gray-600 bg-gray-100"
                                                        }`}
                                                    >
                                                        {b.estado === "activo" ? "Activo" : "Inactivo"}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* BOTONES */}
                                        <div className="absolute top-4 right-4 flex gap-2">
                                            <button
                                                onClick={() => {
                                                    setEditando(b);
                                                    setShowForm(true);
                                                }}
                                                className="text-[#397C3C] hover:text-[#285928]"
                                            >
                                                <Pencil size={18} />
                                            </button>

                                            <button
                                                onClick={() => setConfirmDelete(b)}
                                                className="text-red-600 hover:text-red-700"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}

                        </section>
                    )}
                </div>

                {/* BOTÓN CREAR */}
                <div className="p-5 border-t bg-gray-100 flex justify-end">
                    <button
                        onClick={() => {
                            setEditando(null);
                            setShowForm(true);
                        }}
                        className="flex items-center gap-2 bg-[#397C3C] text-white px-6 py-3 rounded-lg shadow hover:bg-[#2f612f] transition"
                    >
                        <PlusCircle size={18} />
                        Crear beneficio
                    </button>
                </div>
            </motion.div>

            {/* =============================== */}
            {/* MODAL FORMULARIO */}
            {/* =============================== */}

            {showForm && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 bg-black/40 flex justify-center items-center z-[1000]"
                >
                    <div className="bg-white w-full max-w-lg p-6 rounded-2xl shadow-xl relative">

                        {cargando && (
                            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex justify-center items-center rounded-2xl z-50">
                                <div className="animate-spin border-4 border-[#397C3C] border-t-transparent w-10 h-10 rounded-full"></div>
                            </div>
                        )}

                        <button
                            onClick={() => setShowForm(false)}
                            className="absolute top-3 right-3 text-gray-600 hover:text-black"
                        >
                            <X size={18} />
                        </button>

                        <h3 className="text-xl font-bold text-[#397C3C] mb-4">
                            {editando ? "Editar beneficio" : "Crear beneficio"}
                        </h3>

                        {/* FORMULARIO CORREGIDO */}
                        <form
                            onSubmit={async (e) => {
                                e.preventDefault();
                                setCargando(true);

                                const fd = new FormData(e.target);

                                try {
                                    if (editando) {
                                        await onEdit(editando.id, fd);
                                        toast.success("Beneficio actualizado correctamente");
                                    } else {
                                        await onCreate(fd);
                                        toast.success("Beneficio creado correctamente");
                                    }

                                    setShowForm(false);
                                } catch (err) {
                                    console.error(err);
                                    toast.error("Error al guardar el beneficio");
                                }

                                setCargando(false);
                            }}
                            className="space-y-4"
                        >
                            <input
                                name="titulo"
                                defaultValue={editando?.titulo}
                                placeholder="Título del beneficio"
                                className="w-full border p-2 rounded-lg"
                                required
                            />

                            <textarea
                                name="descripcion"
                                defaultValue={editando?.descripcion}
                                placeholder="Descripción del beneficio"
                                className="w-full border p-2 rounded-lg h-28"
                                required
                            />

                            <div>
                                <label className="text-sm font-semibold text-gray-700">
                                    Vigencia desde:
                                </label>
                                <input
                                    type="date"
                                    name="vigencia_desde"
                                    defaultValue={editando?.vigencia_desde || ""}
                                    className="w-full border p-2 rounded-lg mt-1"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-gray-700">
                                    Vigencia hasta:
                                </label>
                                <input
                                    type="date"
                                    name="vigencia_hasta"
                                    defaultValue={editando?.vigencia_hasta || ""}
                                    className="w-full border p-2 rounded-lg mt-1"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-gray-700">
                                    Estado:
                                </label>
                                <select
                                    name="estado"
                                    defaultValue={editando?.estado || "activo"}
                                    className="w-full border p-2 rounded-lg mt-1"
                                >
                                    <option value="activo">Activo</option>
                                    <option value="inactivo">Inactivo</option>
                                </select>
                            </div>

                            {/* Imagen */}
                            <div>
                                <label className="text-sm font-semibold text-gray-700">
                                    Imagen del beneficio:
                                </label>
                                <input
                                    type="file"
                                    name="imagen"
                                    accept="image/*"
                                    className="w-full border p-2 rounded-lg mt-1"
                                />
                            </div>

                            {editando?.imagen_url && (
                                <img
                                    src={editando.imagen_url}
                                    className="w-24 h-24 mt-2 rounded-lg border object-cover"
                                />
                            )}

                            <button
                                type="submit"
                                className="w-full bg-[#397C3C] text-white py-3 rounded-lg hover:bg-[#2f612f] transition font-semibold"
                            >
                                Guardar
                            </button>
                        </form>
                    </div>
                </motion.div>
            )}

            {/* CONFIRMAR ELIMINACIÓN */}
            {confirmDelete && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 bg-black/40 flex justify-center items-center z-[1100]"
                >
                    <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl relative">

                        {cargando && (
                            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex justify-center items-center z-[2000]">
                                <div className="animate-spin border-4 border-[#397C3C] border-t-transparent w-10 h-10 rounded-full"></div>
                            </div>
                        )}

                        <h3 className="text-xl font-bold text-red-600 mb-3">
                            Eliminar beneficio
                        </h3>

                        <p className="text-gray-700 mb-6">
                            ¿Seguro que deseas eliminar <b>{confirmDelete.titulo}</b>?
                        </p>

                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setConfirmDelete(null)}
                                className="px-6 py-2 rounded-lg border"
                            >
                                Cancelar
                            </button>

                            <button
                                onClick={async () => {
                                    setCargando(true);
                                    try {
                                        await onDelete(confirmDelete.id);
                                        toast.success("Beneficio eliminado");
                                        setConfirmDelete(null);
                                    } catch {
                                        toast.error("Error al eliminar beneficio");
                                    }
                                    setCargando(false);
                                }}
                                className="px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}
