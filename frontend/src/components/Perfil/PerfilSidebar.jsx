import { useEffect, useState } from "react";
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  UserRound,
  Briefcase,
  Building2,
} from "lucide-react";

const PerfilSidebar = ({ user }) => {
  const [horaLocal, setHoraLocal] = useState("");

  useEffect(() => {
    const actualizarHora = () => {
      const ahora = new Date();
      const hora = ahora.toLocaleTimeString("es-CO", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      setHoraLocal(hora.replace(".", "")); // quita el punto del AM/PM
    };

    actualizarHora();
    const intervalo = setInterval(actualizarHora, 60000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
      {/* Título */}
      <h3 className="text-sm font-semibold text-gray-500 tracking-widest mb-4">
        DATOS CLAVE
      </h3>

      {/* Información principal */}
      <div className="space-y-3 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <Phone size={16} className="text-[#397C3C]" />
          <span>{user.telefono_personal || "Sin teléfono"}</span>
        </div>

        <div className="flex items-center gap-2">
          <Mail size={16} className="text-[#397C3C]" />
          <span>{user.correo_corporativo || user.correo}</span>
        </div>

        <div className="flex items-center gap-2">
          <Clock size={16} className="text-[#397C3C]" />
          <span>{horaLocal}  Bogotá D.C</span>
        </div>

        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-[#397C3C]" />
          <span>{user.ciudad || "Bogotá"}</span>
        </div>

        <div className="flex items-center gap-2">
          <UserRound size={16} className="text-[#397C3C]" />
          <span>{user.cargo || "Sin cargo asignado"}</span>
        </div>

        <div className="flex items-center gap-2">
          <Building2 size={16} className="text-[#397C3C]" />
          <span>{user.area || "Área no definida"}</span>
        </div>

        <div className="flex items-center gap-2">
          <Briefcase size={16} className="text-[#397C3C]" />
          <span>MaxiAlimentos S.A.S</span>
        </div>

        <hr className="my-3" />

        {/* Sección de jefe directo */}
        <div>
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
            JEFE DIRECTO
          </h4>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#397C3C]/10 flex items-center justify-center font-bold text-[#397C3C]">
              {user.jefe_directo ? user.jefe_directo[0].toUpperCase() : "?"}
            </div>

            <div>
              <p className="font-medium text-sm text-gray-800">
                {user.jefe_directo || "No asignado"}
              </p>
              <p className="text-xs text-gray-500">Supervisor directo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilSidebar;
