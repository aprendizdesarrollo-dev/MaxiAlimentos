import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { motion } from "framer-motion";
import {
    Home,
    Users,
    FileText,
    Settings,
    Menu,
    LogOut,
    FolderOpen,
    BookOpen,
    ClipboardList,
    BarChart3,
} from "lucide-react";

// Componentes de secciones
function AdminHome() {
    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold text-[#397C3C] mb-3">
                Panel General
            </h2>
            <p className="text-gray-600 mb-6">
                Bienvenido al panel de administración. Aquí verás los resúmenes de actividad y accesos rápidos.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow p-6 text-center hover:shadow-md transition">
                    <h3 className="font-semibold text-[#397C3C] mb-2">Usuarios activos</h3>
                    <p className="text-gray-600 text-sm">Gestión de personal y accesos.</p>
                </div>
                <div className="bg-white rounded-xl shadow p-6 text-center hover:shadow-md transition">
                    <h3 className="font-semibold text-[#397C3C] mb-2">Comunicados</h3>
                    <p className="text-gray-600 text-sm">Publica comunicados internos fácilmente.</p>
                </div>
                <div className="bg-white rounded-xl shadow p-6 text-center hover:shadow-md transition">
                    <h3 className="font-semibold text-[#397C3C] mb-2">Reportes</h3>
                    <p className="text-gray-600 text-sm">Visualiza métricas y logs del sistema.</p>
                </div>
            </div>
        </div>
    );
}

export default function AdminDashboard() {
    const [user, setUser] = useState(null);
    const [active, setActive] = useState("inicio");
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();

    // Obtener usuario autenticado
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get("/me");
                setUser(res.data.user);
            } catch (err) {
                localStorage.removeItem("token");
                navigate("/login");
            }
        };
        fetchUser();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await api.post("/logout");
        } catch { }
        localStorage.removeItem("token");
        navigate("/login");
    };

    if (!user)
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-600">
                Cargando...
            </div>
        );

    // Items del menú
    const menuItems = [
        { id: "inicio", label: "Inicio", icon: <Home size={20} /> },
        { id: "comunicados", label: "Comunicados", icon: <FileText size={20} /> },
        { id: "directorio", label: "Directorio", icon: <Users size={20} /> },
        { id: "documentos", label: "Documentos", icon: <FolderOpen size={20} /> },
        { id: "mesa", label: "Mesa de ayuda", icon: <ClipboardList size={20} /> },
        { id: "reportes", label: "Reportes", icon: <BarChart3 size={20} /> },
        { id: "config", label: "Configuración", icon: <Settings size={20} /> },
    ];

    // Render dinámico del contenido
    const renderSection = () => {
        switch (active) {
            case "inicio":
                return <AdminHome />;
            case "comunicados":
                return <div className="p-6 text-gray-700">Gestión de comunicados internos.</div>;
            case "directorio":
                return <div className="p-6 text-gray-700">Listado y búsqueda de empleados.</div>;
            case "documentos":
                return <div className="p-6 text-gray-700">Gestor documental.</div>;
            case "mesa":
                return <div className="p-6 text-gray-700">Sistema de tickets y soporte técnico.</div>;
            case "reportes":
                return <div className="p-6 text-gray-700">Visualización de reportes.</div>;
            case "config":
                return <div className="p-6 text-gray-700">Ajustes y roles del sistema.</div>;
            default:
                return <AdminHome />;
        }
    };

    return (
        <div className="flex min-h-screen bg-[#f6f6f6]">
            {/* Sidebar */}
            <motion.aside
                animate={{ width: isOpen ? 230 : 80 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="bg-[#397C3C] text-white flex flex-col py-6 relative"
            >
                {/* Logo */}
                <div className="text-center mb-10 font-bold text-2xl">
                    {isOpen ? "MaxiAdmin" : "M"}
                </div>

                {/* Menú principal */}
                <nav className="flex flex-col space-y-2 mt-2">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActive(item.id)}
                            className={`flex items-center gap-3 px-4 py-3 hover:bg-[#2f612f] transition ${active === item.id ? "bg-[#2f612f]" : ""
                                }`}
                        >
                            {item.icon}
                            {isOpen && <span className="text-sm">{item.label}</span>}
                        </button>
                    ))}
                </nav>

                {/* Logout */}
                <div className="mt-auto flex flex-col items-center pb-12">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 hover:bg-[#2f612f] px-4 py-2 rounded-lg transition"
                    >
                        <LogOut size={18} />
                        {isOpen && <span className="text-sm">Salir</span>}
                    </button>

                    {/* Botón hamburguesa */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="mt-6 p-3 hover:bg-[#2f612f] rounded-lg transition flex items-center justify-center"
                        title="Abrir / cerrar menú"
                    >
                        <Menu size={22} />
                    </button>
                </div>
            </motion.aside>

            {/* Contenido */}
            <main className="flex-1 p-6">
                <header className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-[#397C3C]">
                            Hola, {user.nombre?.split(" ")[0]}
                        </h1>
                        <p className="text-gray-600 text-sm">
                            {user.cargo} — {user.area}
                        </p>
                    </div>
                    <img
                        src={`https://ui-avatars.com/api/?name=${user.nombre}&background=397C3C&color=fff`}
                        alt="avatar"
                        className="w-12 h-12 rounded-full border-2 border-[#397C3C]"
                    />
                </header>

                {/* Aquí cambia el contenido dinámicamente */}
                {renderSection()}
            </main>
        </div>
    );
}
