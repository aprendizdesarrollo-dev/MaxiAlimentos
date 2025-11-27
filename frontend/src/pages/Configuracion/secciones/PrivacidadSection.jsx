import { Shield } from "lucide-react";

export default function PrivacidadSection() {
    return (
        <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-200 mb-8">

            {/* HEADER */}
            <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#397C3C]/10">
                    <Shield size={18} className="text-[#397C3C]" />
                </span>

                <h2 className="font-bold text-[#397C3C] text-lg">
                    Centro de privacidad
                </h2>
            </div>

            <p className="text-sm text-gray-600 mb-4">
                Controla tus datos personales y revisa la información legal de la intranet.
            </p>

            {/* TARJETA 1 */}
            <div className="p-4 border rounded-2xl bg-gray-50 mb-3">
                <p className="font-medium text-gray-800">Política de privacidad</p>
                <p className="text-xs text-gray-500 mb-2">
                    Consulta cómo tratamos y protegemos tu información personal.
                </p>
                <a
                    href="/politicas/privacidad.pdf"
                    target="_blank"
                    className="text-[#397C3C] text-sm font-semibold hover:underline"
                >
                    Ver documento
                </a>
            </div>

            {/* TARJETA 2 */}
            <div className="p-4 border rounded-2xl bg-gray-50 mb-3">
                <p className="font-medium text-gray-800">Términos de uso</p>
                <p className="text-xs text-gray-500 mb-2">
                    Revisa las condiciones de uso de la plataforma y sus servicios.
                </p>
                <a
                    href="/politicas/terminos.pdf"
                    target="_blank"
                    className="text-[#397C3C] text-sm font-semibold hover:underline"
                >
                    Ver documento
                </a>
            </div>

            {/* TARJETA 3 */}
            <div className="p-4 border rounded-2xl bg-gray-50">
                <p className="font-medium text-gray-800">Cerrar sesiones activas</p>
                <p className="text-xs text-gray-500 mb-2">
                    Cierra todas las sesiones iniciadas en otros dispositivos.
                </p>

                <button
                    onClick={() => alert("Función en desarrollo")}
                    className="text-[#397C3C] text-sm font-semibold hover:underline"
                >
                    Cerrar sesiones
                </button>
            </div>
        </div>
    );
}
