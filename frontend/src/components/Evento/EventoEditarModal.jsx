import { useState } from "react";
import { X } from "lucide-react";
import api from "../../services/api";
import imageCompression from "browser-image-compression";
import { CalendarDays } from "lucide-react";

export default function EventosEditarModal({ evento, cerrar, refrescar, onChange }) {
    const [data, setData] = useState({
        titulo: evento.titulo || "",
        descripcion: evento.descripcion || "",
        fecha: evento.fecha?.split("T")[0] || "",
        imagenFile: null,
        imagenActual: evento.imagen || null,
    });

    const [guardando, setGuardando] = useState(false);

    // Manejo de inputs
    const handleChange = (campo, valor) => {
        setData((prev) => ({ ...prev, [campo]: valor }));
    };

    // Imagen + compresión
    const handleImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const compressed = await imageCompression(file, {
                maxSizeMB: 1,
                maxWidthOrHeight: 1920,
                useWebWorker: true,
            });

            handleChange("imagenFile", compressed);
        } catch (err) {
            console.error("Error al comprimir imagen:", err);
            handleChange("imagenFile", file);
        }
    };

    // Enviar actualización
    const actualizar = async (e) => {
        e.preventDefault();
        setGuardando(true);

        try {
            const token = localStorage.getItem("token");

            const form = new FormData();
            form.append("_method", "PUT");
            form.append("titulo", data.titulo);
            form.append("descripcion", data.descripcion);
            form.append("fecha", data.fecha);

            if (data.imagenFile) form.append("imagen", data.imagenFile);

            const res = await api.post(`/eventos/${evento.id}`, form, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res.data.success) {
                await refrescar();
                if (onChange) onChange();
                cerrar();
            } else {
                alert("Error al actualizar el evento.");
            }
        } catch (error) {
            console.error("Error actualizar evento:", error);
            alert("Error al actualizar evento.");
        } finally {
            setGuardando(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">

                {/* Encabezado */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-[#397C3C]">
                        Editar Evento
                    </h2>

                    <button
                        onClick={cerrar}
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                    >
                        <X size={20} className="text-gray-700" />
                    </button>
                </div>

                {/* Formulario */}
                <form onSubmit={actualizar} className="space-y-4">

                    {/* Título */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Título</label>
                        <input
                            type="text"
                            value={data.titulo}
                            onChange={(e) => handleChange("titulo", e.target.value)}
                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#397C3C] outline-none"
                            required
                        />
                    </div>

                    {/* Descripción */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Descripción</label>
                        <textarea
                            value={data.descripcion}
                            onChange={(e) => handleChange("descripcion", e.target.value)}
                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#397C3C] outline-none"
                            rows={4}
                            required
                        ></textarea>
                    </div>

                    {/* Fecha */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Fecha</label>
                        <input
                            type="date"
                            value={data.fecha}
                            onChange={(e) => handleChange("fecha", e.target.value)}
                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#397C3C] outline-none"
                            required
                        />
                    </div>

                    <label className="block text-gray-700 font-medium mb-1">
                        Imagen del evento
                    </label>

                    <label
                        htmlFor="imagenFile"
                        className="flex items-center justify-center gap-2 border-2 border-dashed border-[#397C3C] rounded-xl py-4 px-4 cursor-pointer hover:bg-[#f1fdf1] transition"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-[#397C3C]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 16a4 4 0 118 0m-4-4v8m4-8h-8"
                            />
                        </svg>

                        <span className="text-[#397C3C] font-medium truncate max-w-[180px]">
                            {data.imagenFile
                                ? data.imagenFile.name
                                : "Seleccionar archivo"}
                        </span>
                    </label>

                    <input
                        id="imagenFile"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImage}
                    />

                    {/* Vista previa */}
                    {(data.imagenFile || data.imagenActual) && (
                        <img
                            src={
                                data.imagenFile
                                    ? URL.createObjectURL(data.imagenFile)
                                    : data.imagenActual
                            }
                            alt="preview"
                            className="w-full h-40 object-cover rounded-xl mt-3 border border-gray-200"
                        />
                    )}

                    {/* Botones */}
                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={cerrar}
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={guardando}
                            className={`bg-[#397C3C] text-white px-6 py-2 rounded-lg hover:bg-[#2f612f] transition ${guardando ? "opacity-70 cursor-not-allowed" : ""
                                }`}
                        >
                            {guardando ? "Guardando..." : "Guardar cambios"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
