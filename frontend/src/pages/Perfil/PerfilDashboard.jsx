import { useEffect, useState } from "react";
import api from "../../services/api";

import PerfilHeader from "../../components/Perfil/PerfilHeader";
import PerfilSidebar from "../../components/Perfil/PerfilSidebar";
import PerfilInfoBasica from "../../components/Perfil/PerfilInfoBasica";
import PerfilContacto from "../../components/Perfil/PerfilContacto";
import PerfilEducacion from "../../components/Perfil/PerfilEducacion";
import PerfilCapacitacion from "../../components/Perfil/secciones/PerfilCapacitacion";

const PerfilDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/perfil", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data?.data) setUser(res.data.data);
      } catch (err) {
        console.error("Error al obtener perfil:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPerfil();
  }, []);

  if (loading) return <div className="flex justify-center p-10">Cargando...</div>;
  if (!user) return <div className="text-center p-10 text-red-500">No se pudo cargar el perfil.</div>;

  return (
    <div className="p-6">
      <div className="bg-white shadow-sm rounded-3xl border border-gray-200 p-8">

        {/* HEADER - SOLO BOTÓN EDITAR EN PERSONAL */}
        <PerfilHeader
          user={user}
          setUser={setUser}
          isEditing={isEditing}
          onToggleEdit={() => setIsEditing(true)}
          showEditButton={activeTab === "personal"}
        />

        {/* MENÚ SUPERIOR */}
        <div className="flex gap-4 border-b border-gray-200 mt-6 mb-6">
          {["personal", "capacitacion", "emergencia", "documentos", "vacaciones"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`capitalize px-4 py-2 rounded-t-lg font-medium ${activeTab === tab
                ? "bg-[#397C3C] text-white"
                : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
        {/* CONTENEDOR GENERAL (SIEMPRE SIDEBAR + CONTENIDO) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* SIDEBAR - SIEMPRE SE MUESTRA */}
          <div className="lg:col-span-1">
            <PerfilSidebar user={user} />
          </div>

          {/* CONTENIDO SEGÚN PESTAÑA */}
          <div className="lg:col-span-3 space-y-6">

            {/* PERSONAL */}
            {activeTab === "personal" && (
              <>
                <PerfilInfoBasica
                  user={user}
                  setUser={setUser}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                />

                <PerfilContacto user={user} isEditing={isEditing} />
                <PerfilEducacion user={user} isEditing={isEditing} />
              </>
            )}

            {/* CAPACITACIÓN */}
            {activeTab === "capacitacion" && (
              <PerfilCapacitacion user={user} />
            )}

            {/* EMERGENCIA */}
            {activeTab === "emergencia" && (
              <div className="bg-white p-5 rounded-xl border">
                <h2 className="text-lg font-semibold text-[#397C3C] mb-3">
                  Información de emergencia
                </h2>
                <p className="text-gray-600">Aquí irá el contacto de emergencia, EPS y RH.</p>
              </div>
            )}

            {/* DOCUMENTOS */}
            {activeTab === "documentos" && (
              <div className="bg-white p-5 rounded-xl border">
                <h2 className="text-lg font-semibold text-[#397C3C] mb-3">
                  Documentos del empleado
                </h2>
                <p className="text-gray-600">Aquí se podrán subir y visualizar documentos.</p>
              </div>
            )}

            {/* VACACIONES */}
            {activeTab === "vacaciones" && (
              <div className="bg-white p-5 rounded-xl border">
                <h2 className="text-lg font-semibold text-[#397C3C] mb-3">
                  Historial de vacaciones
                </h2>
                <p className="text-gray-600">Se mostrará el historial y solicitudes.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilDashboard;
