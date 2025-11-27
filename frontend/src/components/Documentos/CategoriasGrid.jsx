import { BriefcaseBusiness, Building2, HeartHandshake, Globe2, ShieldCheck } from "lucide-react";
import { CATEGORIAS } from "./categoriasData";

export default function CategoriasGrid({ onOpen }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CATEGORIAS.map((cat) => {
                const Icono = cat.icono;

                return (
                    <div
                        key={cat.id}
                        className="bg-white rounded-3xl p-6 shadow-md border flex flex-col justify-between"
                    >
                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-12 h-12 rounded-2xl bg-[#397C3C]/10 flex items-center justify-center">
                                <Icono size={24} className="text-[#397C3C]" />
                            </div>

                            <div>
                                <h2 className="font-extrabold text-lg text-[#397C3C]">
                                    {cat.titulo}
                                </h2>
                                <p className="text-sm text-gray-600 mt-1">
                                    {cat.descripcion}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <p className="text-xs text-gray-500">
                                {cat.documentos.length} documento(s)
                            </p>

                            <button
                                onClick={() => onOpen(cat)}
                                className="bg-[#397C3C] hover:bg-[#2f612f] transition text-white px-4 py-2 rounded-xl text-sm font-semibold"
                            >
                                Ver documentos
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
