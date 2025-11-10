import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

// Importar dashboards
import AdminDashboard from "./AdminDashboard";
import ColaboradorDashboard from "./ColaboradorDashboard";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/me");
        setUser(res.data.user);
      } catch (error) {
        console.error("Error al obtener usuario:", error);
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
      }
    };

    fetchUser();
  }, [navigate]);

  // Estado de carga mientras se obtiene el usuario
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
        <p className="text-[#397C3C] text-lg font-semibold animate-pulse">
          Cargando información...
        </p>
      </div>
    );
  }

  // Si por alguna razón no hay datos válidos
  if (!user.rol) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
        <h2 className="text-xl text-red-500 font-semibold">
          No se pudo determinar el rol del usuario.
        </h2>
      </div>
    );
  }

  // Redirección a dashboard según el rol
  if (user.rol === "Administrador") {
    return <AdminDashboard user={user} />;
  }

  // Todo usuario nuevo o estándar es "Empleado"
  return <ColaboradorDashboard user={user} />;
}
