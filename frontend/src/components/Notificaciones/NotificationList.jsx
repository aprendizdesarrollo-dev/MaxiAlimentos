import {
    Trash2,
    X,
    Megaphone,
    CalendarDays,
    Gift,
    UserPlus,
    Cake,
    Bell
} from "lucide-react";

import axios from "axios";
import { useNotificaciones } from "../../hooks/useNotificaciones";

// Función para formatear la fecha como "Hoy", "Ayer" o fecha normal
function getFechaLabel(dateString) {
    const fecha = new Date(dateString);
    const hoy = new Date();

    const soloFecha = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

    const fNoti = soloFecha(fecha);
    const fHoy = soloFecha(hoy);

    const diffMs = fHoy - fNoti;
    const diffDias = diffMs / (1000 * 60 * 60 * 24);

    if (diffDias === 0) return "Hoy";
    if (diffDias === 1) return "Ayer";

    return fecha.toLocaleDateString();
}

// Agrupa notificaciones por fecha
function agruparPorFecha(notificaciones) {
    const grupos = {};

    notificaciones.forEach((n) => {
        const label = getFechaLabel(n.created_at);
        if (!grupos[label]) grupos[label] = [];
        grupos[label].push(n);
    });

    // Mantener un orden lógico: Hoy, Ayer, luego fechas
    const orden = ["Hoy", "Ayer"];
    const labelsExtras = Object.keys(grupos).filter(
        (l) => !orden.includes(l)
    );

    const labelsOrdenadas = [
        ...orden.filter((l) => grupos[l]),
        ...labelsExtras.sort((a, b) => {
            // Ordenar fechas de más reciente a más antigua
            const dA = new Date(grupos[a][0].created_at);
            const dB = new Date(grupos[b][0].created_at);
            return dB - dA;
        })
    ];

    return labelsOrdenadas.map((label) => ({
        label,
        items: grupos[label],
    }));
}

export default function NotificationList() {
    const { notificaciones, cargar } = useNotificaciones();

    const iconByType = (tipo) => {
        switch (tipo) {
            case "comunicado":
                return { icon: <Megaphone size={22} />, color: "#397C3C" };
            case "evento":
                return { icon: <CalendarDays size={22} />, color: "#2563eb" };
            case "beneficio":
                return { icon: <Gift size={22} />, color: "#db2777" };
            case "empleado":
                return { icon: <UserPlus size={22} />, color: "#7e22ce" };
            case "cumpleanios":
                return { icon: <Cake size={22} />, color: "#f59e0b" };
            default:
                return { icon: <Bell size={22} />, color: "#6b7280" };
        }
    };

    const eliminarUna = async (id) => {
        await axios.delete(`http://127.0.0.1:8000/api/notificaciones/${id}`);
        cargar();
    };

    const eliminarTodas = async () => {
        await axios.delete(`http://127.0.0.1:8000/api/notificaciones`);
        cargar();
    };

    // Ordenar de más reciente a más antigua antes de agrupar
    const ordenadas = [...notificaciones].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    const grupos = agruparPorFecha(ordenadas);

    return (
        <div
            className="
                bg-white/95 dark:bg-slate-900/95
                backdrop-blur-xl
                shadow-2xl
                rounded-2xl
                border border-gray-200/80 dark:border-slate-700
                overflow-hidden
                animate-fadeIn
            "
        >
            {/* Header */}
            <div className="bg-[#397C3C] text-white px-4 py-3 flex justify-between items-center">
                <h3 className="font-semibold text-lg">Notificaciones</h3>

                {notificaciones.length > 0 && (
                    <button
                        onClick={eliminarTodas}
                        className="
                            flex items-center gap-1
                            bg-white/15 hover:bg-white/25
                            rounded-full px-3 py-1
                            text-sm transition
                        "
                    >
                        <Trash2 size={16} />
                        Borrar todas
                    </button>
                )}
            </div>

            {/* Lista agrupada por fecha */}
            <div className="max-h-96 overflow-y-auto">
                {notificaciones.length === 0 && (
                    <p className="text-gray-500 dark:text-slate-300 text-sm text-center py-6">
                        No tienes notificaciones.
                    </p>
                )}

                {grupos.map((grupo) => (
                    <div key={grupo.label} className="px-4 py-3">
                        {/* Encabezado de grupo (Hoy, Ayer, fecha) */}
                        <div className="flex items-center gap-2 mb-2">
                            <span className="h-px flex-1 bg-gray-200 dark:bg-slate-700" />
                            <span className="text-[11px] font-semibold text-gray-500 dark:text-slate-300 uppercase tracking-wide">
                                {grupo.label}
                            </span>
                            <span className="h-px flex-1 bg-gray-200 dark:bg-slate-700" />
                        </div>

                        <div className="space-y-2">
                            {grupo.items.map((n) => {
                                const { icon, color } = iconByType(n.tipo);
                                const esNuevo = !n.leida; // leida === 0

                                return (
                                    <div
                                        key={n.id}
                                        className="
                                            relative
                                            p-4
                                            pl-5
                                            flex gap-4
                                            bg-white dark:bg-slate-900
                                            rounded-xl
                                            border border-gray-100 dark:border-slate-700
                                            shadow-sm
                                            hover:shadow-md
                                            hover:bg-gray-50/80 dark:hover:bg-slate-800
                                            transition
                                            group
                                        "
                                    >
                                        {/* Línea lateral por tipo */}
                                        <div
                                            className="absolute left-0 top-2 bottom-2 w-1 rounded-r-lg"
                                            style={{ backgroundColor: color }}
                                        />

                                        {/* Botón eliminar (visible al hover) */}
                                        <button
                                            onClick={() => eliminarUna(n.id)}
                                            className="
                                                    absolute -right-2 -top-2
                                                    bg-white dark:bg-slate-900
                                                    border border-gray-200 dark:border-slate-600
                                                    rounded-full
                                                    w-6 h-6
                                                    flex items-center justify-center
                                                    text-gray-400 hover:text-red-600
                                                    shadow-sm
                                                    opacity-0 group-hover:opacity-100
                                                    transition
                                                "
                                        >
                                            <X size={14} />
                                        </button>


                                        {/* Icono tipo dentro de un círculo */}
                                        <div
                                            className="
                                                w-10 h-10
                                                rounded-full
                                                flex items-center justify-center
                                                flex-shrink-0
                                            "
                                            style={{
                                                backgroundColor: `${color}20`,
                                                color: color,
                                            }}
                                        >
                                            {icon}
                                        </div>

                                        {/* Contenido */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                                                    {n.titulo}
                                                </h4>

                                                {esNuevo && (
                                                    <span
                                                        className="
                                                            text-[10px]
                                                            uppercase
                                                            tracking-wide
                                                            font-semibold
                                                            px-2 py-[2px]
                                                            rounded-full
                                                            bg-[#397C3C]/10
                                                            text-[#397C3C]
                                                        "
                                                    >
                                                        Nuevo
                                                    </span>
                                                )}
                                            </div>

                                            <p className="text-gray-600 dark:text-slate-300 text-xs mt-1 leading-snug break-words">
                                                {n.mensaje}
                                            </p>

                                            <p className="text-[11px] text-gray-400 dark:text-slate-400 mt-2">
                                                {new Date(n.created_at).toLocaleTimeString()}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
