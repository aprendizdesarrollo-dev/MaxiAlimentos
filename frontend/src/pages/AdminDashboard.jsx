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
    ClipboardList,
    BarChart3,
    PlusCircle,
    X,
    Link2,
    Gift,
} from "lucide-react";
import DashboardCard from "../components/DashboardCard";
import EventosCarousel from "../components/EventosCarousel";

/**
 * ADMIN DASHBOARD - MAXIALIMENTOS
 * Estructura general del panel de administrador con:
 * - Sidebar animada
 * - Sección de bienvenida y perfil
 * - Carrusel dinámico de eventos
 * - Tarjetas tipo “Bring IT” con acciones
 * - Modal para crear comunicados internos
 */

export default function AdminDashboard() {
    const [user, setUser] = useState(null);
    const [active, setActive] = useState("inicio");
    const [isOpen, setIsOpen] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [newComunicado, setNewComunicado] = useState({ titulo: "", mensaje: "" });
    const [preview, setPreview] = useState("");
    const navigate = useNavigate();

    /** ==============================
     * 1️⃣ FETCH USER DATA
     * ============================== */
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get("/me");
                setUser(res.data.user);
            } catch {
                localStorage.removeItem("token");
                navigate("/login");
            }
        };
        fetchUser();
    }, [navigate]);

    /** ==============================
     * 2️⃣ HANDLE LOGOUT
     * ============================== */
    const handleLogout = async () => {
        try {
            await api.post("/logout");
        } catch { }
        localStorage.removeItem("token");
        navigate("/login");
    };

    /** ==============================
     * 3️⃣ CREATE COMUNICADO
     * ============================== */
    const handleCreateComunicado = async (e) => {
        e.preventDefault();
        try {
            await api.post("/comunicados", newComunicado);
            setShowModal(false);
            setNewComunicado({ titulo: "", mensaje: "" });
            alert("Comunicado publicado correctamente");
        } catch (err) {
            alert("Error al crear comunicado");
        }
    };

    /** ==============================
     * 4️⃣ CAMBIO DE FOTO DE PERFIL
     * ============================== */
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    if (!user) return null;

    /** ==============================
     * 5️⃣ MENÚ LATERAL
     * ============================== */
    const menuItems = [
        { id: "inicio", label: "Inicio", icon: <Home size={20} /> },
        { id: "comunicados", label: "Comunicados", icon: <FileText size={20} /> },
        { id: "directorio", label: "Directorio", icon: <Users size={20} /> },
        { id: "documentos", label: "Documentos", icon: <FolderOpen size={20} /> },
        { id: "mesa", label: "Mesa de ayuda", icon: <ClipboardList size={20} /> },
        { id: "reportes", label: "Reportes", icon: <BarChart3 size={20} /> },
        { id: "config", label: "Configuración", icon: <Settings size={20} /> },
    ];

    /** ==============================
     * 6️⃣ SECCIONES DEL DASHBOARD
     * ============================== */
    const renderSection = () => {
        switch (active) {
            /** --- SECCIÓN INICIO --- */
            case "inicio":
                return (
                    <div className="space-y-10">
                        {/* --- Encabezado superior tipo cápsula --- */}
                        <section className="bg-white shadow-md rounded-full px-10 py-7 flex justify-between items-center">
                            {/* Izquierda: Foto e información */}
                            <div className="flex items-center gap-8">
                                <img
                                    src={
                                        preview ||
                                        user.foto ||
                                        `https://ui-avatars.com/api/?name=${user.nombre}&background=397C3C&color=fff`
                                    }
                                    alt="avatar"
                                    className="w-24 h-24 rounded-2xl object-cover shadow-md border-2 border-[#397C3C]"
                                />

                                <div className="flex flex-col">
                                    <h1 className="text-3xl font-extrabold text-[#397C3C] leading-tight">
                                        Bienvenido, {user.nombre}
                                    </h1>
                                    <p className="text-gray-700 text-lg font-medium">
                                        {user.cargo || "Cargo no definido"}
                                    </p>
                                    <button
                                        onClick={() => navigate("/perfil")}
                                        className="text-[#397C3C] mt-1 text-sm font-semibold hover:underline w-fit transition"
                                    >
                                        Ver mi perfil →
                                    </button>
                                </div>
                            </div>

                            {/* Derecha: Fecha y configuración */}
                            <div className="flex flex-col items-end">
                                <p className="text-gray-600 text-sm font-medium mb-2">
                                    {new Date().toLocaleDateString("es-CO", {
                                        weekday: "long",
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </p>

                                <button className="flex items-center gap-2 text-[#397C3C] hover:text-[#2f612f] transition">
                                    <Settings size={22} />
                                    <span className="text-base font-medium">Configuración</span>
                                </button>
                            </div>
                        </section>

                        {/* --- Grid principal tipo BringIT --- */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                            {/* ---------------- IZQUIERDA ---------------- */}
                            <div className="col-span-1 flex flex-col gap-6 h-full">
                                <div className="flex flex-col justify-between flex-1">
                                    <DashboardCard title="Estado General" className="flex-1 min-h-[160px]">
                                        <BarChart3 className="text-[#397C3C] mb-3" size={36} />
                                        <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                                            Sistema funcionando correctamente. Última revisión hace 3 horas.
                                        </p>
                                        <button className="bg-[#397C3C] text-white px-5 py-2 rounded-lg hover:bg-[#2f612f] transition">
                                            Ver detalles
                                        </button>
                                    </DashboardCard>
                                </div>

                                <div className="flex flex-col justify-between flex-1">
                                    <DashboardCard title="Cumpleaños y Aniversarios" className="flex-1 min-h-[160px]">
                                        <Gift className="text-[#397C3C] mb-3" size={36} />
                                        <ul className="text-gray-700 space-y-2">
                                            <li>🎉 <strong>Andrea López</strong> - 6 de noviembre</li>
                                            <li>🎊 <strong>Carlos Jiménez</strong> - 10 años en la empresa</li>
                                            <li>🎂 <strong>Valeria Torres</strong> - 12 de noviembre</li>
                                        </ul>
                                    </DashboardCard>
                                </div>

                                <div className="flex flex-col justify-between flex-1">
                                    <DashboardCard title="Mensajes Recientes" className="flex-1 min-h-[180px]">
                                        <ul className="space-y-3">
                                            <li className="flex items-center gap-3">
                                                <img src="https://i.pravatar.cc/40?u=1" className="w-8 h-8 rounded-full" />
                                                <div>
                                                    <p className="font-medium text-[#397C3C]">Laura Gómez</p>
                                                    <p className="text-sm text-gray-500">
                                                        ¿Confirmas la reunión de mañana?
                                                    </p>
                                                </div>
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <img src="https://i.pravatar.cc/40?u=2" className="w-8 h-8 rounded-full" />
                                                <div>
                                                    <p className="font-medium text-[#397C3C]">Andrés Rojas</p>
                                                    <p className="text-sm text-gray-500">
                                                        Ya subí el documento de control.
                                                    </p>
                                                </div>
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <img src="https://i.pravatar.cc/40?u=3" className="w-8 h-8 rounded-full" />
                                                <div>
                                                    <p className="font-medium text-[#397C3C]">Paola Martínez</p>
                                                    <p className="text-sm text-gray-500">
                                                        Se publicó el nuevo comunicado.
                                                    </p>
                                                </div>
                                            </li>
                                        </ul>
                                        <button className="text-[#397C3C] mt-3 text-sm hover:underline">
                                            Ver todos los mensajes →
                                        </button>
                                    </DashboardCard>
                                </div>
                            </div>

                            {/* ---------------- DERECHA: EVENTOS Y COMUNICADOS ---------------- */}
                            <div className="col-span-2 flex flex-col gap-6">
                                <DashboardCard title="" className="flex-1 min-h-[500px]">
                                    <EventosCarousel />
                                </DashboardCard>

                                <DashboardCard title="Comunicados Recientes" className="flex-1">
                                    <div className="space-y-4">
                                        <div className="border-b pb-3">
                                            <p className="text-[#397C3C] font-semibold">
                                                Nueva política de bienestar
                                            </p>
                                            <p className="text-gray-600 text-sm">
                                                Actualización de beneficios laborales y capacitaciones.
                                            </p>
                                        </div>
                                        <div className="border-b pb-3">
                                            <p className="text-[#397C3C] font-semibold">
                                                Reunión de Seguridad Industrial
                                            </p>
                                            <p className="text-gray-600 text-sm">
                                                Miércoles 6 de noviembre, planta San Martín.
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setShowModal(true)}
                                        className="bg-[#397C3C] mt-4 flex items-center gap-2 text-white px-5 py-2 rounded-lg hover:bg-[#2f612f] transition"
                                    >
                                        <PlusCircle size={18} /> Nuevo Comunicado
                                    </button>
                                </DashboardCard>
                            </div>
                        </div>
                        {/* ---------------- ABAJO ---------------- */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <DashboardCard title="Usuarios Activos">
                                <Users className="text-[#397C3C] mb-3" size={36} />
                                <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                                    Gestión de personal y accesos del sistema.
                                </p>
                                <button className="bg-[#397C3C] text-white px-5 py-2 rounded-lg hover:bg-[#2f612f] transition">
                                    Ver usuarios
                                </button>
                            </DashboardCard>

                            <DashboardCard title="Reportes del Sistema">
                                <BarChart3 className="text-[#397C3C] mb-3" size={36} />
                                <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                                    Visualiza métricas, logs y actividad general.
                                </p>
                                <button className="bg-[#397C3C] text-white px-5 py-2 rounded-lg hover:bg-[#2f612f] transition">
                                    Ver reportes
                                </button>
                            </DashboardCard>

                            <DashboardCard title="Enlaces de la Empresa">
                                <Link2 className="text-[#397C3C] mb-3" size={36} />
                                <ul className="text-[#397C3C] space-y-2 font-medium">
                                    <li className="hover:underline cursor-pointer">Manual Corporativo</li>
                                    <li className="hover:underline cursor-pointer">Calendario General</li>
                                    <li className="hover:underline cursor-pointer">Canal Ético</li>
                                </ul>
                            </DashboardCard>
                        </div>
                    </div>
                );
            /** --- SECCIÓN COMUNICADOS --- */
            case "comunicados":
                return (
                    <div className="bg-white rounded-2xl p-10 shadow-lg">
                        <h2 className="text-3xl font-bold text-[#397C3C] mb-4">
                            Comunicados internos
                        </h2>
                        <p className="text-gray-700 mb-6 text-lg">
                            Aquí podrás ver, editar o eliminar comunicados publicados.
                        </p>
                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-[#397C3C] flex items-center gap-2 text-white px-6 py-3 rounded-lg hover:bg-[#2f612f] transition"
                        >
                            <PlusCircle size={20} /> Agregar nuevo comunicado
                        </button>
                    </div>
                );

            /** --- SECCIONES EN DESARROLLO --- */
            default:
                return (
                    <div className="p-6 text-gray-700 text-lg">
                        Módulo en desarrollo...
                    </div>
                );
        }
    };











    /** ==============================
     * 7️⃣ ESTRUCTURA GENERAL DEL FRONT
     * ============================== */
    return (
        <div className="flex min-h-screen bg-[#f6f6f6] overflow-hidden">
            {/* ===== SIDEBAR IZQUIERDO ===== */}
            <motion.aside
                animate={{ width: isOpen ? 230 : 80 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="bg-[#397C3C] text-white flex flex-col justify-between py-6 fixed top-0 left-0 h-full z-50 shadow-xl"
            >
                {/* LOGO + MENÚ */}
                <div>
                    <div className="flex justify-center mb-8 font-bold text-2xl tracking-wide">
                        {isOpen ? "MaxiAdmin" : "M"}
                    </div>

                    <nav className="flex flex-col mt-2">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActive(item.id)}
                                className={`flex items-center gap-3 py-3 transition hover:bg-[#2f612f] ${active === item.id ? "bg-[#2f612f]" : ""
                                    } ${isOpen ? "px-6" : "justify-center"}`}
                            >
                                {item.icon}
                                {isOpen && <span className="text-sm">{item.label}</span>}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* OPCIONES INFERIORES */}
                <div
                    className={`flex flex-col ${isOpen ? "px-6" : "items-center"} space-y-3`}
                >
                    <button
                        onClick={handleLogout}
                        className={`flex items-center gap-2 w-full hover:bg-[#2f612f] py-2 rounded-lg transition ${isOpen ? "px-3" : "justify-center"
                            }`}
                    >
                        <LogOut size={20} />
                        {isOpen && <span className="text-sm">Salir</span>}
                    </button>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`flex items-center gap-2 w-full hover:bg-[#2f612f] py-2 rounded-lg transition ${isOpen ? "px-3" : "justify-center"
                            }`}
                    >
                        <Menu size={22} />
                        {isOpen && <span className="text-sm">Menú</span>}
                    </button>
                </div>
            </motion.aside>

            {/* ===== CONTENIDO PRINCIPAL ===== */}
            <main
                className={`flex-1 p-10 min-h-screen overflow-y-auto transition-all duration-300 ${isOpen ? "ml-[230px]" : "ml-[80px]"
                    }`}
            >
                <div className="space-y-10">{renderSection()}</div>
            </main>

            {/* ===== MODAL PARA NUEVO COMUNICADO ===== */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-2xl w-[500px] shadow-2xl relative">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                        >
                            <X size={20} />
                        </button>
                        <h2 className="text-3xl font-bold text-[#397C3C] mb-6">
                            Crear Comunicado
                        </h2>
                        <form onSubmit={handleCreateComunicado} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    Título
                                </label>
                                <input
                                    type="text"
                                    value={newComunicado.titulo}
                                    onChange={(e) =>
                                        setNewComunicado({ ...newComunicado, titulo: e.target.value })
                                    }
                                    className="w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-[#397C3C]"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    Mensaje
                                </label>
                                <textarea
                                    rows="4"
                                    value={newComunicado.mensaje}
                                    onChange={(e) =>
                                        setNewComunicado({ ...newComunicado, mensaje: e.target.value })
                                    }
                                    className="w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-[#397C3C]"
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-[#397C3C] text-white py-2 rounded-lg hover:bg-[#2f612f] transition"
                            >
                                Publicar comunicado
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
