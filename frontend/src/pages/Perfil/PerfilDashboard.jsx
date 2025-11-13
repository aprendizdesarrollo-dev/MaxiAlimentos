import { useEffect, useState } from "react";
import api from "../../services/api";

import PerfilHeader from "../../components/Perfil/PerfilHeader";
import PerfilSidebar from "../../components/Perfil/PerfilSidebar";
import PerfilInfoBasica from "../../components/Perfil/PerfilInfoBasica";
import PerfilContacto from "../../components/Perfil/PerfilContacto";
import PerfilEducacion from "../../components/Perfil/PerfilEducacion";

const PerfilDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("personal"); // ✅ nueva pestaña activa

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/perfil", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data && res.data.data) setUser(res.data.data);
      } catch (err) {
        console.error("Error al obtener perfil:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPerfil();
  }, []);

  if (loading) return <div className="flex justify-center p-10">Cargando...</div>;
  if (!user) return <div className="flex justify-center p-10 text-red-500">No se pudo cargar el perfil.</div>;

  return (
    <div className="p-6">
      <div className="bg-white shadow-sm rounded-3xl border border-gray-200 p-8">
        {/* ✅ El botón Editar solo si estamos en pestaña "personal" */}
        <PerfilHeader
          user={user}
          setUser={setUser}
          isEditing={isEditing}
          onToggleEdit={() => setIsEditing(!isEditing)}
          showEditButton={activeTab === "personal"} // ✅ aquí
        />

        {/* 🔹 Menú superior */}
        <div className="flex gap-4 border-b border-gray-200 mt-6 mb-6">
          {["personal", "capacitacion", "emergencia", "documentos", "vacaciones"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`capitalize px-4 py-2 rounded-t-lg font-medium ${
                activeTab === tab
                  ? "bg-[#397C3C] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 🔹 Contenido según pestaña */}
        {activeTab === "personal" && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <PerfilSidebar user={user} />
            </div>

            <div className="lg:col-span-3 space-y-6">
              <PerfilInfoBasica
                user={user}
                setUser={setUser}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
              />
              <PerfilContacto user={user} isEditing={isEditing} />
              <PerfilEducacion user={user} isEditing={isEditing} />
            </div>
          </div>
        )}

        {activeTab === "capacitacion" && <p>📚 Sección de capacitación</p>}
        {activeTab === "emergencia" && <p>🚨 Información de emergencia</p>}
        {activeTab === "documentos" && <p>📄 Documentos del empleado</p>}
        {activeTab === "vacaciones" && <p>🏖️ Historial de vacaciones</p>}
      </div>
    </div>
  );
};

export default PerfilDashboard;
