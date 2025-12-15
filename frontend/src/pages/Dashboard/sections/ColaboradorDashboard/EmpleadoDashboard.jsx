import { useState } from "react";

import SidebarEmpleado from "./layout/SidebarEmpleado";
import InicioEmpleado from "./InicioEmpleado";

import ComunicadosEmpleado from "./sections/Comunicados/ComunicadosEmpleado";
import DirectorioEmpleado from "./sections/Directorio/DirectorioEmpleado";
import DocumentosEmpleado from "./sections/Documentos/DocumentosEmpleado";
import MensajesEmpleado from "./sections/Mensajes/MensajesEmpleado";
import PerfilEmpleado from "./sections/Perfil/PerfilEmpleado";

import { useUser } from "../../hooks/useUser";

export default function EmpleadoDashboard() {

    const [active, setActive] = useState("inicio");
    const [isOpen, setIsOpen] = useState(true);

    const { user, loading, handleLogout } = useUser();

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-gray-600 text-lg">Cargando...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-gray-600 text-lg">No autorizado</p>
            </div>
        );
    }

    if (user.rol !== "Empleado") {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-gray-600 text-lg">No autorizado</p>
            </div>
        );
    }

    const renderSection = () => {
        switch (active) {
            case "inicio":
                return <InicioEmpleado user={user} />;
            case "comunicados":
                return <ComunicadosEmpleado />;
            case "directorio":
                return <DirectorioEmpleado />;
            case "documentos":
                return <DocumentosEmpleado />;
            case "mensajes":
                return <MensajesEmpleado />;
            case "perfil":
                return <PerfilEmpleado />;
            default:
                return null;
        }
    };

    return (
        <div className="flex min-h-screen bg-[#f6f6f6] overflow-hidden">
            <SidebarEmpleado
                active={active}
                setActive={setActive}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                onLogout={handleLogout}
            />

            <main className={`flex-1 p-10 transition-all ${isOpen ? "ml-[230px]" : "ml-[80px]"}`}>
                {renderSection()}
            </main>
        </div>
    );
}
