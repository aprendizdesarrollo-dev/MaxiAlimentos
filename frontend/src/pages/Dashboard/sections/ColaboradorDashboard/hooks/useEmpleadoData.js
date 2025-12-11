// src/pages/Dashboard/ColaboradorDashboard/hooks/useEmpleadoData.js

import api from "../../../../../services/api";
import { useEffect, useState } from "react";

export function useEmpleadoData() {

    const [data, setData] = useState({
        beneficios: [],
        eventos: [],
        comunicados: [],
        documentos: [],
    });

    useEffect(() => {
        const cargar = async () => {
            const [b, e, c] = await Promise.all([
                api.get("/beneficios"),
                api.get("/eventos"),
                api.get("/comunicados"),
            ]);

            setData({
                beneficios: b.data.data,
                eventos: e.data.data,
                comunicados: c.data.data,
            });
        };

        cargar();
    }, []);

    return data;
}
