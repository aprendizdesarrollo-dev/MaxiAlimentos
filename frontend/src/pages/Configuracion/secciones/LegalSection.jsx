export default function LegalSection({ config, actualizarConfig }) {
    return (
        <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-200 mb-8">
            <h2 className="font-bold text-[#397C3C] mb-2">Contenido legal</h2>
            <p className="text-sm text-gray-600 mb-6">
                Administra los textos de Política de privacidad y Términos y condiciones
                que se mostrarán en la intranet para todos los colaboradores.
            </p>

            {/* Política de privacidad */}
            <div className="mb-5">
                <label className="font-semibold text-gray-700 text-sm">
                    Política de privacidad:
                </label>
                <textarea
                    rows={4}
                    value={config.politica_privacidad || ""}
                    onChange={(e) =>
                        actualizarConfig({ politica_privacidad: e.target.value })
                    }
                    className="w-full mt-1 p-2.5 border rounded-xl text-sm resize-y min-h-[120px]
                        focus:outline-none focus:ring-2 focus:ring-[#397C3C]/40"
                    placeholder="Texto que describe el tratamiento de datos personales dentro de la compañía."
                />
            </div>

            {/* Términos y condiciones */}
            <div>
                <label className="font-semibold text-gray-700 text-sm">
                    Términos y condiciones:
                </label>
                <textarea
                    rows={4}
                    value={config.terminos || ""}
                    onChange={(e) =>
                        actualizarConfig({ terminos: e.target.value })
                    }
                    className="w-full mt-1 p-2.5 border rounded-xl text-sm resize-y min-h-[120px]
                        focus:outline-none focus:ring-2 focus:ring-[#397C3C]/40"
                    placeholder="Condiciones de uso de la intranet y compromisos de los colaboradores."
                />
            </div>
        </div>
    );
}
