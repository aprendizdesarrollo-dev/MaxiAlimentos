import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import logo from "../../assets/logo.png";

export default function CompletarPerfil() {
  const navigate = useNavigate();

  // 🧩 Todos los campos que puede tener el perfil
  const [form, setForm] = useState({
    cedula: "",
    nombre: "",
    segundo_nombre: "",
    apellido: "",
    genero: "",
    fecha_nacimiento: "",
    estado_civil: "",
    telefono_movil: "",
    telefono_personal: "",
    correo_personal: "",
    direccion: "",
    ciudad: "",
    departamento: "",
    pais: "",
    cargo: "",
    area: "",
    jefe_directo: "",
  });

  const [mensaje, setMensaje] = useState("");
  const [guardando, setGuardando] = useState(false);

  // Manejar cambios de los inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setGuardando(true);

    try {
      const token = localStorage.getItem("token");

      const response = await api.put("/user/update", form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setMensaje("Perfil completado correctamente. Redirigiendo...");
        setTimeout(() => navigate("/dashboard"), 2000);
      } else {
        setMensaje(response.data.message || "Error al completar el perfil.");
      }
    } catch (err) {
      console.error("Error en la conexión:", err);
      setMensaje("Error al conectar con el servidor.");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#0D2611] px-4 py-10">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-2xl w-full">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="MaxiAlimentos" className="w-28 h-auto" />
        </div>

        <h2 className="text-2xl font-bold text-[#397C3C] mb-3 text-center">
          Completa tu perfil
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Ingresa los datos personales y laborales faltantes.
        </p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Datos personales */}
          <input
            type="text"
            name="cedula"
            placeholder="Cédula"
            value={form.cedula}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#397C3C] outline-none"
          />
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#397C3C]"
          />
          <input
            type="text"
            name="segundo_nombre"
            placeholder="Segundo nombre (opcional)"
            value={form.segundo_nombre}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#397C3C]"
          />
          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={form.apellido}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#397C3C]"
          />

          <input
            type="text"
            name="genero"
            placeholder="Género"
            value={form.genero}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#397C3C]"
          />
          <input
            type="date"
            name="fecha_nacimiento"
            placeholder="Fecha de nacimiento"
            value={form.fecha_nacimiento}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#397C3C]"
          />
          <input
            type="text"
            name="estado_civil"
            placeholder="Estado civil"
            value={form.estado_civil}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#397C3C]"
          />
          <input
            type="text"
            name="telefono_movil"
            placeholder="Teléfono móvil"
            value={form.telefono_movil}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#397C3C]"
          />
          <input
            type="text"
            name="telefono_personal"
            placeholder="Teléfono personal"
            value={form.telefono_personal}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#397C3C]"
          />

          {/* Contacto */}
          <input
            type="email"
            name="correo_personal"
            placeholder="Correo personal (opcional)"
            value={form.correo_personal}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#397C3C]"
          />
          <input
            type="text"
            name="direccion"
            placeholder="Dirección"
            value={form.direccion}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#397C3C]"
          />
          <input
            type="text"
            name="barrio"
            placeholder="Barrio"
            value={form.barrio}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#397C3C]"
          />
          <input
            type="text"
            name="ciudad"
            placeholder="Ciudad"
            value={form.ciudad}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#397C3C]"
          />
          <input
            type="text"
            name="departamento"
            placeholder="Departamento"
            value={form.departamento}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#397C3C]"
          />
          <input
            type="text"
            name="pais"
            placeholder="País"
            value={form.pais}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#397C3C]"
          />

          {/* Datos laborales */}
          <input
            type="text"
            name="cargo"
            placeholder="Cargo"
            value={form.cargo}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#397C3C]"
          />
          <input
            type="text"
            name="area"
            placeholder="Área"
            value={form.area}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#397C3C]"
          />
          <input
            type="text"
            name="jefe_directo"
            placeholder="Jefe directo"
            value={form.jefe_directo}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#397C3C]"
          />
        </form>

        {/* Mensaje */}
        {mensaje && (
          <p className="mt-4 text-center text-sm font-medium text-[#397C3C]">
            {mensaje}
          </p>
        )}

        {/* Botón */}
        <button
          onClick={handleSubmit}
          disabled={guardando}
          className={`w-full mt-6 bg-[#397C3C] hover:bg-[#5FA15E] text-white py-3 rounded-lg font-semibold transition ${
            guardando ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {guardando ? "Guardando..." : "Guardar y continuar"}
        </button>
      </div>
    </section>
  );
}
