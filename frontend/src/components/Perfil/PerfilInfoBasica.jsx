import { useState } from "react";
import {
  User,
  Calendar,
  IdCard,
  Mail,
  Phone,
  Briefcase,
  Building2,
} from "lucide-react";
import api from "../../services/api";
import toast from "react-hot-toast";

const PerfilInfoBasica = ({ user, isEditing, setIsEditing, setUser }) => {
  const [form, setForm] = useState({
    nombre: user.nombre || "",
    segundo_nombre: user.segundo_nombre || "",
    apellido: user.apellido || "",
    genero: user.genero || "",
    fecha_nacimiento: user.fecha_nacimiento || "",
    estado_civil: user.estado_civil || "",
    cedula: user.cedula || "",
    telefono_personal: user.telefono_personal || "",
    correo_personal: user.correo_personal || "",
    correo_corporativo: user.correo_corporativo || user.correo || "",
    cargo: user.cargo || "",
    area: user.area || "",
    jefe_directo: user.jefe_directo || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.put("/perfil", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        toast.success("Cambios guardados correctamente");

        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
        }

        setUser((prev) => ({ ...prev, ...form }));
        setIsEditing(false);
      }

    } catch (err) {
      console.error("Error actualizando perfil:", err);

      if (err.response?.data?.errors) {
        const errors = err.response.data.errors;

        // mostrar el primer error automáticamente
        const firstKey = Object.keys(errors)[0];
        toast.error(errors[firstKey][0]);
        return;
      }

      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
        return;
      }

      toast.error("Error desconocido");
    }
  };


  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#397C3C]">
          Información General
        </h3>

        {isEditing && (
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[#397C3C] text-white rounded-full hover:bg-[#2f6c31] transition"
          >
            Guardar cambios
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
        {/* Nombre completo */}
        <Field
          label="Nombre completo"
          icon={<User size={16} className="text-[#397C3C]" />}
          isEditing={isEditing}
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
        />

        {/* Género */}
        <SelectField
          label="Género"
          icon={<User size={16} className="text-[#397C3C]" />}
          isEditing={isEditing}
          name="genero"
          value={form.genero}
          onChange={handleChange}
          options={["Masculino", "Femenino", "Otro"]}
        />

        {/* Fecha de nacimiento */}
        <Field
          label="Fecha de nacimiento"
          icon={<Calendar size={16} className="text-[#397C3C]" />}
          isEditing={isEditing}
          name="fecha_nacimiento"
          type="date"
          value={form.fecha_nacimiento}
          onChange={handleChange}
        />

        {/* Estado civil */}
        <SelectField
          label="Estado civil"
          icon={<User size={16} className="text-[#397C3C]" />}
          isEditing={isEditing}
          name="estado_civil"
          value={form.estado_civil}
          onChange={handleChange}
          options={[
            "Soltero",
            "Casado",
            "Unión libre",
            "Divorciado",
            "Viudo",
          ]}
        />

        {/* Cédula */}
        <Field
          label="Cédula"
          icon={<IdCard size={16} className="text-[#397C3C]" />}
          isEditing={isEditing}
          name="cedula"
          value={form.cedula}
          onChange={handleChange}
        />

        {/* Teléfono personal */}
        <Field
          label="Teléfono personal"
          icon={<Phone size={16} className="text-[#397C3C]" />}
          isEditing={isEditing}
          name="telefono_personal"
          value={form.telefono_personal}
          onChange={handleChange}
        />

        {/* Correo personal */}
        <Field
          label="Correo personal"
          icon={<Mail size={16} className="text-[#397C3C]" />}
          isEditing={isEditing}
          name="correo_personal"
          value={form.correo_personal}
          onChange={handleChange}
        />

        {/* Correo corporativo */}
        <Field
          label="Correo corporativo"
          icon={<Mail size={16} className="text-[#397C3C]" />}
          isEditing={isEditing}
          name="correo_corporativo"
          value={form.correo_corporativo}
          onChange={handleChange}
        />

        {/* Cargo */}
        <Field
          label="Cargo"
          icon={<Briefcase size={16} className="text-[#397C3C]" />}
          isEditing={isEditing}
          name="cargo"
          value={form.cargo}
          onChange={handleChange}
        />

        {/* Área */}
        <Field
          label="Área"
          icon={<Building2 size={16} className="text-[#397C3C]" />}
          isEditing={isEditing}
          name="area"
          value={form.area}
          onChange={handleChange}
        />

        {/* Jefe directo */}
        <Field
          label="Jefe directo"
          icon={<User size={16} className="text-[#397C3C]" />}
          isEditing={isEditing}
          name="jefe_directo"
          value={form.jefe_directo}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default PerfilInfoBasica;

/* =================== COMPONENTE FIELD REUTILIZABLE =================== */
const Field = ({
  label,
  icon,
  isEditing,
  name,
  value,
  onChange,
  type = "text",
}) => (
  <div>
    <p className="font-medium text-gray-600 mb-1">{label}</p>
    <div className="flex items-center gap-2">
      {icon}
      {isEditing ? (
        <input
          type={type}
          name={name}
          value={value || ""}
          onChange={onChange}
          className="w-full border border-gray-300 rounded-lg px-2 py-1 text-sm focus:border-[#397C3C] focus:ring-[#397C3C]/30 outline-none"
        />
      ) : (
        <span>{value || "No registrado"}</span>
      )}
    </div>
  </div>
);

/* =================== SELECT FIELD =================== */
const SelectField = ({
  label,
  icon,
  isEditing,
  name,
  value,
  onChange,
  options = [],
}) => (
  <div>
    <p className="font-medium text-gray-600 mb-1">{label}</p>
    <div className="flex items-center gap-2">
      {icon}
      {isEditing ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full border border-gray-300 rounded-lg px-2 py-1 text-sm focus:border-[#397C3C] focus:ring-[#397C3C]/30 outline-none"
        >
          <option value="">Seleccione...</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <span>{value || "No registrado"}</span>
      )}
    </div>
  </div>
);
