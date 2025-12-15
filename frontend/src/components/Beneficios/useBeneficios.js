import { useEffect, useState } from "react";
import api from "../../services/api";

// Maneja todo lo de beneficios y su modal
export const useBeneficios = () => {
    const [beneficios, setBeneficios] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // Cargar beneficios al inicio
    useEffect(() => {
        const loadBeneficios = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await api.get("/beneficios", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setBeneficios(res.data.data || []);
            } catch (error) {
                console.error("Error cargando beneficios:", error);
            }
        };

        loadBeneficios();
    }, []);

    const abrirModal = () => setShowModal(true);
    const cerrarModal = () => setShowModal(false);

    // Crear beneficio
    const crearBeneficio = async (formData) => {
        try {
            setCargando(true);

            const res = await api.post("/beneficios", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res.data.success) {
                setBeneficios((prev) => [...prev, res.data.data]);
            }
        } catch (err) {
            console.error(err);
            alert("Error creando beneficio.");
        } finally {
            setCargando(false);
        }
    };

    // Editar beneficio
    const editarBeneficio = async (id, formData) => {
        try {
            setCargando(true);
            formData.append("_method", "PUT");

            const res = await api.post(`/beneficios/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res.data.success) {
                setBeneficios((prev) =>
                    prev.map((b) => (b.id === id ? res.data.data : b))
                );
            }
        } catch (err) {
            console.error(err);
            alert("Error editando beneficio.");
        } finally {
            setCargando(false);
        }
    };

    // Eliminar beneficio
    const eliminarBeneficio = async (id) => {
        try {
            setCargando(true);
            await api.delete(`/beneficios/${id}`);
            setBeneficios((prev) => prev.filter((b) => b.id !== id));
        } catch (err) {
            console.error(err);
            alert("Error eliminando beneficio.");
        } finally {
            setCargando(false);
        }
    };

    return {
        beneficios,
        cargando,
        showModal,
        abrirModal,
        cerrarModal,
        crearBeneficio,
        editarBeneficio,
        eliminarBeneficio,
    };
};
