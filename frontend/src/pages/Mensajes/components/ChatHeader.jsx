import { MoreVertical, Info } from "lucide-react";
import Avatar from "../../../components/UI/Avatar";

export default function ChatHeader({ usuario, escribiendo, estado }) {

    const formatearFecha = (fecha) => {
        if (!fecha) return "Desconectado";

        const f = new Date(fecha);
        return `Última vez ${f.toLocaleTimeString("es-CO", {
            hour: "2-digit",
            minute: "2-digit",
        })}`;
    };

    return (
        <div
            className="
                w-full 
                rounded-t-3xl 
                shadow-md
                bg-[#397C3C]
                text-white
                px-5 
                py-4 
                flex 
                items-center
                justify-between
            "
        >
            <div className="flex items-center gap-4">

                {/* FOTO / SIN FOTO */}
                {usuario.foto_perfil ? (
                    <Avatar
                        src={usuario.foto_perfil}
                        size="lg"
                        showStatus={true}
                        online={estado?.enLinea}
                    />
                ) : (
                    <div
                        className="
            w-12 h-12 rounded-full 
            flex flex-col items-center justify-center
            border-2 border-white border-dashed
            bg-white/10 text-white
            text-[10px] font-medium
        "
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 mb-[2px] opacity-80"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-9A2.25 2.25 0 002.25 5.25v9A2.25 2.25 0 004.5 16.5h3m1.5-7.5l3 3 3-3m-3 3V3"
                            />
                        </svg>
                        Sin foto
                    </div>
                )}
                {/* INFORMACIÓN */}
                <div className="flex flex-col leading-tight">
                    <span className="font-semibold text-lg">{usuario.nombre}</span>

                    <span className="text-sm opacity-90">
                        {escribiendo
                            ? "Escribiendo…"
                            : estado?.enLinea
                                ? "En línea"
                                : formatearFecha(estado?.ultima_vez)
                        }
                    </span>
                </div>

            </div>

            {/* ICONOS DERECHA */}
            <div className="flex items-center gap-4 pr-2">
                <Info size={22} className="cursor-pointer opacity-90 hover:opacity-100 transition" />
                <MoreVertical size={22} className="cursor-pointer opacity-90 hover:opacity-100 transition" />
            </div>
        </div>
    );
}
