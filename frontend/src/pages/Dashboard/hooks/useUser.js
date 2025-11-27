import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";

export const useUser = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadUser = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    navigate("/login");
                    return;
                }

                const res = await api.get("/perfil", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUser(res.data.data);
            } catch (error) {
                console.error("Error al obtener usuario:", error);
                localStorage.removeItem("token");
                navigate("/login");
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, [navigate]);

    // -------------------------
    // LOGOUT AÑADIDO AQUÍ
    // -------------------------
    const handleLogout = async () => {
        try {
            await api.post("/logout");
        } catch (e) {}
        localStorage.removeItem("token");
        navigate("/login");
    };

    return { user, loading, handleLogout };
};
