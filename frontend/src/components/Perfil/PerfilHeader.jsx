import { useRef, useState } from "react";
import { Camera } from "lucide-react";
import api from "../../services/api";
import toast from "react-hot-toast";


const PerfilHeader = ({ user, isEditing, onToggleEdit, setUser, showEditButton }) => {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(user.foto_perfil || null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("foto_perfil", file);

    const previewURL = URL.createObjectURL(file);
    setPreview(previewURL);

    try {
      const token = localStorage.getItem("token");
      const res = await api.post("/perfil/foto", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        toast.success("Foto de perfil actualizada correctamente");

        // Actualiza vista previa y estado global
        setPreview(res.data.foto_perfil);
        setUser((prev) => ({ ...prev, foto_perfil: res.data.foto_perfil }));
      } else {
        toast.error("No se pudo subir la imagen");
      }
    } catch (err) {
      console.error("Error al subir foto:", err);
      toast.error("Error al subir foto de perfil");
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4 relative">
        {/* Foto cuadrada */}
        <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-[#397C3C]/10 flex items-center justify-center">
          {preview ? (
            <img
              src={
                user.foto_perfil ||
                preview ||
                "/img/default-user.png" // opcional si no tiene foto
              }
              alt="Foto de perfil"
              className="w-full h-full object-cover"
            />

          ) : (
            <span className="text-2xl font-semibold text-[#397C3C]">
              {user.nombre?.[0]}
              {user.apellido?.[0]}
            </span>
          )}

          {/* Botón cámara visible solo en modo edición */}
          {isEditing && (
            <>
              <button
                onClick={() => fileInputRef.current.click()}
                className="absolute bottom-1 right-1 bg-[#397C3C] text-white p-2 rounded-full shadow hover:bg-[#2f6c31] transition"
              >
                <Camera size={16} />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </>
          )}
        </div>

        <div>
          <h1 className="text-2xl font-semibold">{user.nombre}</h1>
          <p className="text-gray-600">{user.cargo}</p>
        </div>
      </div>

      {/* Botón Editar/Cancelar */}
      <button
        onClick={onToggleEdit}
        className={`px-5 py-2 rounded-full font-medium transition ${isEditing
          ? "bg-gray-300 text-gray-800"
          : "bg-[#397C3C] text-white hover:bg-[#2f6c31]"
          }`}
        style={{ display: showEditButton ? "block" : "none" }} // ✅ solo si tab = personal
      >
        {isEditing ? "Cancelar" : "Editar perfil"}
      </button>

    </div>
  );
};

export default PerfilHeader;
