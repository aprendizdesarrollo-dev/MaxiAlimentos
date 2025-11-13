import DirectorioCard from "./DirectorioCard";

const DirectorioList = ({ usuarios }) => {
  const grupos = usuarios.reduce((acc, user) => {
    const inicial = user.nombre ? user.nombre.charAt(0).toUpperCase() : "?";
    if (!acc[inicial]) acc[inicial] = [];
    acc[inicial].push(user);
    return acc;
  }, {});

  const letrasOrdenadas = Object.keys(grupos).sort();

  return (
    <div className="space-y-10">
      {letrasOrdenadas.map((letra) => (
        <div key={letra}>
          <h2 className="text-xl font-semibold text-[#397C3C] mb-4">{letra}</h2>
          <div className="flex flex-col gap-4">
            {grupos[letra].map((user) => (
              <DirectorioCard key={user.id} user={user} />
            ))}
          </div>
        </div>
      ))}

      {usuarios.length === 0 && (
        <p className="text-center text-gray-500 mt-12">
          No se encontraron empleados.
        </p>
      )}
    </div>
  );
};

export default DirectorioList;
