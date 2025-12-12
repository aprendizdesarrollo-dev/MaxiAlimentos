// src/pages/Dashboard/ColaboradorDashboard/sections/InicioEmpleado.jsx

import DashboardCard from "../../../../../components/Dashboard/DashboardCard";
import BeneficiosCard from "../../../../../components/Beneficios/BeneficiosCard";
import CumpleaniosCard from "../../../../../components/Cumpleanios/CumpleaniosCard";
import EventoCarousel from "../../../../../components/Evento/EventoCarousel";

import { useEmpleadoData } from "../hooks/useEmpleadoData";

export default function InicioEmpleado({ user }) {

    const { beneficios, eventos, comunicados } = useEmpleadoData();

    return (
        <div className="space-y-8">

            {/* CONTENIDO PRINCIPAL */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* COLUMNA IZQUIERDA */}
                <div className="flex flex-col gap-6">

                    {/* BENEFICIOS */}
                    <DashboardCard className="!p-4">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">
                            Beneficios Disponibles
                        </h2>

                        <BeneficiosCard beneficios={beneficios} limite={3} soloLectura />
                    </DashboardCard>

                    {/* CUMPLEAÑOS */}
                    <DashboardCard className="!p-4">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">
                            Cumpleaños del mes
                        </h2>

                        <CumpleaniosCard data={[]} soloLectura />
                    </DashboardCard>

                </div>

                {/* COLUMNA DERECHA */}
                <div className="col-span-2 flex flex-col gap-6">

                    {/* EVENTOS */}
                    <DashboardCard>
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">
                            Eventos próximos
                        </h2>

                        <EventoCarousel eventos={eventos} />
                    </DashboardCard>

                    {/* COMUNICADOS */}
                    <DashboardCard>
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">
                            Comunicados recientes
                        </h2>

                        {comunicados.slice(0, 4).map((c) => (
                            <div key={c.id} className="border-b py-3">
                                <p className="font-semibold text-gray-700">{c.titulo}</p>
                                <p className="text-gray-500 text-sm">{c.fecha}</p>
                            </div>
                        ))}

                        {comunicados.length === 0 && (
                            <p className="text-gray-500">No hay comunicados disponibles.</p>
                        )}
                    </DashboardCard>
                </div>

            </div>
        </div>
    );
}
