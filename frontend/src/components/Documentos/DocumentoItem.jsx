import { FileText, Download } from "lucide-react";

export default function DocumentoItem({ doc }) {

    return (
        <div className="border rounded-xl p-4 bg-gray-50 flex justify-between items-center">

            <div>
                <div className="flex items-center gap-2">
                    <FileText className="text-[#397C3C]" />

                    <span className="font-semibold">
                        {doc.nombre}
                    </span>

                    {doc.etiqueta && (
                        <span className="text-xs px-2 py-1 rounded-lg bg-green-100 text-green-700 font-semibold">
                            {doc.etiqueta}
                        </span>
                    )}

                    {doc.obligatorio && (
                        <span className="text-xs px-2 py-1 rounded-lg bg-red-100 text-red-700">
                            Obligatorio
                        </span>
                    )}
                </div>

                <p className="text-xs text-gray-500 mt-1">
                    {doc.actualizado && `Actualizado: ${doc.actualizado} — `}
                    {doc.tamano}
                </p>
            </div>

            {/* Descargar */}
            <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#397C3C] text-white px-4 py-2 rounded-xl hover:bg-[#2f612f] transition flex items-center gap-2"
            >
                <Download size={16} />
                Descargar
            </a>
        </div>
    );
}
