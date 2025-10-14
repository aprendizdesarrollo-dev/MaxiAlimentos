import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        setError(data.error || "Credenciales incorrectas");
      }
    } catch (err) {
      setError("Error al conectar con el servidor");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#5FA15E] to-[#397C3C] px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8 relative">

        {/* 🔹 Aquí va el logo de la empresa */}
        <div className="flex justify-center mb-6">
          <img
            src="/assets/logo.png"
            alt="Logo MaxiAlimentos"
            className="w-32 h-auto"
          />
        </div>

        <h2 className="text-2xl font-bold text-center text-[#397C3C] mb-4">
          Iniciar Sesión
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5FA15E] outline-none"
              placeholder="tu@maxialimentos.com"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#397C3C] outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-[#397C3C] hover:bg-[#5FA15E] text-white py-2 rounded-lg font-semibold transition duration-300"
          >
            Ingresar
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          <a href="/forgot-password" className="text-[#397C3C] hover:underline">
            ¿Olvidaste tu contraseña?
          </a>
        </p>


        <p className="text-center text-gray-600 mt-6">
          ¿No tienes cuenta?{" "}
          <a href="/register" className="text-[#397C3C] hover:underline">
            Regístrate aquí
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
