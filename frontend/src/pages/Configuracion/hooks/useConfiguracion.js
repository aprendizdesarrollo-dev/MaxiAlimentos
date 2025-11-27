import { useEffect, useState, useCallback, useRef } from "react";
import api from "../../../services/api";

export const useConfiguracion = () => {

    const [config, setConfig] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    // Guardar referencia interna para evitar sobrescritura
    const saveTimeout = useRef(null);

    // Cargar configuración inicial
    const loadConfig = useCallback(async () => {
        try {
            setLoading(true);
            const res = await api.get("/configuracion");
            setConfig(res.data.data);
            setError(null);
        } catch (err) {
            console.error("Error cargando configuración:", err);
            setError("No fue posible cargar la configuración.");
        } finally {
            setLoading(false);
        }
    }, []);

    // Guardar automáticamente con debounce
    const actualizarConfig = async (changes) => {
        if (!config) return;

        // Mezclar cambios con la config actual
        const updated = { ...config, ...changes };
        setConfig(updated);

        // Evitar muchos llamados seguidos
        if (saveTimeout.current) clearTimeout(saveTimeout.current);

        saveTimeout.current = setTimeout(async () => {
            try {
                setSaving(true);
                await api.put("/configuracion", updated);
                setError(null);
            } catch (err) {
                console.error("Error guardando configuración:", err);
                setError("No se pudieron guardar los cambios.");
            } finally {
                setSaving(false);
            }
        }, 800);
    };

    useEffect(() => {
        loadConfig();
    }, [loadConfig]);

    return {
        config,
        loading,
        saving,
        error,
        actualizarConfig,
        reload: loadConfig
    };
};
