export default function MantenimientoSection({ config, actualizarConfig }) {
    if (!config) return <p>Cargando configuración...</p>;

    return (
        <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-200 mb-10">
            <h2 className="font-bold text-[#397C3C] mb-4">
                Modo mantenimiento
            </h2>

            <div className="flex justify-between items-center p-3 border rounded-xl">
                <span className="font-medium">Activar modo mantenimiento</span>

                <label className="relative inline-flex items-center cursor-pointer">
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

                    <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-[#397C3C]
                        after:content-[''] after:absolute after:top-[3px] after:left-[3px]
                        after:bg-white after:rounded-full after:h-[18px] after:w-[18px]
                        after:transition-all peer-checked:after:translate-x-full">
                    </div>
                </label>
            </div>
        </div>
    );
}
