import ConversationItem from "./ConversationItem";

export default function ConversationList({
    tab,
    setTab,
    usuarios,
    conversaciones,
    usuarioSeleccionado,
    onSelectUser
}) {
    return (
        <div className="w-80 bg-white border-r p-4 overflow-y-auto">

            <div className="flex gap-2 mb-4">
                <button
                    onClick={() => setTab("todos")}
                    className={`flex-1 py-2 rounded-xl ${tab === "todos" ? "bg-[#397C3C] text-white" : "bg-gray-200"}`}
                >
                    Chats
                </button>

                <button
                    onClick={() => setTab("conversados")}
                    className={`flex-1 py-2 rounded-xl ${tab === "conversados" ? "bg-[#397C3C] text-white" : "bg-gray-200"}`}
                >
                    Conversados
                </button>
            </div>

            {tab === "todos" && usuarios.map(u => (
                <ConversationItem
                    key={u.id}
                    usuario={u}
                    ultimoMensaje={null}
                    onClick={() => onSelectUser(u.id)}
                    isActive={usuarioSeleccionado === u.id}
                />

            ))}

            {tab === "conversados" && conversaciones
                .filter(c => c && c.user) // ← evita errores
                .map(c => (
                    <ConversationItem
                        key={c.user.id}
                        usuario={c.user}
                        ultimoMensaje={c.ultimo_mensaje}
                        onClick={() => onSelectUser(c.user.id)}
                        isActive={usuarioSeleccionado === c.user.id}
                    />

                ))}
        </div>
    );
}
