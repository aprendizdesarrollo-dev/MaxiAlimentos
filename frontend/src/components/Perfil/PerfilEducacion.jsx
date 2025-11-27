import { useState, useEffect } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { Plus, Trash2 } from "lucide-react";

const PerfilEducacion = ({ isEditing }) => {
  const [educaciones, setEducaciones] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    institucion: "",
    titulo: "",
    nivel: "",
    especializacion: "",
    fecha_inicio: "",
    fecha_fin: "",
  });

  const token = localStorage.getItem("token");

  // 🔹 Cargar educaciones del backend
  const fetchEducacion = async () => {
    try {
      const res = await api.get("/educaciones", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEducaciones(res.data.data);
    } catch (err) {
      console.error("Error cargando educaciones:", err);
    }
  };

  useEffect(() => {
    fetchEducacion();
  }, []);

  // 🔹 Manejo de inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Guardar educación nueva
 const handleSave = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await api.post("/educaciones", form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.data.success) {
      toast.success("Educación registrada");

      setShowForm(false);

      // Limpiar formulario
      setForm({
        institucion: "",
        titulo: "",
        nivel: "",
        especializacion: "",
        fecha_inicio: "",
        fecha_fin: "",
      });

      // Volver a cargar la lista actualizada
      fetchEducacion();
    }
  } catch (err) {
    console.error("Error guardando educación:", err);
    toast.error("Error al guardar los datos");
  }
};


  // 🔹 Eliminar educación
  const handleDelete = async (id) => {
    try {
      await api.delete(`/educaciones/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Eliminado");
      fetchEducacion();
    } catch (err) {
      toast.error("Error eliminando");
      console.error(err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#397C3C]">Educación</h3>

        {isEditing && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 border border-[#397C3C] text-[#397C3C] rounded-full hover:bg-[#397C3C] hover:text-white transition"
          >
            <Plus size={18} />
            Añadir educación
          </button>
        )}
      </div>

      {/* 🔹 FORMULARIO SOLO SI LE DAN CLICK */}
      {showForm && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border mb-5">
          <Input label="Institución" name="institucion" value={form.institucion} onChange={handleChange} />
          <Input label="Título o carrera" name="titulo" value={form.titulo} onChange={handleChange} />

          <div>
            <label className="text-sm text-gray-600">Nivel</label>
            <select
              name="nivel"
              value={form.nivel}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            >
              <option value="">Seleccione</option>
              <option value="Técnico">Técnico</option>
              <option value="Tecnólogo">Tecnólogo</option>
              <option value="Profesional">Profesional</option>
              <option value="Especialización">Especialización</option>
              <option value="Maestría">Maestría</option>
            </select>
          </div>

          <Input label="Especialización" name="especializacion" value={form.especializacion} onChange={handleChange} />
          <Input label="Fecha inicio" name="fecha_inicio" type="date" value={form.fecha_inicio} onChange={handleChange} />
          <Input label="Fecha fin" name="fecha_fin" type="date" value={form.fecha_fin} onChange={handleChange} />

          <div className="col-span-2 flex justify-end">
            <button
              onClick={handleSave}
              className="px-5 py-2 bg-[#397C3C] text-white rounded-full hover:bg-[#2f6c31]"
            >
              Guardar educación
            </button>
          </div>
        </div>
      )}

      {/* 🔹 LISTADO DE EDUCACIONES */}
      {educaciones.length === 0 ? (
        <p className="text-gray-500 text-sm">No se ha registrado información educativa.</p>
      ) : (
        <div className="space-y-3">
          {educaciones.map((e) => (
            <div
              key={e.id}
              className="p-4 border rounded-xl flex justify-between items-center hover:bg-gray-50 transition"
            >
              <div>
                <p className="font-semibold">{e.titulo || "Sin título"}</p>
                <p className="text-sm text-gray-600">{e.institucion}</p>
                <p className="text-sm text-gray-500">
                  {e.nivel} — {e.fecha_inicio} / {e.fecha_fin}
                </p>
              </div>

              {isEditing && (
                <button
                  onClick={() => handleDelete(e.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={22} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PerfilEducacion;

const Input = ({ label, ...props }) => (
  <div>
    <label className="text-sm text-gray-600">{label}</label>
    <input
      {...props}
      className="w-full border rounded-lg px-3 py-2 mt-1"
    />
  </div>
);
