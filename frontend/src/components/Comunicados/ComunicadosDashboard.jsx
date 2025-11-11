import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusCircle,
  X,
  Edit2,
  Trash2,
  FileText,
  AlertTriangle,
  Eye,
} from "lucide-react";
import api from "../../services/api";
import toast from "react-hot-toast";

export default function ComunicadosDashboard() {
  const [comunicados, setComunicados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editando, setEditando] = useState(null);
  const [comunicadoEliminar, setComunicadoEliminar] = useState(null);
  const [comunicadoActivo, setComunicadoActivo] = useState(null);
  const [nuevo, setNuevo] = useState({ titulo: "", descripcion: "" });

  // === Cargar comunicados ===
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/comunicados");
        setComunicados(res.data.data || []);
      } catch (error) {
        toast.error("Error al cargar los comunicados");
      }
    };
    fetchData();
  }, []);

  // === Guardar o actualizar ===
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editando) {
        await api.put(`/comunicados/${editando.id}`, nuevo);
        toast.success("Comunicado actualizado");
      } else {
        await api.post("/comunicados", {
          ...nuevo,
          autor: "Administrador General",
        });
        toast.success("Comunicado creado");
      }
      const res = await api.get("/comunicados");
      setComunicados(res.data.data || []);
      setShowModal(false);
      setEditando(null);
      setNuevo({ titulo: "", descripcion: "" });
    } catch {
      toast.error("Error al guardar");
    } finally {
      setLoading(false);
    }
  };

  // === Abrir modal edición ===
  const handleEdit = (item) => {
    setEditando(item);
    setNuevo({ titulo: item.titulo, descripcion: item.descripcion });
    setShowModal(true);
  };

  // === Modal eliminar ===
  const handleDelete = async () => {
    try {
      await api.delete(`/comunicados/${comunicadoEliminar.id}`);
      setComunicados((prev) =>
        prev.filter((c) => c.id !== comunicadoEliminar.id)
      );
      toast.success("Comunicado eliminado");
      setShowDeleteModal(false);
      setComunicadoEliminar(null);
    } catch {
      toast.error("Error al eliminar comunicado");
    }
  };

  // === Abrir modal de vista detallada ===
  const handleView = (item) => {
    setComunicadoActivo(item);
    setShowViewModal(true);
  };

  return (
    <section className="p-8 relative">
      {/* ================== ENCABEZADO ================== */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-md rounded-full px-10 py-7 flex justify-between items-center mb-10"
      >
        <div className="flex items-center gap-6">
          <div className="bg-[#397C3C]/10 p-4 rounded-2xl shadow-sm">
            <FileText className="text-[#397C3C]" size={40} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-[#397C3C] leading-tight">
              Comunicados Internos
            </h1>
            <p className="text-gray-700 text-sm font-medium">
              Gestiona, publica y revisa los comunicados de la empresa.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#397C3C] hover:bg-[#2f612f] text-white px-6 py-3 rounded-lg shadow transition font-semibold"
        >
          <PlusCircle size={20} /> Nuevo Comunicado
        </button>
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
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#f9f9f9] p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition"
              >
                {/* Título */}
                <h3 className="text-xl font-bold text-[#397C3C] mb-2">
                  {item.titulo}
                </h3>

                {/* Descripción breve */}
                <p className="text-gray-700 text-sm line-clamp-3 mb-3">
                  {item.descripcion}
                </p>

                {/* Fecha formateada */}
                <p className="text-xs text-gray-500 mb-3">
                  Publicado por: <strong>{item.autor}</strong> —{" "}
                  {item.fecha
                    ? new Date(item.fecha + "T00:00:00").toLocaleDateString(
                      "es-CO",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )
                    : "Sin fecha"}
                </p>

                {/* Botones */}
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
                        setComunicadoEliminar(item);
                        setShowDeleteModal(true);
                      }}
                      className="flex items-center gap-1 text-sm text-red-600 hover:text-red-800 transition"
                    >
                      <Trash2 size={16} /> Eliminar
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* ================== MODAL CREAR/EDITAR ================== */}
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
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#397C3C] text-white py-2 rounded-lg hover:bg-[#2f612f] transition font-semibold"
                >
                  {loading
                    ? "Guardando..."
                    : editando
                      ? "Guardar cambios"
                      : "Guardar comunicado"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================== MODAL ELIMINAR ================== */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            className="fixed inset-0 bg-[#00000080] backdrop-blur-md flex justify-center items-center z-50 transition-all duration-300"
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
              <p className="text-gray-600 mb-6 text-sm">
                Esta acción no se puede deshacer.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition font-semibold"
                >
                  Eliminar
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

      {/* ================== MODAL VER DETALLES ================== */}
      <AnimatePresence>
        {showViewModal && comunicadoActivo && (
          <motion.div
            className="fixed inset-0 bg-[#00000080] backdrop-blur-md flex justify-center items-center z-50 transition-all duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-2xl rounded-3xl shadow-xl p-8 relative"
            >
              <button
                onClick={() => setShowViewModal(false)}
                className="absolute top-5 right-5 text-gray-500 hover:text-gray-700 transition"
              >
                <X size={24} />
              </button>

              <h2 className="text-3xl font-extrabold text-[#397C3C] mb-3">
                {comunicadoActivo.titulo}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6 text-justify">
                {comunicadoActivo.descripcion}
              </p>
              <div className="flex justify-between text-sm text-gray-500">
                <p>
                  <strong>Autor:</strong> {comunicadoActivo.autor}
                </p>
                <p>
                  <strong>Fecha:</strong>{" "}
                  {comunicadoActivo.fecha
                    ? new Date(
                      comunicadoActivo.fecha + "T00:00:00"
                    ).toLocaleDateString("es-CO", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                    : "Sin fecha"}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );

}
