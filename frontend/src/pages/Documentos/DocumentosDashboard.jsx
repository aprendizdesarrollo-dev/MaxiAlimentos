import { useState, useMemo } from "react";
import {
    BriefcaseBusiness,
    Building,
    HeartHandshake,
    Landmark,
    ShieldCheck,
    Search
} from "lucide-react";

import DocumentosModal from "../../components/Documentos/DocumentosModal";

export default function DocumentosDashboard() {

    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
    const [busqueda, setBusqueda] = useState("");

    // BASE DE DATOS DE DOCUMENTOS
    const categorias = [
        {
            id: "laborales",
            icon: BriefcaseBusiness,
            titulo: "Documentos laborales individuales",
            descripcion: "Desprendibles, certificados y vacaciones.",
            documentos: [
                {
                    nombre: "Desprendible de nómina",
                    etiqueta: "Nuevo",
                    actualizado: "2025-10-03",
                    tamano: "820 KB",
                    obligatorio: true,
                    url: "/docs/desprendible.pdf"
                },
                {
                    nombre: "Certificado laboral",
                    actualizado: "2025-09-15",
                    tamano: "540 KB",
                    obligatorio: true,
                    url: "/docs/certificado_laboral.pdf"
                },
                {
                    nombre: "Certificado de aportes",
                    actualizado: "2025-08-02",
                    tamano: "430 KB",
                    url: "/docs/aportes.pdf"
                },
                {
                    nombre: "Historial de vacaciones",
                    actualizado: "2025-11-10",
                    tamano: "1.2 MB",
                    url: "/docs/vacaciones.pdf"
                },
            ]
        },

        {
            id: "corporativos",
            icon: Building,
            titulo: "Documentos corporativos",
            descripcion: "Manual, políticas y reglamentos.",
            documentos: [
                { nombre: "Código de ética", tamano: "1.1 MB", obligatorio: true, url: "/docs/etica.pdf" },
                { nombre: "Reglamento interno", tamano: "860 KB", url: "/docs/reglamento.pdf" },
                { nombre: "Política de datos", tamano: "600 KB", obligatorio: true, url: "/docs/tratamiento.pdf" },
                { nombre: "Manual corporativo", tamano: "2.3 MB", url: "/docs/manual.pdf" },
            ]
        },

        {
            id: "bienestar",
            icon: HeartHandshake,
            titulo: "Bienestar y RRHH",
            descripcion: "Formatos y guías para colaboradores.",
            documentos: [
                { nombre: "Formato de permisos", tamano: "220 KB", url: "/docs/permisos.pdf" },
                { nombre: "Incapacidades", tamano: "300 KB", url: "/docs/incapacidad.pdf" },
                { nombre: "Guía de beneficios", tamano: "1.4 MB", url: "/docs/beneficios.pdf" },
            ]
        },

        {
            id: "generales",
            icon: Landmark,
            titulo: "Documentos generales",
            descripcion: "Información institucional.",
            documentos: [
                { nombre: "Misión y visión", tamano: "350 KB", url: "/docs/mision_vision.pdf" },
            ]
        },

        {
            id: "legales",
            icon: ShieldCheck,
            titulo: "Documentos legales",
            descripcion: "Documentos obligatorios externos.",
            documentos: [
                { nombre: "Política de cookies", tamano: "180 KB", url: "/docs/cookies.pdf" },
                { nombre: "Certificado de sanidad", tamano: "980 KB", obligatorio: true, url: "/docs/sanidad.pdf" },
            ]
        },
    ];

    // BUSCADOR GLOBAL
    const resultadosBusqueda = useMemo(() => {
        if (busqueda.trim() === "") return [];

        const q = busqueda.toLowerCase();

        return categorias
            .flatMap(cat =>
                cat.documentos.map(doc => ({
                    ...doc,
                    categoria: cat.titulo
                }))
            )
            .filter(doc => doc.nombre.toLowerCase().includes(q));
    }, [busqueda]);

    return (
        <div className="p-10">

            {/* HEADER PREMIUM */}
            <div className="p-10 rounded-3xl bg-gradient-to-r from-[#2f6b32] to-[#5bad5c] shadow-lg relative mb-10">
                <h1 className="text-3xl font-extrabold text-white">
                    Documentos de la empresa
                </h1>
                <p className="text-white/80 mt-1">
                    Consulta y descarga documentos laborales, corporativos, de bienestar y legales.
                </p>

                {/* Icono gigante estilo todos los headers */}
                <div
                    className="
                            absolute 
                            right-10 
                            top-1/2 
                            -translate-y-1/2 
                            opacity-20 
                            text-white
                            pointer-events-none
                            select-none
                        "
                                    >
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="w-32 h-32"
                    >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="12" y1="12" x2="18" y2="12" />
                        <line x1="12" y1="16" x2="18" y2="16" />
                        <line x1="6" y1="12" x2="8" y2="12" />
                        <line x1="6" y1="16" x2="8" y2="16" />
                    </svg>
                </div>



            </div>

            {/* BUSCADOR */}
            <div className="relative mb-10 max-w-3xl">
                <Search className="absolute left-4 top-3 text-gray-500" />
                <input
                    type="text"
                    placeholder="Buscar documentos en todo el sistema..."
                    className="w-full pl-12 pr-4 py-3 border rounded-2xl shadow-sm focus:ring-2 focus:ring-[#397C3C]/40"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />
            </div>

            {/* RESULTADOS DEL BUSCADOR */}
            {busqueda && resultadosBusqueda.length > 0 && (
                <div className="mb-10 bg-white rounded-2xl p-6 shadow border">
                    <h3 className="font-bold mb-3 text-[#397C3C]">Resultados de búsqueda</h3>

                    <ul className="space-y-3">

                        {resultadosBusqueda.map((doc, idx) => (
                            <li key={idx} className="flex justify-between items-center border p-3 rounded-xl bg-gray-50">
                                <div>
                                    <p className="font-semibold">{doc.nombre}</p>
                                    <p className="text-xs text-gray-500">{doc.categoria} — {doc.tamano}</p>
                                </div>
                                <button
                                    onClick={() => setCategoriaSeleccionada({ documentos: [doc], titulo: doc.categoria })}
                                    className="text-white bg-[#397C3C] px-4 py-2 rounded-lg"
                                >
                                    Ver
                                </button>
                            </li>
                        ))}

                    </ul>
                </div>
            )}


            {/* GRID DE CATEGORÍAS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categorias.map((cat) => (
                    <div
                        key={cat.id}
                        className="bg-white p-6 rounded-3xl border shadow hover:shadow-lg transition cursor-pointer"
                    >
                        <div className="flex items-center gap-4">
                            <cat.icon className="w-12 h-12 text-[#397C3C]" />
                            <div>
                                <h2 className="font-bold text-lg text-[#397C3C]">{cat.titulo}</h2>
                                <p className="text-gray-600 text-sm">{cat.descripcion}</p>
                            </div>
                        </div>

                        <div className="flex justify-between items-center mt-5">
                            <span className="text-xs text-gray-500">
                                {cat.documentos.length} documento(s)
                            </span>

                            <button
                                onClick={() => setCategoriaSeleccionada(cat)}
                                className="bg-[#397C3C] text-white text-sm px-4 py-2 rounded-xl hover:bg-[#2f612f] transition"
                            >
                                Ver documentos
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* MODAL */}
            {categoriaSeleccionada && (
                <DocumentosModal
                    categoria={categoriaSeleccionada}
                    onClose={() => setCategoriaSeleccionada(null)}
                />
            )}
        </div>
    );
}
