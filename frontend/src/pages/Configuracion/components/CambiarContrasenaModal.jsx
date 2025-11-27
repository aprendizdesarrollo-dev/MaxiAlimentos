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
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-white w-[95%] max-w-lg rounded-3xl shadow-xl p-8 relative"
            >
                {/* BOTÓN CERRAR */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 bg-[#397C3C] text-white w-8 h-8 rounded-full flex justify-center items-center hover:bg-[#2f612f] transition"
                >
                    <X size={18} />
                </button>

                {/* TÍTULO */}
                <div className="flex items-center gap-3 mb-6">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-[#397C3C]/10">
                        <Lock size={22} className="text-[#397C3C]" />
                    </span>

                    <h2 className="text-xl font-bold text-[#397C3C]">
                        Cambiar contraseña
                    </h2>
                </div>

                {/* ALERTAS */}
                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded-xl text-sm mb-4">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-100 text-green-700 p-3 rounded-xl text-sm mb-4">
                        {success}
                    </div>
                )}

                {/* FORMULARIO */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="font-semibold text-gray-700 text-sm">
                            Contraseña actual:
                        </label>
                        <input
                            type="password"
                            value={actual}
                            onChange={(e) => setActual(e.target.value)}
                            className="w-full p-3 border rounded-xl mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#397C3C]/40"
                            required
                        />
                    </div>

                    <div>
                        <label className="font-semibold text-gray-700 text-sm">
                            Nueva contraseña:
                        </label>
                        <input
                            type="password"
                            value={nueva}
                            onChange={(e) => setNueva(e.target.value)}
                            className="w-full p-3 border rounded-xl mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#397C3C]/40"
                            required
                        />
                    </div>

                    <div>
                        <label className="font-semibold text-gray-700 text-sm">
                            Confirmar nueva contraseña:
                        </label>
                        <input
                            type="password"
                            value={confirmar}
                            onChange={(e) => setConfirmar(e.target.value)}
                            className="w-full p-3 border rounded-xl mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#397C3C]/40"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#397C3C] hover:bg-[#2f612f] transition text-white px-5 py-3 rounded-xl font-semibold w-full text-sm"
                    >
                        {loading ? "Guardando..." : "Actualizar contraseña"}
                    </button>
                </form>
            </motion.div>

        </div>
    );
}
