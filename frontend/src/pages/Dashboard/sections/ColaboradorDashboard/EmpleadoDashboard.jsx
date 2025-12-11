// src/pages/Dashboard/ColaboradorDashboard/EmpleadoDashboard.jsx

import { useState } from "react";

import SidebarEmpleado from "./layout/SidebarEmpleado";
import HeaderEmpleado from "./layout/HeaderEmpleado";

import InicioEmpleado from "./sections/InicioEmpleado";

import ComunicadosDashboard from "../../../Comunicados/ComunicadosDashboard";
import DocumentosDashboard from "../../../Documentos/DocumentosDashboard";
import PerfilDashboard from "../../../Perfil/PerfilDashboard";
import MensajesDashboard from "../../../Mensajes/MensajesDashboard";

export default function EmpleadoDashboard({ user }) {

    const [active, setActive] = useState("inicio");

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

            default:
                return null;
        }
    };

    return (
        <div className="flex min-h-screen bg-[#f6f6f6]">
            <SidebarEmpleado active={active} setActive={setActive} />

            <div className="flex-1">
                <HeaderEmpleado user={user} />
                <div className="p-8">
                    {renderSection()}
                </div>
            </div>
        </div>
    );
}
