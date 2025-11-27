import { useEffect, useState } from "react";
import axios from "axios";

export function useNotificaciones() {
    const [notificaciones, setNotificaciones] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        cargar();
    }, []);

    const cargar = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:8000/api/notificaciones");
            setNotificaciones(res.data.data);
        } catch (error) {
            console.error("Error cargando notificaciones:", error);
        } finally {
            setLoading(false);
        }
    };

    return {
        notificaciones,
        loading,
        setNotificaciones,
        cargar
    };
}
