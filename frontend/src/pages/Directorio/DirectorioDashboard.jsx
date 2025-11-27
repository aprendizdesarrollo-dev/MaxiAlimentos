import { useEffect, useState } from "react";
import api from "../../services/api";
import DirectorioList from "../../components/Directorio/DirectorioList";
import DirectorioStats from "../../components/Directorio/DirectorioStats";

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

        {/* AQUI VA TODO EL NUEVO DASHBOARD */}
        <DirectorioStats usuarios={usuarios} busqueda={busqueda} setBusqueda={setBusqueda} />

        {/* LISTA DE EMPLEADOS */}
        <div className="mt-10">
          <DirectorioList usuarios={filtrados} />
        </div>

      </div>
    </div>
  );
};

export default DirectorioDashboard;
