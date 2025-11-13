import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import api from "../../services/api";
import DirectorioList from "../../components/Directorio/DirectorioList";

const DirectorioDashboard = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/directorio", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data?.data) {
          setUsuarios(response.data.data);
        }
      } catch (error) {
        console.error("Error al obtener el directorio:", error);
      }
    };

    fetchUsuarios();
  }, []);

  // Filtrado dinámico por nombre, área o cargo
  const filtrados = usuarios.filter((user) => {
    const texto = busqueda.toLowerCase();
    return (
      user.nombre.toLowerCase().includes(texto) ||
      user.apellido.toLowerCase().includes(texto) ||
      user.area.toLowerCase().includes(texto) ||
      user.cargo.toLowerCase().includes(texto)
    );
  });

  return (
    <div className="p-6">
      <div className="bg-white border border-gray-200 shadow-sm rounded-3xl p-8">
        {/* 🟩 Título y descripción */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#397C3C] mb-1">Directorio</h1>
            <p className="text-gray-600">
              Consulta los contactos del personal interno de MaxiAlimentos.
            </p>
          </div>

          {/* 🔍 Barra de búsqueda */}
          <div className="relative mt-4 sm:mt-0 w-full sm:w-80">
            <input
              type="text"
              placeholder="Buscar por nombre o área..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full border border-gray-300 rounded-full py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#397C3C] focus:border-transparent"
            />
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

        {/* 📋 Lista de empleados */}
        <DirectorioList usuarios={filtrados} />
      </div>
    </div>
  );
};

export default DirectorioDashboard;
