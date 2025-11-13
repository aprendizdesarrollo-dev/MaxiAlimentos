import { Plane } from "lucide-react";

export default function Vacaciones() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-[#397C3C] mb-4 flex items-center gap-2">
        <Plane size={20} className="text-[#397C3C]" />
        Vacaciones
      </h2>
      <ul className="space-y-2 text-gray-700">
        <li>Próximo periodo: Enero 2026</li>
        <li>Días disponibles: 15</li>
        <li>Último descanso: Junio 2025</li>
      </ul>
    </div>
  );
}
