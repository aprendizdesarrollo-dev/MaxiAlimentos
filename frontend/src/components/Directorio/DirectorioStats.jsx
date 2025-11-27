import {
  BarChart, Bar,
  PieChart, Pie,
  LineChart, Line,
  Tooltip, ResponsiveContainer,
  XAxis, YAxis, CartesianGrid,
  Cell
} from "recharts";

import { Users, Building2, ShieldCheck, UserCheck } from "lucide-react";


const DirectorioStats = ({ usuarios, busqueda, setBusqueda }) => {

  // Métricas principales
  const total = usuarios.length;
  const admins = usuarios.filter(u => u.rol === "Administrador").length;
  const colaboradores = total - admins;

  // Áreas
  const areas = [...new Set(usuarios.map(u => u.area))];
  const totalAreas = areas.length;

  const areasCount = areas.map(area => ({
    area,
    cantidad: usuarios.filter(u => u.area === area).length
  }));

  // Nuevos del mes (solo ejemplo con created_at)
  const mesActual = new Date().getMonth() + 1;
  const newMonthUsers = usuarios.filter(u => {
    if (!u.created_at) return false;
    return new Date(u.created_at).getMonth() + 1 === mesActual;
  }).length;

  const newUsersData = [
    { name: "Este mes", value: newMonthUsers },
    { name: "Total", value: total }
  ];

  return (
    <div className="bg-white border border-gray-200 shadow-md rounded-2xl p-6 mb-8">

      {/* ENCABEZADO */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-[#397C3C]/10 text-[#397C3C] rounded-2xl flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14c-4.418 0-8 2.015-8 4.5V21h16v-2.5c0-2.485-3.582-4.5-8-4.5z" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[#397C3C] leading-tight">Directorio de empleados</h1>
            <p className="text-gray-600 text-sm">Vista general del personal interno de MaxiAlimentos LTDA</p>
          </div>
        </div>

        {/* BUSCADOR */}
        <div className="relative w-full lg:w-72">
          <input
            type="text"
            placeholder="Buscar por nombre, área o cargo…"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full border border-gray-300 rounded-full py-2.5 pl-10 pr-4 text-sm 
            focus:outline-none focus:ring-2 focus:ring-[#397C3C] focus:border-transparent transition"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" />
          </svg>
        </div>
      </div>

      {/* TARJETAS PREMIUM */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">

        <div className="p-5 border rounded-xl flex items-center gap-4 shadow-sm bg-[#F7FFF7]">
          <Users size={30} className="text-[#397C3C]" />
          <div>
            <p className="text-sm text-gray-500">Total empleados</p>
            <p className="text-xl font-bold">{total}</p>
          </div>
        </div>

        <div className="p-5 border rounded-xl flex items-center gap-4 shadow-sm bg-[#F4FAFF]">
          <Building2 size={30} className="text-blue-500" />
          <div>
            <p className="text-sm text-gray-500">Áreas activas</p>
            <p className="text-xl font-bold">{totalAreas}</p>
          </div>
        </div>

        <div className="p-5 border rounded-xl flex items-center gap-4 shadow-sm bg-[#FFF6F6]">
          <ShieldCheck size={30} className="text-red-500" />
          <div>
            <p className="text-sm text-gray-500">Administradores</p>
            <p className="text-xl font-bold">{admins}</p>
          </div>
        </div>

        <div className="p-5 border rounded-xl flex items-center gap-4 shadow-sm bg-[#F6FFF9]">
          <UserCheck size={30} className="text-green-500" />
          <div>
            <p className="text-sm text-gray-500">Colaboradores</p>
            <p className="text-xl font-bold">{colaboradores}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectorioStats;
