import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CompletarPerfil() {
  // Estados de los campos
  const [cedula, setCedula] = useState("");
  const [cargo, setCargo] = useState("");
  const [area, setArea] = useState("");
  const [mensaje, setMensaje] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(""); // Se corrige el setError → setMensaje

    try {
      const token = localStorage.getItem("token");

      // Enviar datos al backend
      const response = await api.put(
        "/user/update",
        {
          cedula,
          cargo,
          area,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setMensaje(" Perfil actualizado correctamente.");
        // Redirigir al dashboard tras unos segundos
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        setMensaje(" " + (response.data.message || "Error al actualizar perfil."));
      }
    } catch (err) {
      console.error("Error en la conexión:", err);
      setMensaje(" Error al conectar con el servidor.");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#0D2611] px-4 py-10">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full">
        <h2 className="text-2xl font-bold text-[#397C3C] mb-4 text-center">
          Completa tu perfil
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Agrega tu cédula, cargo y área dentro de MaxiAlimentos.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/*  Campo Cédula */}
          <div>
            <label className="block text-sm font-medium mb-1">Cédula</label>
            <input
              type="text"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#397C3C] outline-none"
              placeholder="Numero de Identificación"
              required
            />
          </div>

          {/*  Campo Cargo */}
          <div>
            <label className="block text-sm font-medium mb-1">Cargo</label>
            <input
              type="text"
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#397C3C] outline-none"
              placeholder="Ejemplo: Contador"
              required
            />
          </div>

          {/* campo Área */}
          <div>
            <label className="block text-sm font-medium mb-1">Área</label>
            <input
              type="text"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#397C3C] outline-none"
              placeholder="Ejemplo: Mejora continua"
              required
            />
          </div>

          {/* Mensaje de éxito o error */}
          {mensaje && (
            <p
              className={`text-center text-sm mt-2 ${
                mensaje.includes("ok") ? "text-green-600" : "text-red-600"
              }`}
            >
              {mensaje}
            </p>
          )}

          {/* Botón Guardar */}
          <button
            type="submit"
            className="w-full bg-[#397C3C] hover:bg-[#5FA15E] text-white py-2 rounded-lg font-semibold transition duration-300"
          >
            Guardar
          </button>
        </form>
      </div>
    </section>
  );
}

export default CompletarPerfil;
