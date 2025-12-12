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
                const [
                    beneficiosRes,
                    eventosRes,
                    comunicadosRes,
                    cumpleRes
                ] = await Promise.all([
                    api.get("/beneficios"),
                    api.get("/eventos"),
                    api.get("/comunicados"),
                    api.get("/notificaciones/cumpleanios") 
                ]);

                setBeneficios(beneficiosRes.data.data || []);
                setEventos(eventosRes.data.data || []);
                setComunicados(comunicadosRes.data.data || []);
                setCumpleanios(cumpleRes.data.data || []);

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
