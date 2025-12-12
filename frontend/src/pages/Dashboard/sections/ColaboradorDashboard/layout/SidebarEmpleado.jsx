import {
    Home,
    Megaphone,
    Users,
    FileText,
    MessageCircle,
    User,
    LogOut,
    Menu,
    Folder,
    Settings,
    MessageSquare,
} from "lucide-react";

export default function SidebarEmpleado({
    active,
    setActive,
    isOpen,
    setIsOpen,
    onLogout,
}) {
    const menu = [
        { id: "inicio", label: "Inicio", icon: <Home size={22} /> },
        { id: "comunicados", label: "Comunicados", icon: <FileText size={22} /> },
        { id: "directorio", label: "Directorio", icon: <Users size={22} /> },
        { id: "documentos", label: "Documentos", icon: <Folder size={22} /> },
        { id: "config", label: "Configuración", icon: <Settings size={22} /> },
        { id: "perfil", label: "Perfil", icon: <User size={22} /> },
        { id: "mensajes", label: "Mensajes", icon: <MessageSquare size={22} /> },
    ];

    return (
        <aside
            className={`
        fixed top-6 left-6 z-40
        h-[calc(100vh-48px)]
        ${isOpen ? "w-[230px]" : "w-[80px]"}
        bg-[#2F6F33]
        rounded-3xl
        shadow-2xl
        transition-all duration-300
        flex flex-col
        overflow-hidden
      `}
        >
            {/* LOGO ARRIBA (QUIETO) */}
            {isOpen && (
                <div className="flex items-center justify-center px-4 pt-6">
                    <img
                        src="../../../../../public/assets/logo.png"
                        alt="MaxiAlimentos"
                        className="w-10 h-10 object-contain"
                    />
                </div>
            )}

            {/* DIVISOR */}
            {isOpen && (
                <div className="px-4 mt-5">
                    <div className="h-[1px] bg-white/20 rounded-full" />
                </div>
            )}

            {/* MENÚ */}
            <nav className="flex flex-col gap-2 px-3 mt-6">
                {menu.map((item) => {
                    const isActive = active === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => setActive(item.id)}
                            className={`
                h-12 px-3
                flex items-center gap-3
                rounded-xl
                transition
                ${isActive
                                    ? "bg-white text-[#2F6F33] shadow"
                                    : "text-white hover:bg白/15"
                                }
              `}
                            title={!isOpen ? item.label : undefined}
                        >
                            {item.icon}
                            {isOpen && (
                                <span className="text-sm font-medium truncate">
                                    {item.label}
                                </span>
                            )}
                        </button>
                    );
                })}
            </nav>

            <div className="flex-1" />

            {/* BOTÓN MENÚ (HAMBURGUESA) */}
            <div className="px-3 mb-3">
                <button
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="
            h-12 w-full
            flex items-center justify-center
            rounded-xl
            bg-white/15 hover:bg-white/25
            transition
          "
                    title="Menú"
                >
                    <Menu size={22} className="text-white" />
                </button>
            </div>

            {/* CERRAR SESIÓN */}
            <div className="px-3 pb-5">
                <button
                    onClick={onLogout}
                    className="
            h-12 w-full
            flex items-center justify-center gap-3
            rounded-xl
            bg-[#397C3C]
            hover:bg-[#2F6230]
            text-white
            transition shadow
          "
                    title="Cerrar sesión"
                >
                    <LogOut size={20} />
                    {isOpen && <span className="text-sm font-medium">Salir</span>}
                </button>
            </div>
        </aside>
    );
}
