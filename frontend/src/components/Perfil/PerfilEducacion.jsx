import { useState, useEffect } from "react";
import { BookOpen, Plus, Trash2, X } from "lucide-react";
import api from "../../services/api";

const PerfilEducacion = () => {
  const [educaciones, setEducaciones] = useState([]);
  const [form, setForm] = useState({
    institucion: "",
    titulo: "",
    nivel: "",
    especializacion: "",
    fecha_inicio: "",
    fecha_fin: "",
  });
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchEducaciones = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/perfil/educaciones", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) setEducaciones(res.data.data);
      } catch (err) {
        console.error("Error cargando educación:", err);
      }
    };
    fetchEducaciones();
  }, []);

  const handleAdd = async () => {
    if (!form.institucion || !form.titulo || !form.nivel) return;
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await api.post("/perfil/educaciones", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setEducaciones([...educaciones, res.data.data]);
        setForm({
          institucion: "",
          titulo: "",
          nivel: "",
          especializacion: "",
          fecha_inicio: "",
          fecha_fin: "",
        });
        setShowForm(false); // Oculta el formulario al guardar
      }
    } catch (err) {
      console.error("Error al agregar educación:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/perfil/educaciones/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEducaciones(educaciones.filter((e) => e.id !== id));
    } catch (err) {
      console.error("Error eliminando educación:", err);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold text-[#397C3C] flex items-center gap-2">
          <BookOpen size={20} /> Educación
        </h3>

        <button
          onClick={() => setShowForm(!showForm)}
          className={`flex items-center gap-1 px-4 py-2 border rounded-full transition ${
            showForm
              ? "border-red-500 text-red-600 hover:bg-red-50"
              : "border-[#397C3C] text-[#397C3C] hover:bg-[#397C3C]/10"
          }`}
        >
          {showForm ? (
            <>
              <X size={16} />
              Cancelar
            </>
          ) : (
            <>
              <Plus size={16} />
              Añadir educación
            </>
          )}
        </button>
      </div>

      {/* Formulario visible solo si showForm es true */}
      {showForm && (
        <div className="border border-gray-300 rounded-2xl p-5 bg-[#fafafa] mb-6 animate-fadeIn">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <Input
              label="Universidad/Instituto"
              placeholder="Ej: Servicio Nacional de Aprendizaje"
              value={form.institucion}
              onChange={(e) => setForm({ ...form, institucion: e.target.value })}
            />
            <Input
              label="Título o carrera"
              placeholder="Ej: Tecnólogo en Análisis de Sistemas"
              value={form.titulo}
              onChange={(e) => setForm({ ...form, titulo: e.target.value })}
            />
            <Select
              label="Nivel"
              value={form.nivel}
              onChange={(e) => setForm({ ...form, nivel: e.target.value })}
              options={[
                "Técnico",
                "Tecnólogo",
                "Profesional",
                "Especialización",
                "Maestría",
              ]}
            />
            <Input
              label="Especialización"
              placeholder="Ej: Desarrollo de software"
              value={form.especializacion}
              onChange={(e) =>
                setForm({ ...form, especializacion: e.target.value })
              }
            />
            <Input
              type="date"
              label="Fecha inicio"
              value={form.fecha_inicio}
              onChange={(e) =>
                setForm({ ...form, fecha_inicio: e.target.value })
              }
            />
            <Input
              type="date"
              label="Fecha fin"
              value={form.fecha_fin}
              onChange={(e) => setForm({ ...form, fecha_fin: e.target.value })}
            />
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={handleAdd}
              disabled={loading}
              className="px-5 py-2 bg-[#397C3C] text-white rounded-full hover:bg-[#2f6c31] transition"
            >
              Guardar educación
            </button>
          </div>
        </div>
      )}

      {/* Listado */}
      <div>
        {educaciones.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No se ha registrado información educativa.
          </p>
        ) : (
          <div className="overflow-x-auto mt-3">
            <table className="min-w-full text-sm border-t">
              <thead className="bg-[#f8f8f8] text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-4 py-2 text-left">Institución</th>
                  <th className="px-4 py-2 text-left">Título</th>
                  <th className="px-4 py-2 text-left">Nivel</th>
                  <th className="px-4 py-2 text-left">Especialización</th>
                  <th className="px-4 py-2 text-left">Inicio</th>
                  <th className="px-4 py-2 text-left">Fin</th>
                  <th className="px-4 py-2 text-right"></th>
                </tr>
              </thead>
              <tbody>
                {educaciones.map((edu) => (
                  <tr key={edu.id} className="border-b hover:bg-[#fafafa]">
                    <td className="px-4 py-2">{edu.institucion}</td>
                    <td className="px-4 py-2">{edu.titulo}</td>
                    <td className="px-4 py-2">{edu.nivel}</td>
                    <td className="px-4 py-2">{edu.especializacion || "-"}</td>
                    <td className="px-4 py-2">{edu.fecha_inicio}</td>
                    <td className="px-4 py-2">{edu.fecha_fin}</td>
                    <td className="px-4 py-2 text-right">
                      <button
                        onClick={() => handleDelete(edu.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

/* ----------- Subcomponentes UI ----------- */
const Input = ({ label, ...props }) => (
  <div>
    <label className="block font-medium text-gray-600 mb-1">{label}</label>
    <input
      {...props}
      className="w-full border rounded-lg px-3 py-2 focus:border-[#397C3C] focus:ring-[#397C3C]/30 outline-none"
    />
  </div>
);

const Select = ({ label, value, onChange, options }) => (
  <div>
    <label className="block font-medium text-gray-600 mb-1">{label}</label>
    <select
      value={value}
      onChange={onChange}
      className="w-full border rounded-lg px-3 py-2 focus:border-[#397C3C] focus:ring-[#397C3C]/30 outline-none"
    >
      <option value="">Seleccione...</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default PerfilEducacion;
