import { Award } from "lucide-react";

export default function Certificaciones() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-[#397C3C] mb-4 flex items-center gap-2">
        <Award size={20} className="text-[#397C3C]" />
        Certificaciones
      </h2>

      <p className="text-gray-700">
        Sin certificaciones disponibles por el momento.
      </p>
    </div>
  );
}
