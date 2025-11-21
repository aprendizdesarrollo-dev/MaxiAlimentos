import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Megaphone } from "lucide-react";
import api from "../../services/api";
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
    Link2,
    UserCircle,
    UserCheck,
    CalendarDays,
    LayoutDashboard
} from "lucide-react";
import { motion } from "framer-motion";
import DashboardCard from "../../components/Dashboard/DashboardCard";
import EventosCarousel from "../../components/Evento/EventosCarousel";
import ComunicadosDashboard from "../../components/Comunicados/ComunicadosDashboard";
import DirectorioDashboard from "../Directorio/DirectorioDashboard";
import Perfil from "../Perfil/PerfilDashboard";
import CumpleaniosCard from "../../components/Cumpleanios/CumpleaniosCard";
import CumpleaniosModal from "../../components/Cumpleanios/CumpleaniosModal";
import BeneficiosCard from "../../components/Beneficios/BeneficiosCard";
import BeneficiosModal from "../../components/Beneficios/BeneficiosModal";



export default function AdminDashboard() {
    const [beneficios, setBeneficios] = useState([]);
    const [cargandoBeneficio, setCargandoBeneficio] = useState(false);
    const [showModalBeneficios, setShowModalBeneficios] = useState(false);
    const [showFormBeneficio, setShowFormBeneficio] = useState(false);
    const [user, setUser] = useState(null);
    const [active, setActive] = useState("inicio");
    const [isOpen, setIsOpen] = useState(true);
    const [comunicados, setComunicados] = useState([]);
    const [showModalCumple, setShowModalCumple] = useState(false);
    const [cumpleData, setCumpleData] = useState(null);
    const [stats, setStats] = useState(null);

    // Cargar beneficios
    useEffect(() => {
        const loadBeneficios = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await api.get("/beneficios", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setBeneficios(res.data.data || []);
            } catch (error) {
                console.error("Error cargando beneficios:", error);
            }
        };
        loadBeneficios();
    }, []);


    const loadStats = async () => {
        try {
            const res = await api.get("/dashboard-estadisticas");
            setStats(res.data);
        } catch (err) {
            console.error("Error cargando estadísticas:", err);
        }
    };


    useEffect(() => {
        loadStats();
    }, []);

    // Crear beneficio
    const crearBeneficio = async (formData) => {
        try {
            setCargandoBeneficio(true);

            const res = await api.post("/beneficios", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res.data.success) {
                setBeneficios(prev => [...prev, res.data.data]);
            }
        } catch (err) {
            console.error(err);
            alert("Error creando beneficio.");
        } finally {
            setCargandoBeneficio(false);
        }
    };

    // Editar beneficio
    const editarBeneficio = async (id, formData) => {
        try {
            setCargandoBeneficio(true);

            // IMPORTANTÍSIMO
            formData.append("_method", "PUT");

            const res = await api.post(`/beneficios/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res.data.success) {
                setBeneficios(prev =>
                    prev.map(b => (b.id === id ? res.data.data : b))
                );
            }
        } catch (err) {
            console.error(err);
            alert("Error editando beneficio.");
        } finally {
            setCargandoBeneficio(false);
        }
    };

    // Eliminar beneficio
    const eliminarBeneficio = async (id) => {
        try {
            setCargandoBeneficio(true);
            await api.delete(`/beneficios/${id}`);
            setBeneficios(prev => prev.filter(b => b.id !== id));
        } catch (err) {
            alert("Error eliminando beneficio.");
        } finally {
            setCargandoBeneficio(false);
        }
    };

    // =======================
    // WIDGETS SUPERIORES
    // =======================
    const widgets = (
        <>
            <motion.div
                whileHover={{ scale: 1.03 }}
                className="bg-white shadow-md rounded-2xl p-5 flex flex-col gap-2 border-l-4 border-[#397C3C]"
            >
                <UserCheck className="text-[#397C3C]" size={26} />
                <p className="text-gray-600 text-sm">Empleados activos</p>
                <h3 className="text-2xl font-bold text-[#397C3C]">
                    {stats ? stats.empleados_activos : "..."}
                </h3>
            </motion.div>

            <motion.div
                whileHover={{ scale: 1.03 }}
                className="bg-white shadow-md rounded-2xl p-5 flex flex-col gap-2 border-l-4 border-[#5bad5c]"
            >
                <FileText className="text-[#397C3C]" size={26} />
                <p className="text-gray-600 text-sm">Comunicados este mes</p>
                <h3 className="text-2xl font-bold text-[#397C3C]">
                    {stats ? stats.comunicados_mes : "..."}
                </h3>
            </motion.div>

            <motion.div
                whileHover={{ scale: 1.03 }}
                className="bg-white shadow-md rounded-2xl p-5 flex flex-col gap-2 border-l-4 border-[#397C3C]"
            >
                <CalendarDays className="text-[#397C3C]" size={26} />
                <p className="text-gray-600 text-sm">Eventos activos</p>
                <h3 className="text-2xl font-bold text-[#397C3C]">
                    {stats ? stats.eventos_activos : "..."}
                </h3>
            </motion.div>

            <motion.div
                whileHover={{ scale: 1.03 }}
                className="bg-white shadow-md rounded-2xl p-5 flex flex-col gap-2 border-l-4 border-[#5bad5c]"
            >
                <LayoutDashboard className="text-[#397C3C]" size={26} />
                <p className="text-gray-600 text-sm">Módulos del sistema</p>
                <h3 className="text-2xl font-bold text-[#397C3C]">
                    {stats ? stats.modulos : "..."}
                </h3>
            </motion.div>
        </>
    );



    /* ----------------------------------------------
       Cargar usuario autenticado
    ------------------------------------------------ */
    useEffect(() => {
        const loadUser = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await api.get("/perfil", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (res.data?.data) {
                    setUser(res.data.data);
                }
            } catch {
                localStorage.removeItem("token");
                navigate("/login");
            }
        };
        loadUser();
    }, []);

    /* ----------------------------------------------
       Cargar comunicados recientes
    ------------------------------------------------ */
    useEffect(() => {
        const loadComunicados = async () => {
            try {
                const res = await api.get("/comunicados");
                setComunicados(res.data.data || []);
            } catch {
                setComunicados([]);
            }
        };
        loadComunicados();
    }, []);

    /* ----------------------------------------------
       Abrir modal de cumpleaños
    ------------------------------------------------ */
    const abrirModalCumple = () => {
        api.get("/cumpleanios").then((res) => {
            setCumpleData(res.data);
            setShowModalCumple(true);
        });
    };

    /* ----------------------------------------------
       Logout
    ------------------------------------------------ */
    const handleLogout = async () => {
        try {
            await api.post("/logout");
        } catch { }
        localStorage.removeItem("token");
        navigate("/login");
    };

    /* ----------------------------------------------
           Cumpleaños y aniversarios
        ------------------------------------------------ */
    // Cargar información de cumpleaños y aniversarios
    useEffect(() => {
        const loadCumple = async () => {
            try {
                const res = await api.get("/cumpleanios");
                setCumpleData(res.data);
            } catch (err) {
                console.error("Error al obtener cumpleanios:", err);
            }
        };

        loadCumple();
    }, []);



    /* ----------------------------------------------
       Verificación de rol
    ------------------------------------------------ */
    if (user?.rol !== "Administrador") return null;


    /* ----------------------------------------------
       Menú lateral
    ------------------------------------------------ */
    const menuItems = [
        { id: "inicio", label: "Inicio", icon: <Home size={20} /> },
        { id: "comunicados", label: "Comunicados", icon: <FileText size={20} /> },
        { id: "directorio", label: "Directorio", icon: <Users size={20} /> },
        { id: "documentos", label: "Documentos", icon: <FolderOpen size={20} /> },
        { id: "mesa", label: "Mesa de ayuda", icon: <ClipboardList size={20} /> },
        { id: "reportes", label: "Reportes", icon: <BarChart3 size={20} /> },
        { id: "config", label: "Configuración", icon: <Settings size={20} /> },
        { id: "perfil", label: "Perfil", icon: <UserCircle size={20} /> },
    ];





    /* ----------------------------------------------
       Contenido dinámico del dashboard
    ------------------------------------------------ */
    const renderSection = () => {
        switch (active) {
            case "inicio":
                return (
                    <div className="space-y-10">

                        {/* Encabezado Premium */}
                        <section className="
                rounded-3xl p-8 bg-gradient-to-r 
                from-[#397C3C] to-[#5bad5c] 
                text-white shadow-xl 
                relative overflow-hidden">

                            <div className="absolute right-5 top-5 opacity-20">
                                <Users size={120} />
                            </div>

                            <div className="relative z-10 flex justify-between items-center">
                                <div className="flex items-center gap-6">
                                    <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-white shadow-md">
                                        {user?.foto_perfil ? (
                                            <img
                                                src={
                                                    user.foto_perfil.startsWith("http")
                                                        ? user.foto_perfil
                                                        : `http://127.0.0.1:8000/storage/${user.foto_perfil}`
                                                }
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-gray-100">Avatar</span>
                                        )}
                                    </div>

                                    <div>
                                        <h1 className="text-4xl font-extrabold">
                                            Bienvenido, {user.nombre}
                                        </h1>

                                        <p className="text-lg opacity-90">{user.cargo}</p>

                                        <button
                                            onClick={() => setActive("perfil")}
                                            className="
                                                    mt-3 
                                                    relative 
                                                    text-white font-semibold 
                                                    text-sm 
                                                    transition-all 
                                                    hover:text-white 
                                                    pl-1
                                                    after:content-[''] 
                                                    after:absolute 
                                                    after:left-0 
                                                    after:bottom-[-3px] 
                                                    after:w-0 
                                                    after:h-[2px] 
                                                    after:bg-white 
                                                    after:transition-all 
                                                    after:duration-300 
                                                    hover:after:w-full
                                                    hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]
                                                "
                                        >
                                            Ver mi perfil →
                                        </button>

                                    </div>
                                </div>
                                {/* Resumen del día */}
                                <div className="text-right flex flex-col items-end gap-2">
                                    <p className="text-sm opacity-90">
                                        {new Date().toLocaleDateString("es-CO", {
                                            weekday: "long",
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </p>

                                    {/* Botón de configuración */}
                                    <button
                                        onClick={() => setActive("config")}
                                        className="
                                            flex items-center gap-2 
                                            bg-white/20 
                                            hover:bg-white/30 
                                            text-white 
                                            text-sm 
                                            font-medium 
                                            px-4 py-2 
                                            rounded-full 
                                            border border-white/30 
                                            transition
                                        ">
                                        <Settings size={16} />
                                        Configuración
                                    </button>
                                </div>

                            </div>
                        </section>


                        {/* WIDGETS */}
                        <section className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                            {widgets}
                        </section>

                        {/* CONTENIDO PRINCIPAL */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                            {/* IZQUIERDA */}
                            <div className="flex flex-col gap-6">

                                <DashboardCard className="!p-4">
                                    <BeneficiosCard
                                        beneficios={beneficios}
                                        onVerMas={() => setShowModalBeneficios(true)}
                                    />
                                </DashboardCard>

                                <DashboardCard className="!p-4">
                                    <CumpleaniosCard
                                        data={cumpleData}
                                        onVerMas={abrirModalCumple}
                                    />
                                </DashboardCard>

                                <DashboardCard title="Mensajes Recientes">
                                    <p className="text-gray-600">No hay mensajes nuevos.</p>
                                </DashboardCard>
                            </div>

                            {/* DERECHA */}
                            <div className="col-span-2 flex flex-col gap-6">
                                <DashboardCard>
                                    <EventosCarousel onChange={loadStats} />
                                </DashboardCard>

                                <DashboardCard
                                    title={
                                        <div className="flex items-center gap-2 text-[#397C3C] font-semibold text-lg">
                                            <FileText size={22} className="text-[#397C3C]" />
                                            <span>Comunicados Recientes</span>
                                        </div>
                                    }
                                    className="flex-1"
                                >
                                    <div className="min-h-[260px] max-h-[260px] overflow-y-auto pr-2 space-y-6">
                                        {comunicados.length > 0 ? (
                                            comunicados.map((com, index) => (
                                                <div key={index} className="pb-4 border-b border-gray-200">
                                                    <p className="text-[#397C3C] font-semibold text-[15px] mb-1">
                                                        {com.titulo}
                                                    </p>

                                                    <p className="text-gray-400 text-xs mb-1">
                                                        {new Date(com.created_at).toLocaleDateString("es-CO", {
                                                            weekday: "long",
                                                            day: "numeric",
                                                            month: "long",
                                                            year: "numeric",
                                                        })}
                                                    </p>

                                                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                                                        {com.mensaje}
                                                    </p>

                                                    <button
                                                        onClick={() => setActive("comunicados")}
                                                        className="text-[#397C3C] text-sm font-medium hover:underline"
                                                    >
                                                        Ver más →
                                                    </button>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-500 text-sm text-center py-3">
                                                No hay comunicados recientes.
                                            </p>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => setActive("comunicados")}
                                        className="bg-[#397C3C] mt-6 flex items-center justify-center gap-2 text-white px-5 py-3 rounded-lg hover:bg-[#2f612f] transition w-full text-sm font-medium"
                                    >
                                        <FileText size={18} /> Ver todos los comunicados
                                    </button>
                                </DashboardCard>
                            </div>
                        </div>
                    </div>
                );

            case "comunicados":
                return <ComunicadosDashboard />;

            case "perfil":
                return <Perfil />;

            case "directorio":
                return <DirectorioDashboard />;

            default:
                return null;
        }
    };


    /* ----------------------------------------------
       Render principal
    ------------------------------------------------ */
    return (
        <div className="flex min-h-screen bg-[#f6f6f6] overflow-hidden">

            {/* Sidebar */}
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
                        onClick={handleLogout}
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

            {/* Contenido */}
            <main className={`flex-1 p-10 transition-all ${isOpen ? "ml-[230px]" : "ml-[80px]"}`}>
                {renderSection()}

                {/* Modal Cumpleaños */}
                {showModalCumple && (
                    <CumpleaniosModal
                        data={cumpleData}
                        onClose={() => setShowModalCumple(false)}
                    />
                )}
                {/* Modal Beneficios */}
                {showModalBeneficios && (
                    <BeneficiosModal
                        data={beneficios}
                        onClose={() => setShowModalBeneficios(false)}
                        onCreate={crearBeneficio}
                        onEdit={editarBeneficio}
                        onDelete={eliminarBeneficio}
                        cargando={cargandoBeneficio}
                    />
                )}
            </main>
        </div>
    );
}
