import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../../services/api";

// Layout
import SidebarEmpleado from "./layout/SidebarEmpleado";
import HeaderEmpleado from "./layout/HeaderEmpleado";

// Sección inicio (empleado)
import InicioEmpleado from "./sections/InicioEmpleado";

// Módulos reutilizados
import ComunicadosDashboard from "../../../Comunicados/ComunicadosDashboard";
import DocumentosDashboard from "../../../Documentos/DocumentosDashboard";
import PerfilDashboard from "../../../Perfil/PerfilDashboard";
import MensajesDashboard from "../../../Mensajes/MensajesDashboard";

export default function EmpleadoDashboard({ user }) {
  const [active, setActive] = useState("inicio");

  // ✅ Igual al admin: abierto/cerrado
  const [isOpen, setIsOpen] = useState(true);

  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      await api.post("/logout");
    } catch (e) {
      // no importa si falla
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("rol");
      navigate("/login");
    }
  };

  const renderSection = () => {
    switch (active) {
      case "inicio":
        return <InicioEmpleado user={user} />;
      case "comunicados":
        return <ComunicadosDashboard />;
      case "documentos":
        return <DocumentosDashboard />;
      case "perfil":
        return <PerfilDashboard />;
      case "mensajes":
        return <MensajesDashboard />;
      case "beneficios":
        // por ahora dejamos inicio (luego lo conectamos bien)
        return <InicioEmpleado user={user} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f6f6] overflow-hidden">
      <SidebarEmpleado
        active={active}
        setActive={setActive}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onLogout={onLogout}
      />

      {/* ✅ Margen como admin, PERO sumando el gap flotante (left-6 = 24px aprox)
          Sidebar abierto: 230px + 24px*2 => usamos 260px aprox
          Sidebar cerrado: 80px + 24px*2 => usamos 110px aprox
      */}
      <main
        className={`
          transition-all duration-300
          ${isOpen ? "ml-[260px]" : "ml-[110px]"}
          p-10
        `}
      >
        {/* Reutiliza el header que ya tienes (si quieres, luego lo ajustamos para empleado) */}
        <HeaderEmpleado user={user} />

        <div className="mt-8">{renderSection()}</div>
      </main>
    </div>
  );
}
