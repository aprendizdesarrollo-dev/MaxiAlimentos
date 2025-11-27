import { motion } from "framer-motion";
import {
    Home,
    Users,
    FileText,
    Settings,
    Menu,
    LogOut,
    FolderOpen,
    ClipboardList,
    BarChart3,
    UserCircle,
    LayoutDashboard,
    UserCheck,
    CalendarDays,
} from "lucide-react";

// Sidebar del Admin, reutilizable
export default function Sidebar({ active, setActive, isOpen, setIsOpen, onLogout }) {
    const menuItems = [
        { id: "inicio", label: "Inicio", icon: <Home size={20} /> },
        { id: "comunicados", label: "Comunicados", icon: <FileText size={20} /> },
        { id: "directorio", label: "Directorio", icon: <Users size={20} /> },
        { id: "documentos", label: "Documentos", icon: <FolderOpen size={20} /> },
        { id: "config", label: "Configuración", icon: <Settings size={20} /> },
        { id: "perfil", label: "Perfil", icon: <UserCircle size={20} /> },
    ];

    return (
        <motion.aside
            animate={{ width: isOpen ? 230 : 80 }}
            className="bg-[#397C3C] text-white fixed top-0 left-0 h-full py-6 flex flex-col justify-between"
        >
            <div>
                <div className="text-center font-bold text-2xl mb-8">
                    {isOpen ? "MaxiAdmin" : "M"}
                </div>

                <nav>
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActive(item.id)}
                            className={`flex items-center gap-3 py-3 w-full hover:bg-[#2f612f] transition
                                ${active === item.id ? "bg-[#2f612f]" : ""}
                                ${isOpen ? "px-6" : "justify-center"}`}
                        >
                            {item.icon}
                            {isOpen && <span>{item.label}</span>}
                        </button>
                    ))}
                </nav>
            </div>

            <div className={`${isOpen ? "px-6" : "items-center"} flex flex-col space-y-3`}>
                <button
                    onClick={onLogout}
                    className={`flex items-center gap-2 py-2 hover:bg-[#2f612f] rounded-lg transition w-full
                        ${isOpen ? "px-3" : "justify-center"}`}
                >
                    <LogOut size={20} />
                    {isOpen && <span>Salir</span>}
                </button>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`flex items-center gap-2 py-2 hover:bg-[#2f612f] rounded-lg transition w-full
                        ${isOpen ? "px-3" : "justify-center"}`}
                >
                    <Menu size={22} />
                    {isOpen && <span>Menú</span>}
                </button>
            </div>
        </motion.aside>
    );
}
