import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

// Dashboards por rol
import AdminDashboard from "./AdminDashboard";
import ComunicacionesDashboard from "./ComunicacionesDashboard";
import RecursosHumanosDashboard from "./RecursosHumanosDashboard";
import SoporteTIDashboard from "./SoporteTIDashboard";
import LiderDashboard from "./LiderDashboard";
import ColaboradorDashboard from "./ColaboradorDashboard";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/me");
        setUser(res.data.user);
      } catch (error) {
        console.error("Error obteniendo usuario:", error);
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
        <h2 className="text-xl text-gray-600 font-medium">Cargando información...</h2>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
        <h2 className="text-xl text-red-500 font-semibold">
          No se pudo obtener la información del usuario.
        </h2>
      </div>
    );
  }

  // ✅ Redirección a dashboard según el rol
  switch (user.rol) {
    case "Administrador":
      return <AdminDashboard user={user} />;
    case "Comunicaciones":
      return <ComunicacionesDashboard user={user} />;
    case "Recursos Humanos":
      return <RecursosHumanosDashboard user={user} />;
    case "Soporte TI":
      return <SoporteTIDashboard user={user} />;
    case "Líder de área":
      return <LiderDashboard user={user} />;
    default:
      return <ColaboradorDashboard user={user} />;
  }
}
