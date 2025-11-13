import { useState } from "react";

const PerfilMenu = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "personal", label: "Personal" },
    { id: "capacitacion", label: "Capacitación" },
    { id: "emergencia", label: "Emergencia" },
    { id: "documentos", label: "Documentos" },
    { id: "vacaciones", label: "Vacaciones" },
  ];

  return (
    <div className="border-b border-gray-200 mt-6 mb-6">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-t-lg font-medium transition ${
              activeTab === tab.id
                ? "bg-[#397C3C] text-white"
                : "text-gray-600 hover:text-[#397C3C]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PerfilMenu;
