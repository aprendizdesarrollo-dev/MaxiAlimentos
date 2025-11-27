import { motion } from "framer-motion";
import { X, Lock } from "lucide-react";
import { useState } from "react";
import api from "../../../services/api";

export default function CambiarContrasenaModal({ onClose }) {

    const [actual, setActual] = useState("");
    const [nueva, setNueva] = useState("");
    const [confirmar, setConfirmar] = useState("");

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (nueva.length < 6) {
            setError("La nueva contraseña debe tener mínimo 6 caracteres.");
            return;
        }

        if (nueva !== confirmar) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        try {
            setLoading(true);

            await api.put("/cambiar-contrasena-directo", {
                actual,
                nueva,
                confirmar
            });

            setSuccess("Contraseña actualizada correctamente.");
            setActual("");
            setNueva("");
            setConfirmar("");

            setTimeout(() => {
                onClose();
            }, 1200);

        } catch (err) {
            setError(err.response?.data?.message || "Error al cambiar la contraseña.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
            
            <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="
                    bg-white 
                    w-[95%] max-w-lg 
                    rounded-3xl 
                    shadow-xl 
                    p-8 
                    relative
                    border border-gray-200
                "
            >
                {/* Cerrar */}
                <button
                    onClick={onClose}
                    className="
                        absolute top-4 right-4 
                        bg-[#397C3C] 
                        text-white 
                        w-8 h-8 
                        rounded-full 
                        flex justify-center items-center 
                        hover:bg-[#2f612f] 
                        transition
                    "
                >
                    <X size={18} />
                </button>

                {/* Encabezado */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#397C3C]/10 flex justify-center items-center">
                        <Lock size={26} className="text-[#397C3C]" />
                    </div>

                    <h2 className="text-2xl font-bold text-[#397C3C]">
                        Cambiar contraseña
                    </h2>
                </div>

                {/* Alertas */}
                {error && (
                    <div className="bg-red-50 text-red-700 p-3 rounded-xl text-sm border border-red-200 mb-4">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-50 text-green-700 p-3 rounded-xl text-sm border border-green-200 mb-4">
                        {success}
                    </div>
                )}

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="space-y-5">

                    <div className="flex flex-col">
                        <label className="font-semibold text-gray-700 text-sm mb-1">
                            Contraseña actual:
                        </label>
                        <input
                            type="password"
                            value={actual}
                            onChange={(e) => setActual(e.target.value)}
                            className="
                                w-full p-3 
                                border border-gray-300 
                                rounded-xl 
                                focus:outline-none 
                                focus:ring-2 
                                focus:ring-[#397C3C]/40
                                text-sm
                            "
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold text-gray-700 text-sm mb-1">
                            Nueva contraseña:
                        </label>
                        <input
                            type="password"
                            value={nueva}
                            onChange={(e) => setNueva(e.target.value)}
                            className="
                                w-full p-3 
                                border border-gray-300 
                                rounded-xl 
                                focus:outline-none 
                                focus:ring-2 
                                focus:ring-[#397C3C]/40
                                text-sm
                            "
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold text-gray-700 text-sm mb-1">
                            Confirmar nueva contraseña:
                        </label>
                        <input
                            type="password"
                            value={confirmar}
                            onChange={(e) => setConfirmar(e.target.value)}
                            className="
                                w-full p-3 
                                border border-gray-300 
                                rounded-xl 
                                focus:outline-none 
                                focus:ring-2 
                                focus:ring-[#397C3C]/40
                                text-sm
                            "
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            w-full 
                            bg-[#397C3C] 
                            hover:bg-[#2f612f] 
                            text-white 
                            py-3 
                            rounded-xl 
                            font-semibold 
                            text-sm 
                            transition
                        "
                    >
                        {loading ? "Guardando..." : "Actualizar contraseña"}
                    </button>
                </form>
            </motion.div>

        </div>
    );
}
