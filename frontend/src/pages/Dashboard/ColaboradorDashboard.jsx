// src/pages/ColaboradorDashboard.jsx
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function ColaboradorDashboard({ user }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // 🔹 Opción 1: avisar al backend (si tienes endpoint /logout)
      await api.post("/logout");

      // 🔹 Opción 2: limpiar token y rol en el navegador
      localStorage.removeItem("token");
      localStorage.removeItem("rol");

      // 🔹 Redirigir al login
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      // Incluso si falla, limpiamos el token igual
      localStorage.removeItem("token");
      localStorage.removeItem("rol");
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-3xl font-bold text-[#397C3C] mb-4">
        Bienvenido, {user.nombre}
      </h1>

      <p className="text-gray-600 mb-8">
        Aquí verás tus comunicados, solicitudes y tu información personal.
      </p>

      <div className="grid grid-cols-2 gap-4 mb-10">
        <button className="bg-[#397C3C] hover:bg-[#2F6230] text-white px-4 py-2 rounded-lg transition">
          Ver comunicados
        </button>
        <button className="bg-[#397C3C] hover:bg-[#2F6230] text-white px-4 py-2 rounded-lg transition">
          Solicitudes RH
        </button>
        <button className="bg-[#397C3C] hover:bg-[#2F6230] text-white px-4 py-2 rounded-lg transition">
          Mi perfil
        </button>
        <button className="bg-[#397C3C] hover:bg-[#2F6230] text-white px-4 py-2 rounded-lg transition">
          Mesa de ayuda
        </button>
      </div>

      <button
        onClick={handleLogout}
        className="mt-4 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg shadow-md transition"
      >
        Cerrar sesión
      </button>
    </div>
  );
}
