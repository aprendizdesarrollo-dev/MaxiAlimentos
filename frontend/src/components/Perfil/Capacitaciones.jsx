import { GraduationCap } from "lucide-react";

export default function Capacitaciones() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-[#397C3C] mb-4 flex items-center gap-2">
        <GraduationCap size={20} className="text-[#397C3C]" />
        Capacitaciones
      </h2>
      <p className="text-gray-700">
        No hay capacitaciones registradas actualmente.
      </p>
    </div>
  );
}
