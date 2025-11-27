import { useState } from "react";
import { Settings } from "lucide-react";

import { useConfiguracion } from "./hooks/useConfiguracion";
import MantenimientoSection from "./secciones/MantenimientoSection";
import NotificacionesSection from "./secciones/NotificacionesSection";
import LegalSection from "./secciones/LegalSection";
import CambiarContrasenaModal from "./components/CambiarContrasenaModal";

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
        <div className="p-8 space-y-6">

            {/* TÍTULO PRINCIPAL */}
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-[#397C3C]/10">
                        <Settings size={22} className="text-[#397C3C]" />
                    </span>
                    <div>
                        <h1 className="text-2xl font-bold text-[#397C3C]">
                            Configuración del Sistema
                        </h1>
                        <p className="text-sm text-gray-600">
                            Ajusta la apariencia, seguridad y comportamiento general de la intranet.
                        </p>
                    </div>
                </div>

                {saving && (
                    <span className="text-xs px-3 py-1 rounded-full bg-[#397C3C]/10 text-[#397C3C] font-medium">
                        Guardando cambios...
                    </span>
                )}
            </div>

            {/* ===========================================
                SECCIÓN: MODO MANTENIMIENTO
            ============================================ */}
            <MantenimientoSection
                config={config}
                actualizarConfig={actualizarConfig}
            />

            {/* ===========================================
                SECCIÓN: NOTIFICACIONES
            ============================================ */}
            <NotificacionesSection
                config={config}
                actualizarConfig={actualizarConfig}
            />

            {/* ===========================================
                SECCIÓN: CAMBIAR CONTRASEÑA (Modal)
            ============================================ */}
            <div className="bg-white rounded-3xl p-6 shadow-md border mb-8">
                <h2 className="font-bold text-[#397C3C] mb-2">Seguridad</h2>

                <p className="text-gray-600 text-sm mb-4">
                    Actualiza tu contraseña de acceso a la intranet.
                </p>

                <button
                    onClick={() => setShowPasswordModal(true)}
                    className="bg-[#397C3C] hover:bg-[#2f612f] transition text-white px-5 py-3 rounded-xl font-semibold"
                >
                    Cambiar contraseña
                </button>
            </div>

            {/* ===========================================
                SECCIÓN: POLÍTICAS Y TÉRMINOS
            ============================================ */}
            <LegalSection
                config={config}
                actualizarConfig={actualizarConfig}
            />

            {/* ===========================================
                MODAL PARA CAMBIAR CONTRASEÑA
            ============================================ */}
            {showPasswordModal && (
                <CambiarContrasenaModal onClose={() => setShowPasswordModal(false)} />
            )}
        </div>
    );
}
