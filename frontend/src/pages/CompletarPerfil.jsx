import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function CompletarPerfil() {
  const [cedula, setCedula] = useState("");
  const [cargo, setCargo] = useState("");
  const [area, setArea] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put("/user/update", {
        cedula,
        cargo,
        area,
      });

      if (response.data.success) {
        alert("✅ Perfil actualizado correctamente");
        navigate("/dashboard");
      } else {
        alert("⚠️ No se pudo actualizar el perfil");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("⚠️ Sesión expirada, vuelve a iniciar sesión");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        console.error("Error al actualizar:", error);
        alert("Error interno al guardar los datos");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f9f9]">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-2xl p-8 max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-[#397C3C] text-center">
          Completa tu perfil
        </h2>

        <label className="block mb-2">Cédula:</label>
        <input
          type="text"
          value={cedula}
          onChange={(e) => setCedula(e.target.value)}
          required
          className="w-full border rounded-lg px-3 py-2 mb-4"
        />

        <label className="block mb-2">Cargo:</label>
        <input
          type="text"
          value={cargo}
          onChange={(e) => setCargo(e.target.value)}
          required
          className="w-full border rounded-lg px-3 py-2 mb-4"
        />

        <label className="block mb-2">Área:</label>
        <input
          type="text"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          required
          className="w-full border rounded-lg px-3 py-2 mb-4"
        />

        <button
          type="submit"
          className="w-full bg-[#397C3C] text-white py-2 rounded-lg hover:bg-[#4FA556] transition"
        >
          Guardar cambios
        </button>
      </form>
    </div>
  );
}

export default CompletarPerfil;
