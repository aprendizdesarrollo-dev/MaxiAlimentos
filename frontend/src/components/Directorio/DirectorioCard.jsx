import { Mail, Phone } from "lucide-react";

const DirectorioCard = ({ user }) => {
  const iniciales =
    user.nombre && user.apellido
      ? `${user.nombre.charAt(0)}${user.apellido.charAt(0)}`.toUpperCase()
      : "US";

  const copiarCorreo = () => {
    navigator.clipboard.writeText(user.correo);
    alert("Correo copiado al portapapeles");
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col sm:flex-row sm:items-center gap-6 w-full">
      {/* Foto o iniciales */}
      <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center bg-[#397C3C] text-white font-semibold text-xl rounded-full">
        {iniciales}
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between flex-wrap">
          <h3 className="text-lg font-semibold text-gray-900">
            {user.nombre} {user.apellido}
          </h3>
          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium mt-2 sm:mt-0">
            {user.rol}
          </span>
        </div>

        <p className="text-sm text-gray-700 mt-1">
          {user.cargo} —{" "}
          <span className="text-[#397C3C] font-medium">{user.area}</span>
        </p>

        {user.telefono_personal && (
          <p className="flex items-center gap-2 text-sm text-gray-600 mt-2">
            <Phone size={15} className="text-[#397C3C]" />
            <span>{user.telefono_personal}</span>
          </p>
        )}

        {user.correo && (
          <p className="flex items-center gap-2 text-sm text-gray-600 mt-1">
            <Mail size={15} className="text-[#397C3C]" />
            <span>{user.correo}</span>
          </p>
        )}

        <button
          onClick={copiarCorreo}
          className="mt-4 text-xs bg-[#397C3C] text-white px-4 py-1.5 rounded-full hover:bg-green-700 transition"
        >
          Copiar correo
        </button>
      </div>
    </div>
  );
};

export default DirectorioCard;
