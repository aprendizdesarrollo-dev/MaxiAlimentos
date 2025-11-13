const PerfilContacto = ({ user }) => (
  <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm">
    <h3 className="text-lg font-semibold text-[#397C3C] mb-3">Contacto</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
      <p><strong>Teléfono:</strong> {user.telefono_personal || "N/A"}</p>
      <p><strong>Correo corporativo:</strong> {user.correo || "N/A"}</p>
      <p><strong>Correo personal:</strong> {user.correo_personal || "N/A"}</p>
      <p><strong>Dirección:</strong> {user.direccion || "N/A"}</p>
    </div>
  </div>
);

export default PerfilContacto;
