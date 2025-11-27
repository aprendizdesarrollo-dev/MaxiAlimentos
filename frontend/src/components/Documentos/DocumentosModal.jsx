import { X, Download } from "lucide-react";
import DocumentoItem from "./DocumentoItem";

export default function DocumentosModal({ categoria, onClose }) {

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">

            <div className="bg-white w-[95%] max-w-4xl rounded-3xl shadow-xl p-8 relative animate-fadeIn">

                {/* Cerrar */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 bg-[#397C3C] text-white w-9 h-9 rounded-full flex justify-center items-center hover:bg-[#2f612f] transition"
                >
                    <X size={18} />
                </button>

                <h2 className="text-2xl font-bold text-[#397C3C] mb-5">
                    {categoria.titulo}
                </h2>

                {/* LISTA */}
                <div className="space-y-4">
                    {categoria.documentos.map((doc, idx) => (
                        <DocumentoItem key={idx} doc={doc} />
                    ))}
                </div>

            </div>

        </div>
    );
}
