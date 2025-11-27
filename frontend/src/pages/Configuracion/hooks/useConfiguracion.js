import { useEffect, useState } from "react";
import api from "../../../services/api";

export const useConfiguracion = () => {
    const [config, setConfig] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const loadConfig = async () => {
        try {
            setLoading(true);
            const res = await api.get("/configuracion");
            setConfig(res.data.data);
        } catch (err) {
            console.error("Error cargando configuración:", err);
        } finally {
            setLoading(false);
        }
    };

    const actualizarConfig = async (changes) => {
        if (!config) return;

        const updated = { ...config, ...changes };
        setConfig(updated);
        setSaving(true);

        try {
            await api.put("/configuracion", updated);
        } catch (err) {
            console.error("Error guardando configuración:", err);
        } finally {
            setSaving(false);
        }
    };

    useEffect(() => {
        loadConfig();
    }, []);

    return { config, loading, saving, actualizarConfig, reload: loadConfig };
};
