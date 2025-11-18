import DirectorioCard from "./DirectorioCard";

const DirectorioList = ({ usuarios }) => {
  if (!usuarios || usuarios.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-12">
        No se encontraron empleados.
      </p>
    );
  }

  // Ordenar usuarios por nombre y apellido
  const usuariosOrdenados = [...usuarios].sort((a, b) => {
    const nombreA = `${a.nombre} ${a.apellido}`.trim().toLowerCase();
    const nombreB = `${b.nombre} ${b.apellido}`.trim().toLowerCase();
    return nombreA.localeCompare(nombreB);
  });

  // Agrupar por inicial del nombre
  const grupos = usuariosOrdenados.reduce((acc, user) => {
    const letra = user.nombre
      ? user.nombre.charAt(0).toUpperCase()
      : "?";

    if (!acc[letra]) acc[letra] = [];
    acc[letra].push(user);

    return acc;
  }, {});

  const letrasOrdenadas = Object.keys(grupos).sort();

  return (
    <div className="space-y-10">
      {letrasOrdenadas.map((letra) => (
        <div key={letra}>
          <h2 className="text-xl font-semibold text-[#397C3C] mb-4">
            {letra}
          </h2>

          <div className="flex flex-col gap-4">
            {grupos[letra].map((user) => (
              <DirectorioCard key={user.id} user={user} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DirectorioList;
