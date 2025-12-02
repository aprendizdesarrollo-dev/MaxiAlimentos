import { useState, useEffect } from "react";
import axios from "axios";

import Sidebar from "./layout/Sidebar";
import InicioSection from "./sections/InicioSection";

import ComunicadosDashboard from "../Comunicados/ComunicadosDashboard";
import DirectorioDashboard from "../Directorio/DirectorioDashboard";
import Perfil from "../Perfil/PerfilDashboard";
import ConfiguracionSistema from "../Configuracion/ConfiguracionSistema";
import DocumentosDashboard from "../Documentos/DocumentosDashboard";

import CumpleaniosModal from "../../components/Cumpleanios/CumpleaniosModal";
import BeneficiosModal from "../../components/Beneficios/BeneficiosModal";

import { useUser } from "./hooks/useUser";
import { useStats } from "./hooks/useStats";
import { useBeneficios } from "./hooks/useBeneficios";
import { useComunicados } from "./hooks/useComunicados";
import { useCumpleanios } from "./hooks/useCumpleanios";

import MensajesDashboard from "../Mensajes/MensajesDashboard";


import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {

    const [active, setActive] = useState("inicio");
    const [isOpen, setIsOpen] = useState(true);

    const navigate = useNavigate();

    const { user, loading, handleLogout } = useUser();
    const { stats, loadStats } = useStats();

    const {
        beneficios,
        cargando,
        showModal: showModalBeneficios,
        abrirModal: abrirModalBeneficios,
        cerrarModal: cerrarModalBeneficios,
        crearBeneficio,
        editarBeneficio,
        eliminarBeneficio,
    } = useBeneficios();

    const { comunicados } = useComunicados();

    const {
        cumpleData,
        showModal: showModalCumple,
        abrirModal: abrirModalCumple,
        cerrarModal: cerrarModalCumple,
    } = useCumpleanios();

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/notificaciones/cumpleanios/generar");
    }, []);

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

    if (user.rol !== "Administrador") {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-gray-600 text-lg">No autorizado</p>
            </div>
        );
    }

    const renderSection = () => {
        switch (active) {
            case "inicio":
                return (
                    <InicioSection
                        user={user}
                        stats={stats}
                        beneficios={beneficios}
                        cumpleData={cumpleData}
                        comunicados={comunicados}
                        onVerMasCumple={abrirModalCumple}
                        onVerMasBeneficios={abrirModalBeneficios}
                        setActive={setActive}
                        onEventosChange={loadStats}
                    />
                );
            case "comunicados":
                return <ComunicadosDashboard />;
            case "perfil":
                return <Perfil />;
            case "directorio":
                return <DirectorioDashboard />;
            case "config":
                return <ConfiguracionSistema />;
            case "documentos":
                return <DocumentosDashboard />;
            case "mensajes":
                return <MensajesDashboard />;
            default:
                return null;
        }
    };

    return (
        <div className="flex min-h-screen bg-[#f6f6f6] overflow-hidden">
            <Sidebar
                active={active}
                setActive={setActive}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                onLogout={handleLogout}
            />

            <main className={`flex-1 p-10 transition-all ${isOpen ? "ml-[230px]" : "ml-[80px]"}`}>
                {renderSection()}

                {showModalCumple && (
                    <CumpleaniosModal
                        data={cumpleData}
                        onClose={cerrarModalCumple}
                    />
                )}

                {showModalBeneficios && (
                    <BeneficiosModal
                        data={beneficios}
                        onClose={cerrarModalBeneficios}
                        onCreate={crearBeneficio}
                        onEdit={editarBeneficio}
                        onDelete={eliminarBeneficio}
                        cargando={cargando}
                    />
                )}
            </main>
        </div>
    );
}
