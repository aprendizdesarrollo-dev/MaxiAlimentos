import { useState, useEffect } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

export function useComunicados() {
    const [comunicados, setComunicados] = useState([]);
    const [loading, setLoading] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);

    const [editando, setEditando] = useState(null);
    const [comunicadoEliminar, setComunicadoEliminar] = useState(null);
    const [comunicadoActivo, setComunicadoActivo] = useState(null);

    const [nuevo, setNuevo] = useState({ titulo: "", descripcion: "" });

    // === Cargar comunicados ===
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get("/comunicados");
                setComunicados(res.data.data || []);
            } catch {
                toast.error("Error al cargar los comunicados");
            }
        };
        fetchData();
    }, []);

    // === Crear / Editar ===
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (editando) {
                await api.put(`/comunicados/${editando.id}`, nuevo);
                toast.success("Comunicado actualizado");
            } else {
                await api.post("/comunicados", {
                    ...nuevo,
                    autor: "Administrador General",
                });
                toast.success("Comunicado creado");
            }

            const res = await api.get("/comunicados");
            setComunicados(res.data.data || []);

            setShowModal(false);
            setEditando(null);
            setNuevo({ titulo: "", descripcion: "" });

        } catch {
            toast.error("Error al guardar");
        } finally {
            setLoading(false);
        }
    };

    // === Editar ===
    const handleEdit = (item) => {
        setEditando(item);
        setNuevo({ titulo: item.titulo, descripcion: item.descripcion });
        setShowModal(true);
    };

    // === Eliminar ===
    const handleDelete = async () => {
        setLoading(true);  // ✔️ ACTIVAMOS EL MODO CARGANDO

        try {
            await api.delete(`/comunicados/${comunicadoEliminar.id}`);

            setComunicados((prev) =>
                prev.filter((c) => c.id !== comunicadoEliminar.id)
            );

            toast.success("Comunicado eliminado");
            setShowDeleteModal(false);
            setComunicadoEliminar(null);

        } catch {
            toast.error("Error al eliminar comunicado");
        } finally {
            setLoading(false); 
        }
    };


    // === Ver Detalle ===
    const handleView = (item) => {
        setComunicadoActivo(item);
        setShowViewModal(true);
    };

    return {
        comunicados,
        loading,
        showModal,
        setShowModal,
        showDeleteModal,
        setShowDeleteModal,
        showViewModal,
        setShowViewModal,
        nuevo,
        setNuevo,
        editando,

        comunicadoEliminar,
        setComunicadoEliminar,   // ✔️ FALTABA
        comunicadoActivo,
        setComunicadoActivo,     // ✔️ FALTABA

        handleSubmit,
        handleEdit,
        handleView,
        handleDelete,
    };

}
