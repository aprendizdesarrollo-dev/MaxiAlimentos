import { X, Gift, Award, Building2, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";

const resolveFoto = (foto) => {
    if (!foto) return null;
    return foto.startsWith("http")
        ? foto
        : `http://127.0.0.1:8000/storage/${foto}`;
};

export default function CumpleaniosModal({ data, onClose }) {
    if (!data) return null;

    const { cumpleanios = [], aniversarios = [], empresa } = data;

    const formatDias = (dias) => {
        if (dias === 0) return "Hoy";
        if (dias === 1) return "Falta 1 día";
        return `Faltan ${dias} días`;
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-[#00000080] backdrop-blur-sm flex justify-center items-center z-50 p-4"
        >
            <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-3xl shadow-2xl w-[95%] max-w-4xl relative overflow-hidden"
            >

                {/* ENCABEZADO VERDE */}
                <div className="bg-gradient-to-r from-[#397C3C] to-[#5bad5c] py-6 px-8 flex items-center justify-center relative">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <CalendarDays size={28} />
                        Cumpleaños y Aniversarios
                    </h2>

                    {/* Botón cerrar */}
                    <button
                        onClick={onClose}
                        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white w-10 h-10 rounded-full flex items-center justify-center transition border border-white/40"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* CONTENIDO */}
                <div className="p-8 max-h-[70vh] overflow-y-auto space-y-10">

                    {/* CUMPLEAÑOS */}
                    <section>
                        <div className="flex items-center gap-2 mb-4">
                            <Gift size={22} className="text-[#397C3C]" />
                            <h3 className="text-xl font-semibold text-gray-800">Próximos cumpleaños</h3>
                        </div>

                        {cumpleanios.length ? (
                            <ul className="divide-y divide-gray-200">
                                {cumpleanios.map((c) => (
                                    <li key={c.id} className="py-4 flex items-center gap-4">

                                        {/* FOTO MINI CARNET */}
                                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#397C3C] bg-gray-100 flex items-center justify-center shadow">
                                            {c.foto_perfil ? (
                                                <img
                                                    src={resolveFoto(c.foto_perfil)}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-[10px] text-gray-600">Sin foto</span>
                                            )}
                                        </div>

                                        {/* INFO */}
                                        <div className="flex-1">
                                            <p className="font-semibold text-gray-900 text-[15px]">{c.nombre}</p>
                                            <p className="text-xs text-gray-500">{c.fecha_legible}</p>
                                        </div>

                                        {/* DÍAS */}
                                        <span className="text-xs font-semibold text-[#397C3C]">
                                            {formatDias(c.dias_faltantes)}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-gray-500">No hay cumpleaños registrados.</p>
                        )}
                    </section>

                    {/* ANIVERSARIOS */}
                    <section>
                        <div className="flex items-center gap-2 mb-4">
                            <Award size={22} className="text-[#397C3C]" />
                            <h3 className="text-xl font-semibold text-gray-800">Aniversarios laborales</h3>
                        </div>

                        {aniversarios.length ? (
                            <ul className="divide-y divide-gray-200">
                                {aniversarios.map((a) => (
                                    <li key={a.id} className="py-4 flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold text-gray-900">
                                                {a.nombre} · {a.anios} años
                                            </p>
                                            <p className="text-xs text-gray-500">{a.fecha_legible}</p>
                                        </div>

                                        <span className="text-xs font-semibold text-[#397C3C]">
                                            {formatDias(a.dias_faltantes)}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-gray-500">No hay aniversarios laborales registrados.</p>
                        )}
                    </section>

                    {/* EMPRESA */}
                    {empresa && (
                        <section>
                            <div className="flex items-center gap-2 mb-4">
                                <Building2 size={22} className="text-[#397C3C]" />
                                <h3 className="text-xl font-semibold text-gray-800">
                                    Cumpleaños de la empresa
                                </h3>
                            </div>

                            <div className="flex justify-between items-center border border-[#397C3C]/30 rounded-xl px-5 py-4 bg-gray-50 shadow-sm">
                                <div>
                                    <p className="font-semibold text-gray-900">{empresa.nombre}</p>
                                    <p className="text-xs text-gray-500">
                                        {empresa.anios} años · {empresa.fecha_legible}
                                    </p>
                                </div>

                                <span className="text-xs font-semibold text-[#397C3C] whitespace-nowrap">
                                    {formatDias(empresa.dias_faltantes)}
                                </span>
                            </div>
                        </section>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}
