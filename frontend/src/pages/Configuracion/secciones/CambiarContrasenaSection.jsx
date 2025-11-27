import { Lock } from "lucide-react";
import { useState } from "react";
import api from "../../../services/api";

export default function CambiarContrasenaSection() {

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError(null);
        setMensaje(null);

        if (newPassword !== confirmPassword) {
            setError("Las contraseñas nuevas no coinciden.");
            return;
        }

        try {
            setLoading(true);

            await api.post("/cambiar-contrasena", {
                actual: currentPassword,
                nueva: newPassword,
                confirmar: confirmPassword,
            });

            setMensaje("Contraseña actualizada correctamente.");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

        } catch (err) {
            setError(err.response?.data?.message || "Error al cambiar la contraseña.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-200 mb-8">

            {/* TÍTULO */}
            <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#397C3C]/10">
                    <Lock size={18} className="text-[#397C3C]" />
                </span>
                <h2 className="font-bold text-[#397C3C]">Cambiar contraseña</h2>
            </div>

            <p className="text-sm text-gray-600 mb-6">
                Usa este formulario para actualizar la contraseña de tu cuenta.
            </p>

            {/* MENSAJE DE ÉXITO */}
            {mensaje && (
                <div className="bg-green-100 text-green-700 p-3 rounded-xl text-sm mb-4">
                    {mensaje}
                </div>
            )}

            {/* ERROR */}
            {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded-xl text-sm mb-4">
                    {error}
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
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full p-2.5 border rounded-xl mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#397C3C]/40"
                        required
                    />
                </div>

                <div>
                    <label className="font-semibold text-gray-700 text-sm">
                        Nueva contraseña:
                    </label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full p-2.5 border rounded-xl mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#397C3C]/40"
                        required
                    />
                </div>

                <div>
                    <label className="font-semibold text-gray-700 text-sm">
                        Confirmar nueva contraseña:
                    </label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-2.5 border rounded-xl mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#397C3C]/40"
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
        </div>
    );
}
