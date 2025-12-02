import { useEffect, useState } from "react";
import api from "../../../services/api";

// Maneja las estadísticas del dashboard
export const useStats = () => {
    const [stats, setStats] = useState(null);

    const loadStats = async () => {
        try {
            const res = await api.get("/dashboard-estadisticas");
            setStats(res.data);
        } catch (err) {
            console.error("Error cargando estadísticas:", err);
        }
    };

    useEffect(() => {
        loadStats();
    }, []);

    return { stats, loadStats };
};