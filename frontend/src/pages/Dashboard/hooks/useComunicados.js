import { useEffect, useState } from "react";
import api from "../../../services/api";

// Maneja los comunicados recientes del dashboard
export const useComunicados = () => {
    const [comunicados, setComunicados] = useState([]);

    useEffect(() => {
        const loadComunicados = async () => {
            try {
                const res = await api.get("/comunicados");
                setComunicados(res.data.data || []);
            } catch (error) {
                console.error("Error cargando comunicados:", error);
                setComunicados([]);
            }
        };

        loadComunicados();
    }, []);

    return { comunicados };
};
