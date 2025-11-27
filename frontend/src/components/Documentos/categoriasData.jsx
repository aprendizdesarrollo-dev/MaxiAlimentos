import {
    BriefcaseBusiness,
    Building2,
    HeartHandshake,
    Globe2,
    ShieldCheck
} from "lucide-react";

export const CATEGORIAS = [
    {
        id: "laborales",
        titulo: "Documentos laborales individuales",
        descripcion: "Desprendibles, certificados y vacaciones.",
        icono: BriefcaseBusiness,
        documentos: [
            { nombre: "Desprendible de nómina", archivo: "#" },
            { nombre: "Certificado laboral", archivo: "#" },
            { nombre: "Certificado de aportes", archivo: "#" },
            { nombre: "Historial de vacaciones", archivo: "#" },
        ]
    },
    {
        id: "corporativos",
        titulo: "Documentos corporativos",
        descripcion: "Manual, políticas y reglamentos.",
        icono: Building2,
        documentos: [
            { nombre: "Tratamiento de datos", archivo: "#" },
            { nombre: "Código de ética", archivo: "#" },
            { nombre: "Reglamento interno", archivo: "#" },
            { nombre: "Bioseguridad", archivo: "#" },
        ]
    },
    {
        id: "bienestar",
        titulo: "Bienestar y RRHH",
        descripcion: "Formatos y guías para colaboradores.",
        icono: HeartHandshake,
        documentos: [
            { nombre: "Formato de permisos", archivo: "#" },
            { nombre: "Incapacidades", archivo: "#" },
            { nombre: "Guía de beneficios", archivo: "#" },
        ]
    },
    {
        id: "generales",
        titulo: "Documentos generales",
        descripcion: "Información institucional.",
        icono: Globe2,
        documentos: [
            { nombre: "Misión y visión", archivo: "#" },
        ]
    },
    {
        id: "legales",
        titulo: "Documentos legales",
        descripcion: "Documentos obligatorios externos.",
        icono: ShieldCheck,
        documentos: [
            { nombre: "Política de cookies", archivo: "#" },
            { nombre: "Certificado de sanidad", archivo: "#" },
        ]
    },
];
