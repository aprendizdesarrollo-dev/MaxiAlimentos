import { ToggleLeft } from "lucide-react";

export default function NotificacionesSection({ config, actualizarConfig }) {
    const sonido = Boolean(config.notificaciones_sonido);
    const popup = Boolean(config.notificaciones_popup);

    return (
        <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-200 mb-8">
            <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#397C3C]/10">
                    <ToggleLeft size={18} className="text-[#397C3C]" />
                </span>
                <h2 className="font-bold text-[#397C3C]">Notificaciones</h2>
            </div>

            <p className="text-sm text-gray-600 mb-4">
                Define cómo quieres que la intranet notifique a los usuarios sobre nuevos comunicados,
                eventos o actualizaciones importantes.
            </p>

            {/* Sonido */}
            <div className="flex justify-between items-center p-4 border rounded-2xl mb-4 bg-gray-50">
                <div>
                    <p className="font-medium text-gray-800">Sonido de notificaciones</p>
                    <p className="text-xs text-gray-500">
                        Reproducir un sonido discreto cuando haya nuevas novedades.
                    </p>
                </div>
                <input
                    type="checkbox"
                    checked={sonido}
                    onChange={(e) =>
                        actualizarConfig({ notificaciones_sonido: e.target.checked })
                    }
                    className="w-4 h-4 accent-[#397C3C]"
                />
            </div>

            {/* Popup */}
            <div className="flex justify-between items-center p-4 border rounded-2xl bg-gray-50">
                <div>
                    <p className="font-medium text-gray-800">Popup emergente</p>
                    <p className="text-xs text-gray-500">
                        Mostrar un cuadro emergente dentro del dashboard cuando haya una nueva notificación.
                    </p>
                </div>
                <input
                    type="checkbox"
                    checked={popup}
                    onChange={(e) =>
                        actualizarConfig({ notificaciones_popup: e.target.checked })
                    }
                    className="w-4 h-4 accent-[#397C3C]"
                />
            </div>
        </div>
    );
}
