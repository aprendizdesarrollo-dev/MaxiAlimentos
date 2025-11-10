import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import { Phone, Mail, MapPin, Briefcase, GraduationCap } from "lucide-react";

import Personal from "../components/Perfil/Personal";
import Trabajo from "../components/Perfil/Trabajo";
import Capacitaciones from "../components/Perfil/Capacitaciones";
import Certificaciones from "../components/Perfil/Certificaciones";
import Vacaciones from "../components/Perfil/Vacaciones";
import Emergencias from "../components/Perfil/Emergencias";

export default function Perfil() {
    const [user, setUser] = useState(null);
    const [perfil, setPerfil] = useState({});
    const [activeTab, setActiveTab] = useState("personal");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const [userRes, perfilRes] = await Promise.all([
                    api.get("/me", { headers: { Authorization: `Bearer ${token}` } }),
                    api.get("/perfil", { headers: { Authorization: `Bearer ${token}` } }),
                ]);
                if (userRes.data.user) setUser(userRes.data.user);
                if (perfilRes.data.success) setPerfil(perfilRes.data.data);
            } catch (error) {
                console.error("Error al cargar perfil:", error);
                toast.error("Error al cargar los datos del perfil.");
            }
        };
        fetchData();
    }, []);

    if (!user)
        return (
            <div className="flex justify-center items-center h-screen text-[#397C3C] font-semibold">
                Cargando información del perfil...
            </div>
        );

    const renderContent = () => {
        switch (activeTab) {
            case "personal":
                return <Personal perfil={perfil} user={user} />;
            case "trabajo":
                return <Trabajo perfil={perfil} user={user} />;
            case "capacitaciones":
                return <Capacitaciones perfil={perfil} />;
            case "certificaciones":
                return <Certificaciones perfil={perfil} />;
            case "vacaciones":
                return <Vacaciones perfil={perfil} />;
            case "emergencias":
                return <Emergencias perfil={perfil} />;
            default:
                return null;
        }
    };

    return (
        <div className="flex-1 bg-[#f6f6f6] min-h-screen py-10 px-8 overflow-y-auto">
            <div className="w-full max-w-9xl mx-auto">
                {/* === ENCABEZADO === */}
                <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-5">
                        <img
                            src={
                                user.foto
                                    ? `${import.meta.env.VITE_API_URL}/storage/${user.foto}`
                                    : `https://ui-avatars.com/api/?name=${user.nombre}&background=397C3C&color=fff`
                            }
                            alt="Foto perfil"
                            className="w-24 h-24 rounded-xl border-4 border-[#397C3C] object-cover"
                        />
                        <div>
                            <h1 className="text-2xl font-bold text-[#397C3C]">
                                {user.nombre} {user.apellido}
                            </h1>
                            <p className="text-gray-600">{user.cargo || "Empleado"}</p>
                            <p className="text-sm text-gray-500">
                                {user.area || "Área no asignada"}
                            </p>
                        </div>
                    </div>

                    <div className="text-right text-sm text-gray-500">
                        <p className="font-medium text-[#397C3C]">Área de {user.area}</p>
                        <p>Última actualización: {new Date().toLocaleDateString()}</p>
                    </div>
                </div>

                {/* === CUERPO PRINCIPAL === */}
                <div className="grid lg:grid-cols-[320px_1fr] gap-8">
                    {/* PANEL IZQUIERDO — ESTILO VITALS */}
                    <div className="bg-white rounded-2xl shadow-sm p-6 text-sm text-gray-700 space-y-5 w-full">
                        {/* Encabezado */}
                        <h2 className="text-base font-semibold text-[#397C3C] mb-4">Información</h2>

                        {/* Datos principales */}
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2">
                                <Phone size={16} className="text-[#397C3C]" />
                                {perfil.telefono || "3028299227"}
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail size={16} className="text-[#397C3C]" />
                                {user.correo || "admin@maxialimentos.com"}
                            </li>
                            <li className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#397C3C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3" />
                                </svg>
                                {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} hora local
                            </li>
                            <li className="flex items-center gap-2">
                                <MapPin size={16} className="text-[#397C3C]" />
                                {perfil.ciudad || "Bogotá Office"}
                            </li>
                            <li className="flex items-center gap-2">
                                <Briefcase size={16} className="text-[#397C3C]" />
                                {user.cargo || "Aprendiz SENA"}
                            </li>
                            <li className="flex items-center gap-2">
                                <GraduationCap size={16} className="text-[#397C3C]" />
                                {user.area || "IT"}
                            </li>
                            <li className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#397C3C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                </svg>
                                MaxiAlimentos S.A.S
                            </li>
                            <li className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#397C3C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v8m-4-4h8" />
                                </svg>
                                {perfil.jefe_directo
                                    ? `Jefe directo: ${perfil.jefe_directo}`
                                    : "Jefe directo no asignado"}
                            </li>
                        </ul>

                        <hr className="border-gray-200 my-4" />

                        {/* Fecha de contratación */}
                        <div>
                            <h3 className="text-base font-semibold text-[#397C3C] mb-2">
                                Fecha de contratación
                            </h3>
                            <p className="text-gray-700">
                                {perfil.fecha_contratacion || "1 jul 2025"}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                {perfil.fecha_contratacion
                                    ? "Hace " + Math.floor((Date.now() - new Date(perfil.fecha_contratacion)) / (1000 * 60 * 60 * 24 * 30)) + " meses"
                                    : "4m - 5d"}
                            </p>
                        </div>
                    </div>

                    {/* PANEL DERECHO (PESTAÑAS Y CONTENIDO) */}
                    <div>
                        {/* PESTAÑAS */}
                        <div className="flex flex-wrap gap-8 border-b border-gray-300 mb-6">
                            {[
                                { id: "personal", label: "Personal" },
                                { id: "trabajo", label: "Trabajo" },
                                { id: "capacitaciones", label: "Capacitaciones" },
                                { id: "certificaciones", label: "Certificaciones" },
                                { id: "vacaciones", label: "Vacaciones" },
                                { id: "emergencias", label: "Emergencias" },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`pb-3 text-sm font-medium transition border-b-2 ${activeTab === tab.id
                                            ? "border-[#397C3C] text-[#397C3C]"
                                            : "border-transparent text-gray-500 hover:text-[#397C3C]"
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* CONTENIDO ACTIVO */}
                        <div className="bg-white rounded-2xl shadow-sm p-6">
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
