import { useEffect, useState } from "react";
import api from "../../../services/api";

// Maneja la información de cumpleaños y el modal
export const useCumpleanios = () => {
    const [cumpleData, setCumpleData] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Cargar info básica para la card
    useEffect(() => {
        const loadCumple = async () => {
            try {
                const res = await api.get("/cumpleanios");
                setCumpleData(res.data);
            } catch (err) {
                console.error("Error al obtener cumpleanios:", err);
            }
        };

        loadCumple();
    }, []);

    const abrirModal = async () => {
        try {
            const res = await api.get("/cumpleanios");
            setCumpleData(res.data);
            setShowModal(true);
        } catch (err) {
            console.error("Error al abrir modal de cumpleanios:", err);
        }
    };

    const cerrarModal = () => setShowModal(false);

    return { cumpleData, showModal, abrirModal, cerrarModal };
};
