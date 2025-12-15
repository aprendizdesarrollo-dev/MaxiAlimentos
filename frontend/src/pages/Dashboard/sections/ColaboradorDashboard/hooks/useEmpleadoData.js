import { useEffect, useState } from "react";
import api from "../../../../../services/api";

export function useEmpleadoData() {

    const [beneficios, setBeneficios] = useState([]);
    const [eventos, setEventos] = useState([]);
    const [comunicados, setComunicados] = useState([]);
    const [cumpleanios, setCumpleanios] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const token = localStorage.getItem("token");

                const [
                    beneficiosRes,
                    eventosRes,
                    comunicadosRes,
                ] = await Promise.all([
                    api.get("/beneficios", {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    api.get("/eventos", {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    api.get("/comunicados", {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                ]);

                setBeneficios(beneficiosRes.data.data || []);
                setEventos(eventosRes.data.data || []);
                setComunicados(comunicadosRes.data.data || []);

                // 👇 cumpleaños aparte
                try {
                    const cumpleRes = await api.get("/notificaciones/cumpleanios", {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setCumpleanios(cumpleRes.data.data || []);
                } catch (e) {
                    console.warn("Cumpleaños no disponibles para empleado");
                    setCumpleanios([]);
                }

            } catch (error) {
                console.error("Error cargando datos del dashboard empleado", error);
            } finally {
                setLoading(false);
            }
        };

        cargarDatos();
    }, []);
    return {
        beneficios,
        eventos,
        comunicados,
        cumpleanios,
        loading,
    };
}
