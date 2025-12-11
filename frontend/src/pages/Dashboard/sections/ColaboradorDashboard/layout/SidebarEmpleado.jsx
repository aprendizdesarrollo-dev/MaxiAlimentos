import {
    Home,
    Bell,
    FileText,
    User,
    MessageSquare,
    Gift,
    Menu,
    LogOut
} from "lucide-react";

export default function SidebarEmpleado({ active, setActive, isOpen, setIsOpen, onLogout }) {

    const menu = [
        { id: "inicio", label: "Inicio", icon: <Home size={22} /> },
        { id: "comunicados", label: "Comunicados", icon: <Bell size={22} /> },
        { id: "documentos", label: "Documentos", icon: <FileText size={22} /> },
        { id: "beneficios", label: "Beneficios", icon: <Gift size={22} /> },
        { id: "perfil", label: "Mi Perfil", icon: <User size={22} /> },
        { id: "mensajes", label: "Mensajes", icon: <MessageSquare size={22} /> },
    ];

    return (
        <>
        {/* BOTÓN HAMBURGUESA (SIEMPRE VISIBLE) */}
        <button
            onClick={() => setIsOpen(!isOpen)}
            className="
                fixed top-4 left-4 z-50 bg-[#397C3C] text-white 
                p-3 rounded-full shadow-lg hover:bg-[#2F6230] transition
            "
        >
            <Menu size={22} />
        </button>

        {/* SIDE BAR */}
        <aside
            className={`
                bg-white h-screen fixed top-0 left-0 z-40
                shadow-xl border-r border-gray-200
                rounded-r-[40px]
                flex flex-col
                transition-all duration-300
                ${isOpen ? "w-[260px] px-6" : "w-0 px-0 overflow-hidden"}
            `}
        >

            {/* LOGO */}
            <div className="flex flex-col items-center mt-8 mb-6">
                <img 
                    src="/logo-maxi.png"
                    alt="logo"
                    className="w-32"
                />

                {/* SEPARADOR */}
                <div className="w-28 h-[2px] bg-gray-300 mt-5 rounded-full"></div>
            </div>

            {/* MENÚ */}
            <nav className="flex flex-col gap-4 mt-4">
                {menu.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActive(item.id)}
                        className={`
                            flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                            text-left shadow-sm
                            ${active === item.id 
                                ? "bg-[#397C3C] text-white shadow-md" 
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"}
                        `}
                    >
                        {item.icon}
                        <span className="font-medium tracking-wide">{item.label}</span>
                    </button>
                ))}
            </nav>

            {/* ESPACIO */}
            <div className="flex-1"></div>

            {/* BOTÓN CERRAR SESIÓN */}
            <button
                onClick={onLogout}
                className="
                    flex items-center gap-3 mb-8 px-4 py-3
                    rounded-xl bg-red-600 text-white 
                    hover:bg-red-700 transition shadow-md
                "
            >
                <LogOut size={22} />
                <span className="font-medium">Cerrar sesión</span>
            </button>
        </aside>
        </>
    );
}
