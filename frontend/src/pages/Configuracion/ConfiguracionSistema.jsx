import { useState } from "react";
import { Settings } from "lucide-react";

import { useConfiguracion } from "./hooks/useConfiguracion";
import MantenimientoSection from "./secciones/MantenimientoSection";
import NotificacionesSection from "./secciones/NotificacionesSection";
import CambiarContrasenaModal from "./components/CambiarContrasenaModal";
import SeguridadSection from "./secciones/SeguridadSection";
import PrivacidadSection from "./secciones/PrivacidadSection";
import IntegracionesSection from "./secciones/IntegracionesSection";

export default function ConfiguracionSistema() {

    const { config, loading, saving, actualizarConfig } = useConfiguracion();
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    if (loading) {
        return (
            <div className="p-10">
                <p className="text-gray-600">Cargando configuración del sistema...</p>
            </div>
        );
    }

    if (!config) {
        return (
            <div className="p-10">
                <p className="text-red-600">
                    No se encontró una configuración registrada en el sistema.
                </p>
            </div>
        );
    }

    return (
        <div className="p-8 space-y-10">

            {/* HEADER PREMIUM tipo dashboard */}
            <div className="
    w-full 
    rounded-3xl 
    p-10 
    shadow-xl 
    bg-gradient-to-r 
    from-[#2f6b32] 
    to-[#5bad5c] 
    text-white
    relative
    overflow-hidden
">

                {/* ICONO GIGANTE DECORATIVO */}
                <Settings
                    className="
            absolute 
            right-6 
            top-1/2 
            -translate-y-1/2
            text-white/20 
        "
                    size={180}
                    strokeWidth={1.3}
                />

                {/* CONTENIDO DEL HEADER (frontal) */}
                <div className="relative z-10 flex items-center justify-between">

                    {/* IZQUIERDA */}
                    <div>
                        <h1 className="text-4xl font-extrabold leading-tight">
                            Configuración del Sistema
                        </h1>

                        <p className="text-white/90 text-sm mt-1">
                            Administra las opciones generales y preferencias del sistema.
                        </p>
                    </div>

                    {/* DERECHA: FECHA */}
                    <div className="text-right">
                        <span className="text-sm opacity-90 block">
                            {new Date().toLocaleDateString("es-CO", {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                                year: "numeric"
                            })}
                        </span>
                    </div>
                </div>
            </div>

            {/* ===============================
                SECCIÓN: MODO MANTENIMIENTO
            =============================== */}
            <MantenimientoSection
                config={config}
                actualizarConfig={actualizarConfig}
            />

            {/* ===============================
                SECCIÓN: NOTIFICACIONES
            =============================== */}
            <NotificacionesSection
                config={config}
                actualizarConfig={actualizarConfig}
            />

            {/* ===============================
                SECCIÓN: SEGURIDAD
            =============================== */}

            <SeguridadSection onOpenModal={() => setShowPasswordModal(true)} />

            {/* ===============================
                SECCIÓN: POLÍTICAS Y TÉRMINOS
            =============================== */}
            <PrivacidadSection />

            {/* ===============================
                SECCIÓN: MODO INTEGRACIONES
            =============================== */}
            <IntegracionesSection />

            {/* ===============================
                MODAL PARA CAMBIAR CONTRASEÑA
            =============================== */}
            {showPasswordModal && (
                <CambiarContrasenaModal onClose={() => setShowPasswordModal(false)} />
            )}
        </div>
    );
}
