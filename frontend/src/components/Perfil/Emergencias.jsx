import { HeartPulse } from "lucide-react";

export default function Emergencias() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-[#397C3C] mb-4 flex items-center gap-2">
        <HeartPulse size={20} className="text-[#397C3C]" />
        Contacto de emergencia
      </h2>
      <div className="grid md:grid-cols-2 gap-6 text-gray-700">
        <div>
          <p><strong>Nombre:</strong> Yenny Marcela Herrera Novoa</p>
          <p><strong>Relación:</strong> Madre</p>
        </div>
        <div>
          <p><strong>Teléfono:</strong> 321 391 4106</p>
          <p><strong>Correo:</strong> disrmarherrera@yahoo.es</p>
        </div>
      </div>
      <div className="mt-4">
        <p><strong>Dirección:</strong> Calle 17A Sur #3-15 Este, Bogotá.</p>
      </div>
    </div>
  );
}
