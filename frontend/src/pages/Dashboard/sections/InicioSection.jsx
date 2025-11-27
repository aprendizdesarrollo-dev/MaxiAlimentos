import Header from "../layout/Header";
import DashboardCard from "../../../components/Dashboard/DashboardCard";
import BeneficiosCard from "../../../components/Beneficios/BeneficiosCard";
import CumpleaniosCard from "../../../components/Cumpleanios/CumpleaniosCard";
import EventosCarousel from "../../../components/Evento/EventoCarousel";
import { motion } from "framer-motion";
import { UserCheck, FileText, CalendarDays, LayoutDashboard } from "lucide-react";


export default function InicioSection({
    user,
    stats,
    beneficios,
    cumpleData,
    comunicados,
    onVerMasCumple,
    onVerMasBeneficios,
    setActive,
    onEventosChange
}) {

    return (
        <div className="space-y-10">

            {/* HEADER PREMIUM */}
            <Header
                user={user}
                onConfigClick={() => setActive("config")}
                onPerfilClick={() => setActive("perfil")}
            />

            {/* WIDGETS SUPERIORES */}
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-5">

                {/* Widget 1 */}
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

                {/* Widget 2 */}
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

                {/* Widget 3 */}
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

                {/* Widget 4 */}
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
            </section>

            {/* CONTENIDO PRINCIPAL */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* IZQUIERDA */}
                <div className="flex flex-col gap-6">

                    <DashboardCard className="!p-4">
                        <BeneficiosCard
                            beneficios={beneficios}
                            onVerMas={onVerMasBeneficios}
                        />
                    </DashboardCard>

                    <DashboardCard className="!p-4">
                        <CumpleaniosCard
                            data={cumpleData}
                            onVerMas={onVerMasCumple}
                        />
                    </DashboardCard>

                    <DashboardCard title="Mensajes Recientes">
                        <p className="text-gray-600">No hay mensajes nuevos.</p>
                    </DashboardCard>
                </div>

                {/* DERECHA */}
                <div className="col-span-2 flex flex-col gap-6">

                    <DashboardCard>
                        <EventosCarousel onChange={onEventosChange} />
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
