import { ToggleLeft } from "lucide-react";

export default function NotificacionesSection({ config, actualizarConfig }) {

    if (!config) {
        return (
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 mb-10 text-center">
                <p className="text-gray-600 text-sm">Cargando configuración...</p>
            </div>
        );
    }

    const sonido = Boolean(config.notificaciones_sonido);
    const popup = Boolean(config.notificaciones_popup);

    return (
        <div
            className="
                bg-white 
                rounded-3xl 
                p-8 
                shadow-lg 
                border border-gray-200 
                mb-10
            "
        >
            {/* ENCABEZADO PRINCIPAL */}
            <div className="flex items-center gap-4 mb-6">
                <div className="
                    w-12 h-12 
                    rounded-2xl 
                    bg-[#397C3C]/10 
                    flex items-center justify-center
                ">
                    <ToggleLeft size={26} className="text-[#397C3C]" />
                </div>

                <div>
                    <h2 className="font-extrabold text-xl text-[#397C3C] leading-tight">
                        Notificaciones
                    </h2>
                    <p className="text-gray-600 text-sm mt-1">
                        Define cómo quieres que la intranet notifique a los usuarios sobre actualizaciones internas.
                    </p>
                </div>
            </div>

            {/* SONIDO */}
            <div
                className="
                    flex justify-between items-center 
                    p-5 
                    rounded-2xl 
                    border border-gray-200 
                    bg-gray-50 
                    mb-5
                "
            >
                <div>
                    <p className="font-semibold text-gray-800">
                        Sonido de notificaciones
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                        Reproduce un sonido suave al recibir una nueva notificación.
                    </p>
                </div>

                {/* SWITCH PREMIUM */}
                <label className="relative inline-flex items-center cursor-pointer select-none">
                    <input
                        type="checkbox"
                        checked={sonido}
                        onChange={(e) =>
                            actualizarConfig({ notificaciones_sonido: e.target.checked })
                        }
                        className="sr-only peer"
                    />

                    <div className="
                        w-14 h-7 
                        bg-gray-300 
                        rounded-full 
                        peer-checked:bg-[#397C3C] 
                        transition
                        relative
                        after:content-[''] 
                        after:absolute 
                        after:top-[4px] 
                        after:left-[4px]
                        after:bg-white 
                        after:rounded-full 
                        after:h-5 
                        after:w-5
                        after:transition-all 
                        peer-checked:after:translate-x-7
                    "></div>
                </label>
            </div>

            {/* POPUP */}
            <div
                className="
                    flex justify-between items-center 
                    p-5 
                    rounded-2xl 
                    border border-gray-200 
                    bg-gray-50
                "
            >
                <div>
                    <p className="font-semibold text-gray-800">
                        Popup emergente
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                        Mostrar un cuadro emergente dentro del dashboard al recibir nuevas notificaciones.
                    </p>
                </div>

                {/* SWITCH PREMIUM */}
                <label className="relative inline-flex items-center cursor-pointer select-none">
                    <input
                        type="checkbox"
                        checked={popup}
                        onChange={(e) =>
                            actualizarConfig({ notificaciones_popup: e.target.checked })
                        }
                        className="sr-only peer"
                    />

                    <div className="
                        w-14 h-7 
                        bg-gray-300 
                        rounded-full 
                        peer-checked:bg-[#397C3C] 
                        transition
                        relative
                        after:content-[''] 
                        after:absolute 
                        after:top-[4px] 
                        after:left-[4px]
                        after:bg-white 
                        after:rounded-full 
                        after:h-5 
                        after:w-5
                        after:transition-all 
                        peer-checked:after:translate-x-7
                    "></div>
                </label>
            </div>
        </div>
    );
}
