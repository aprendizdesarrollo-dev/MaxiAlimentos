export default function ConversationItem({ usuario, ultimoMensaje, onClick, isActive }) {
    const avatarUrl = usuario.foto_perfil
        ? `http://127.0.0.1:8000/storage/${usuario.foto_perfil}`
        : "/default-avatar.png";

    return (
        <div
            onClick={onClick}
            className={`
                flex items-center gap-4 p-3 rounded-2xl cursor-pointer select-none
                transition-all duration-150
                border shadow-sm
                ${isActive 
                    ? "border-[#397C3C] bg-[#397C3C]/10 shadow-md"
                    : "border-gray-200 bg-white hover:bg-gray-100"
                }
            `}
        >
            {/* FOTO */}
            <div className="relative">
                <img
                    src={avatarUrl}
                    className="w-12 h-12 rounded-full object-cover border border-gray-300"
                    alt="Foto perfil"
                />

                {/* Estado verde en futuro si quieres */}
                {/* <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-[2px] border-white"></span> */}
            </div>

            {/* INFO */}
            <div className="flex flex-col min-w-0">
                <span className="font-semibold text-gray-800 leading-none">
                    {usuario.nombre}
                </span>

                {/* Último mensaje */}
                <span className="text-gray-500 text-sm truncate max-w-[170px] leading-tight">
                    {ultimoMensaje || "Salúdalo"}
                </span>
            </div>
        </div>
    );
}
