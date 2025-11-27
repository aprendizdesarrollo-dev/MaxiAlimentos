import { useState } from "react";
import { Users, Settings } from "lucide-react";
import NotificationBell from "../../../components/Notificaciones/NotificationBell.jsx";
import NotificationList from "../../../components/Notificaciones/NotificationList.jsx";
import { useNotificaciones } from "../../../hooks/useNotificaciones.jsx";



export default function Header({ user, onConfigClick, onPerfilClick }) {

   
    const { notificaciones, marcarLeida } = useNotificaciones();
    const [open, setOpen] = useState(false);

    return (
        <section
            className="
                rounded-3xl p-8 bg-gradient-to-r 
                from-[#397C3C] to-[#5bad5c] 
                text-white shadow-xl 
                relative overflow-hidden
            "
        >
            <div className="absolute right-5 top-5 opacity-20">
                <Users size={120} />
            </div>

            <div className="relative z-10 flex justify-between items-center">
                <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-white shadow-md">
                        {user?.foto_perfil ? (
                            <img
                                src={
                                    user.foto_perfil.startsWith("http")
                                        ? user.foto_perfil
                                        : `http://127.0.0.1:8000/storage/${user.foto_perfil}`
                                }
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="text-gray-100">Avatar</span>
                        )}
                    </div>

                    <div>
                        <h1 className="text-4xl font-extrabold">
                            Bienvenido, {user?.nombre}
                        </h1>

                        <p className="text-lg opacity-90">{user?.cargo}</p>

                        <button
                            onClick={onPerfilClick}
                            className="
                                mt-3 
                                relative 
                                text-white font-semibold 
                                text-sm 
                                transition-all 
                                hover:text-white 
                                pl-1
                                after:content-[''] 
                                after:absolute 
                                after:left-0 
                                after:bottom-[-3px] 
                                after:w-0 
                                after:h-[2px] 
                                after:bg-white 
                                after:transition-all 
                                after:duration-300 
                                hover:after:w-full
                                hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]
                            "
                        >
                            Ver mi perfil →
                        </button>
                    </div>
                </div>

                <div className="text-right flex flex-col items-end gap-2">
                    <p className="text-sm opacity-90">
                        {new Date().toLocaleDateString("es-CO", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>

                    <button
                        onClick={onConfigClick}
                        className="
                            flex items-center gap-2 
                            bg-white/20 
                            hover:bg-white/30 
                            text-white 
                            text-sm 
                            font-medium 
                            px-4 py-2 
                            rounded-full 
                            border border-white/30 
                            transition
                        "
                    >
                        <Settings size={16} />
                        Configuración
                    </button>

                    {/* 🔔 CAMPANA DE NOTIFICACIONES */}
                    <NotificationBell
                        count={notificaciones.filter(n => !n.leida).length}
                        onClick={() => setOpen(!open)}
                    />

                    {/* LISTA DE NOTIFICACIONES */}
                    {open && (
                        <NotificationList
                            notificaciones={notificaciones}
                            onRead={marcarLeida}
                        />
                    )}
                </div>
            </div>
        </section>
    );
}
