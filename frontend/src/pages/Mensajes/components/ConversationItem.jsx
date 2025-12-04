import Avatar from "../../../components/UI/Avatar";

export default function ConversationItem({
    usuario,
    ultimoMensaje,
    ultimaHora,
    unreadCount,
    onClick,
    isActive
}) {
    return (
        <div
            onClick={onClick}
            className={`
                flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all
                ${isActive
                    ? "bg-[#E9F5EA] border border-[#397C3C] shadow-md scale-[1.01]"
                    : "bg-white border border-gray-200 hover:bg-gray-100"}
            `}
        >
            <div className="relative">
                {usuario.foto_perfil ? (
                    <Avatar
                        src={usuario.foto_perfil}
                        size="md"
                        showStatus={false}
                    />
                ) : (
                    <div
                        className="
                w-12 h-12 rounded-full 
                flex flex-col items-center justify-center
                border border-dashed border-gray-400
                bg-gray-50 text-gray-500
                text-[10px] font-medium
            "
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 mb-[2px] opacity-60"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-9A2.25 2.25 0 002.25 5.25v9A2.25 2.25 0 004.5 16.5h3M9 9l3 3m0 0l3-3m-3 3V3"
                            />
                        </svg>
                        Sin foto
                    </div>
                )}

                {/* CONTADOR */}
                {unreadCount > 0 && (
                    <span
                        className="
                absolute -top-1 -right-1 bg-[#397C3C]
                text-white text-[10px] px-2 py-[2px]
                rounded-full shadow-md font-semibold
            "
                    >
                        {unreadCount}
                    </span>
                )}
            </div>
            <div className="flex flex-col w-full">
                <div className="flex justify-between items-center">
                    <span className="font-semibold text-[15px] truncate">
                        {usuario.nombre}
                    </span>

                    {ultimaHora && (
                        <span className="text-xs text-gray-500 font-medium">
                            {new Date(ultimaHora).toLocaleTimeString("es-CO", {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </span>
                    )}
                </div>

                <span className="text-gray-500 text-xs truncate max-w-[200px]">
                    {ultimoMensaje || "Salúdalo"}
                </span>
            </div>
        </div>
    );
}
