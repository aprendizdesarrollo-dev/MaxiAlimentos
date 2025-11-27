import { Mail, Phone, MapPin, Briefcase } from "lucide-react";

const DirectorioCard = ({ user }) => {
  const iniciales =
    user.nombre && user.apellido
      ? `${user.nombre.charAt(0)}${user.apellido.charAt(0)}`.toUpperCase()
      : "US";

  const foto = user.foto_perfil || user.foto || null;

  const copiarCorreo = () => {
    navigator.clipboard.writeText(user.correo_corporativo || user.correo);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 w-full flex gap-6 items-start">

      {/* FOTO XL */}
      <div className="w-[120px] h-[120px] rounded-xl overflow-hidden shadow flex-shrink-0 bg-gray-200">
        {foto ? (
          <img
            src={foto}
            alt="Foto de perfil"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-[#397C3C] text-white flex items-center justify-center text-3xl font-semibold">
            {iniciales}
          </div>
        )}
      </div>

      {/* INFORMACIÓN */}
      <div className="flex-1 flex flex-col justify-start">

        {/* NOMBRE + ROL */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-[20px] font-bold text-gray-900 leading-tight">
              {user.nombre} {user.apellido}
            </h3>

            <div className="flex items-center gap-2 mt-1">
              <Briefcase size={16} className="text-[#397C3C]" />
              <p className="text-sm text-gray-700 font-medium">{user.cargo}</p>
            </div>

            <p className="text-sm text-[#397C3C] font-semibold mt-1">
              {user.area}
            </p>
          </div>

          <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
            {user.rol}
          </span>
        </div>

        {/* CONTACTO */}
        <div className="mt-4 space-y-2">

          {/* Teléfono */}
          {user.telefono_personal && (
            <p className="flex items-center gap-2 text-sm text-gray-700">
              <Phone size={17} className="text-[#397C3C]" />
              {user.telefono_personal}
            </p>
          )}

          {/* Correo corporativo con enlace directo a Gmail */}
          {(user.correo_corporativo || user.correo) && (
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                user.correo_corporativo || user.correo
              )}&su=${encodeURIComponent("Contacto desde Intranet MaxiAlimentos")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#397C3C] transition cursor-pointer"
            >
              <Mail size={17} className="text-[#397C3C]" />
              {user.correo_corporativo || user.correo}
            </a>

          )}


          {/* Ciudad — más adelante dinámico */}
          <p className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin size={17} className="text-[#397C3C]" />
            Bogotá
          </p>
        </div>

        {/* BOTONES */}
        <div className="flex gap-3 mt-5">
          <a
            href={`mailto:${user.correo_corporativo || user.correo}`}
            className="px-4 py-2 text-xs font-semibold bg-white border border-[#397C3C] text-[#397C3C] rounded-full hover:bg-[#397C3C] hover:text-white transition"
          >
            Correo
          </a>

        </div>
      </div>
    </div>
  );
};

export default DirectorioCard;
