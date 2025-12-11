// src/pages/Dashboard/ColaboradorDashboard/layout/HeaderEmpleado.jsx

export default function HeaderEmpleado({ user }) {

    return (
        <header className="w-full bg-white shadow-md py-4 px-8 flex items-center justify-between">

            <h2 className="text-2xl font-semibold text-[#397C3C]">
                Bienvenido, {user.nombre}
            </h2>

            <div className="flex items-center gap-4">
                <p className="text-gray-600">{user.correo}</p>
                <img
                    src={user.foto_perfil ? `http://127.0.0.1:8000/storage/${user.foto_perfil}` : "/avatar.png"}
                    alt="Foto"
                    className="w-10 h-10 rounded-full border"
                />
            </div>
        </header>
    );
}
