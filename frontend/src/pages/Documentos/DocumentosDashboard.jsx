import { useState } from "react";
import {
    FileText,
    BriefcaseBusiness,
    Building2,
    HeartHandshake,
    Globe2,
    ShieldCheck,
    Download,
    X
} from "lucide-react";

const CATEGORIAS = [
    {
        id: "laborales",
        titulo: "Documentos laborales individuales",
        descripcion: "Accede a tus desprendibles, certificados y resumen de vacaciones.",
        icono: BriefcaseBusiness,
        documentos: [
            {
                nombre: "Desprendible de nómina",
                archivo: "/documentos/laborales/desprendible_nomina.pdf"
            },
            {
                nombre: "Certificado laboral",
                archivo: "/documentos/laborales/certificado_laboral.pdf"
            },
            {
                nombre: "Certificado de aportes (EPS, Pensión, ARL)",
                archivo: "/documentos/laborales/certificado_aportes.pdf"
            },
            {
                nombre: "Historial y resumen de vacaciones",
                archivo: "/documentos/laborales/resumen_vacaciones.pdf"
            }
        ]
    },
    {
        id: "corporativos",
        titulo: "Documentos corporativos internos",
        descripcion: "Consulta políticas, reglamentos y manuales oficiales de la empresa.",
        icono: Building2,
        documentos: [
            {
                nombre: "Política de Tratamiento de Datos Personales",
                archivo: "/documentos/corporativos/tratamiento_datos.pdf"
            },
            {
                nombre: "Código de Ética y Conducta",
                archivo: "/documentos/corporativos/codigo_etica_conducta.pdf"
            },
            {
                nombre: "Reglamento Interno de Trabajo (RIT)",
                archivo: "/documentos/corporativos/reglamento_interno_trabajo.pdf"
            },
            {
                nombre: "Manual de Higiene y Seguridad Industrial – SST",
                archivo: "/documentos/corporativos/manual_higiene_seguridad.pdf"
            },
            {
                nombre: "Normas de Bioseguridad y Manipulación de Alimentos",
                archivo: "/documentos/corporativos/normas_bioseguridad_alimentos.pdf"
            },
            {
                nombre: "Política de Seguridad de la Información",
                archivo: "/documentos/corporativos/politica_seguridad_informacion.pdf"
            },
            {
                nombre: "Manual de Identidad Corporativa",
                archivo: "/documentos/corporativos/manual_identidad_corporativa.pdf"
            }
        ]
    },
    {
        id: "bienestar",
        titulo: "Bienestar y Recursos Humanos",
        descripcion: "Formatos y guías relacionadas con bienestar y gestión humana.",
        icono: HeartHandshake,
        documentos: [
            {
                nombre: "Formato de solicitud de permisos",
                archivo: "/documentos/bienestar/formato_permisos.pdf"
            },
            {
                nombre: "Formato de incapacidades",
                archivo: "/documentos/bienestar/formato_incapacidades.pdf"
            },
            {
                nombre: "Guía de beneficios corporativos",
                archivo: "/documentos/bienestar/guia_beneficios_corporativos.pdf"
            }
        ]
    },
    {
        id: "generales",
        titulo: "Documentos generales de la empresa",
        descripcion: "Información institucional clave de MaxiAlimentos.",
        icono: Globe2,
        documentos: [
            {
                nombre: "Misión y visión institucional",
                archivo: "/documentos/generales/mision_vision_maxialimentos.pdf"
            }
        ]
    },
    {
        id: "legales",
        titulo: "Documentos legales y normativos",
        descripcion: "Documentos legales y certificaciones externas.",
        icono: ShieldCheck,
        documentos: [
            {
                nombre: "Política de cookies",
                archivo: "/documentos/legales/politica_cookies.pdf"
            },
            {
                nombre: "Certificado de sanidad / INVIMA",
                archivo: "/documentos/legales/certificado_sanidad_invima.pdf"
            }
        ]
    }
];

