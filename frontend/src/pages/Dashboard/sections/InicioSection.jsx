import Header from "../layout/Header";
import DashboardCard from "../../../components/Dashboard/DashboardCard";
import BeneficiosCard from "../../../components/Beneficios/BeneficiosCard";
import CumpleaniosCard from "../../../components/Cumpleanios/CumpleaniosCard";
import EventoCarousel from "../../../components/Evento/EventoCarousel";
import { motion } from "framer-motion";
import { UserCheck, FileText, MessageSquare, CalendarDays, LayoutDashboard } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import useMensajes from "../../Mensajes/hooks/useMensajes";
import MensajesCard from "./MensajesCard";


export default function InicioSection({
    user,
    stats,
    beneficios,
    cumpleData,
    comunicados,
    onVerMasCumple,
    onVerMasBeneficios,
    setActive,
    onEventosChange,
    modeAdmin = true,
}) {

    return (
        <div className="space-y-10">

            {/* HEADER PREMIUM */}
            <Header
                user={user}
                onConfigClick={() => setActive("config")}
                onPerfilClick={() => setActive("perfil")}
            />

            {/* CONTENIDO PRINCIPAL */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* IZQUIERDA */}
                <div className="flex flex-col gap-6">

                    <DashboardCard className="!p-4">
                        <BeneficiosCard
                            beneficios={beneficios}
                            onVerMas={onVerMasBeneficios}
                            modoAdmin={true}
                        />
                    </DashboardCard>

                    <DashboardCard className="!p-4">
                        <CumpleaniosCard
                            data={cumpleData}
                            onVerMas={onVerMasCumple}
                        />
                    </DashboardCard>

                    <DashboardCard>
                        <MensajesCard onVerMas={() => setActive("mensajes")} />
                    </DashboardCard>
                </div>

                {/* DERECHA */}
                <div className="col-span-2 flex flex-col gap-6">

                    <DashboardCard>
                        <EventoCarousel
                            modoAdmin={true}
                            onCrear={() => (window.location.href = "/crear-evento")}
                        />

                    </DashboardCard>

                    <DashboardCard
                        title={
                            <div className="flex items-center gap-2 text-[#397C3C] font-semibold text-lg">
                                <FileText size={22} />
                                <span>Comunicados Recientes</span>
                            </div>
                        }
                        className="flex-1"
                    >
                        <div className="min-h-[260px] max-h-[260px] overflow-y-auto pr-2 space-y-6">
                            {comunicados?.length > 0 ? (
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
}    
