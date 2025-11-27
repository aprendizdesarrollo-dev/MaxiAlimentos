import { Wrench } from "lucide-react";

export default function MantenimientoSection({ config, actualizarConfig }) {

    if (!config) {
        return (
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 mb-10 text-center">
                <p className="text-gray-600 text-sm">Cargando configuración...</p>
            </div>
        );
    }

    return (
        <div className="
            bg-white 
            rounded-3xl 
            p-8 
            shadow-lg 
            border border-gray-200 
            mb-10
        ">
            
            {/* ENCABEZADO */}
            <div className="flex items-center gap-4 mb-6">
                <div className="
                    w-12 h-12 
                    rounded-2xl 
                    bg-[#397C3C]/10 
                    flex items-center justify-center
                ">
                    <Wrench size={26} className="text-[#397C3C]" />
                </div>

                <div>
                    <h2 className="font-extrabold text-xl text-[#397C3C]">
                        Modo mantenimiento
                    </h2>
                    <p className="text-gray-600 text-sm leading-tight mt-1">
                        Activa esta opción para dejar el sistema temporalmente fuera de servicio.
                    </p>
                </div>
            </div>

            {/* CONTENEDOR DE LA FEATURE */}
            <div className="
                flex justify-between items-center 
                p-5 
                rounded-2xl 
                border border-gray-200 
                bg-gray-50
            ">

                <div>
                    <p className="font-semibold text-gray-800">
                        Activar modo mantenimiento
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                        Cuando está activo, solo administradores podrán acceder al sistema.
                    </p>
                </div>

                {/* SWITCH PREMIUM */}
                <label className="relative inline-flex items-center cursor-pointer select-none">

                    <input
                        type="checkbox"
                        checked={config.modo_mantenimiento === "on"}
                        onChange={(e) =>
                            actualizarConfig({
                                modo_mantenimiento: e.target.checked ? "on" : "off"
                            })
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