export default function DocumentosDashboard() {
    const [categoriaActiva, setCategoriaActiva] = useState(null);

    const abrirCategoria = (categoria) => {
        setCategoriaActiva(categoria);
    };

    const cerrarModal = () => {
        setCategoriaActiva(null);
    };

    return (
        <div className="p-8 space-y-8">

            {/* HEADER PREMIUM */}
            <div className="
                w-full 
                rounded-3xl 
                p-10 
                shadow-xl 
                bg-gradient-to-r 
                from-[#2f6b32] 
                to-[#5bad5c] 
                text-white
                relative
                overflow-hidden
            ">
                {/* Ícono gigante difuminado */}
                <FileText
                    className="
                        absolute 
                        right-6 
                        top-1/2 
                        -translate-y-1/2 
                        text-white/20
                    "
                    size={180}
                    strokeWidth={1.3}
                />

                <div className="relative z-10 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
                            Documentos de la empresa
                        </h1>
                        <p className="text-white/90 text-sm mt-2 max-w-xl">
                            Consulta y descarga tus documentos laborales, corporativos, 
                            de bienestar y legales desde un solo lugar.
                        </p>
                    </div>

                    <div className="text-right text-sm opacity-90">
                        {new Date().toLocaleDateString("es-CO", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            year: "numeric"
                        })}
                    </div>
                </div>
            </div>

            {/* GRID DE CATEGORÍAS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {CATEGORIAS.map((cat) => {
                    const Icono = cat.icono;
                    return (
                        <div
                            key={cat.id}
                            className="
                                bg-white 
                                rounded-3xl 
                                p-6 
                                shadow-md 
                                border border-gray-200 
                                flex 
                                flex-col 
                                justify-between
                            "
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

                            <div className="flex items-center justify-between mt-2">
                                <p className="text-xs text-gray-500">
                                    {cat.documentos.length} documento(s) disponible(s)
                                </p>
                                <button
                                    onClick={() => abrirCategoria(cat)}
                                    className="
                                        bg-[#397C3C] 
                                        hover:bg-[#2f612f] 
                                        transition 
                                        text-white 
                                        px-4 
                                        py-2 
                                        rounded-xl 
                                        text-sm 
                                        font-semibold
                                        shadow-sm
                                    "
                                >
                                    Ver documentos
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* MODAL DE DOCUMENTOS POR CATEGORÍA */}
            {categoriaActiva && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
                    <div className="bg-white w-[95%] max-w-3xl rounded-3xl shadow-2xl p-6 md:p-8 relative">

                        {/* Botón cerrar */}
                        <button
                            onClick={cerrarModal}
                            className="
                                absolute 
                                top-4 
                                right-4 
                                w-8 
                                h-8 
                                rounded-full 
                                bg-[#397C3C] 
                                text-white 
                                flex 
                                items-center 
                                justify-center 
                                hover:bg-[#2f612f] 
                                transition
                            "
                        >
                            <X size={18} />
                        </button>

                        {/* Encabezado del modal */}
                        <div className="flex items-start gap-3 mb-6">
                            <div className="w-10 h-10 rounded-2xl bg-[#397C3C]/10 flex items-center justify-center">
                                <FileText size={22} className="text-[#397C3C]" />
                            </div>
                            <div>
                                <h2 className="text-xl font-extrabold text-[#397C3C]">
                                    {categoriaActiva.titulo}
                                </h2>
                                <p className="text-sm text-gray-600 mt-1">
                                    Selecciona el documento que deseas consultar o descargar.
                                </p>
                            </div>
                        </div>

                        {/* Lista de documentos */}
                        <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                            {categoriaActiva.documentos.map((doc) => (
                                <div
                                    key={doc.nombre}
                                    className="
                                        flex 
                                        items-center 
                                        justify-between 
                                        p-4 
                                        border 
                                        rounded-2xl 
                                        bg-gray-50
                                    "
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center border border-gray-200">
                                            <FileText size={18} className="text-[#397C3C]" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-800 text-sm">
                                                {doc.nombre}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Formato PDF
                                            </p>
                                        </div>
                                    </div>

                                    {/* Botón de descarga (por ahora solo visual) */}
                                    <a
                                        href={doc.archivo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="
                                            inline-flex 
                                            items-center 
                                            gap-1 
                                            text-sm 
                                            font-semibold 
                                            text-[#397C3C] 
                                            hover:underline
                                        "
                                    >
                                        <Download size={16} />
                                        Descargar
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
