import { Bell } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import NotificationList from "./NotificationList";
import { useNotificaciones } from "../../hooks/useNotificaciones";

export default function NotificationBell() {
    const { notificaciones, setNotificaciones, cargar } = useNotificaciones();
    const [open, setOpen] = useState(false);
    const bellRef = useRef(null);

    const noLeidas = notificaciones.filter(n => !n.leida).length;

    useEffect(() => {
        const handleClick = (e) => {
            if (bellRef.current && !bellRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const handleToggle = async () => {
        const estado = !open;
        setOpen(estado);

        if (estado) {
            await cargar();

            await axios.put("http://127.0.0.1:8000/api/notificaciones/marcar-leidas");

            const actualizadas = notificaciones.map(n => ({
                ...n,
                leida: true,
            }));

            setNotificaciones(actualizadas);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (!open) {
                cargar();
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [open]);

    return (
        <div ref={bellRef} className="relative">
            <button
                onClick={handleToggle}
                className="
                    relative
                    p-2
                    rounded-full
                    hover:bg-white/15
                    transition
                    border border-white/20
                "
            >
                <Bell size={22} className="text-white" />

                {noLeidas > 0 && !open && (
                    <span
                        className="
                            absolute -top-1 -right-1
                            bg-red-600 text-white text-[10px] font-bold
                            min-w-[18px] h-[18px]
                            flex items-center justify-center
                            rounded-full
                            shadow-lg shadow-red-600/40
                            animate-pulse
                        "
                    >
                        {noLeidas}
                    </span>
                )}
            </button>

            {open && (
                <div className="fixed right-6 top-20 z-[9999] w-80">
                    <NotificationList />
                </div>
            )}
        </div>
    );
}
