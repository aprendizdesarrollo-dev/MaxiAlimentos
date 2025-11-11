export default function Trabajo({ user }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-[#397C3C] mb-4">
        Información laboral
      </h2>
      <ul className="space-y-2 text-gray-700">
        <li><strong>Cargo:</strong> {user.cargo || "No definido"}</li>
        <li><strong>Área:</strong> {user.area || "Sin área"}</li>
        <li><strong>Tipo de contrato:</strong> Aprendiz SENA</li>
        <li><strong>Fecha de ingreso:</strong> 1 de julio de 2025</li>
      </ul>
    </div>
  );
}
