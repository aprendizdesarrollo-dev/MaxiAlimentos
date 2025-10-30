import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api"; // Cliente Axios configurado
import { GoogleLogin } from "@react-oauth/google"; // Botón Google
import { jwtDecode } from "jwt-decode";

function Login() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  /**
   *  Login normal (correo + contraseña)
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/login", { correo, password });

      if (response.data.success) {
        localStorage.setItem("token", response.data.access_token);
        navigate("/dashboard");
      } else {
        setError(response.data.message || "Credenciales incorrectas");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Error de autenticación");
      } else {
        setError("Error al conectar con el servidor");
      }
    }
  };

  /**
   *  Login con Google
   */
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      if (!credentialResponse || !credentialResponse.credential) {
        setError("No se recibió el token de Google. Intenta de nuevo.");
        return;
      }

      const token = credentialResponse.credential;
      console.log("🟢 Token recibido:", token);

      const response = await api.post("/google-login", { token });

      if (response.data.success) {
        localStorage.setItem("token", response.data.access_token);

        if (response.data.requires_data) {
          navigate("/completar-perfil"); // 👈 redirige aquí
        } else {
          navigate("/dashboard");
        }
      } else {
        setError(response.data.message || "Error de autenticación con Google");
      }
    } catch (err) {
      console.error("Error en Login con Google:", err);
      setError("Error de conexión o autenticación con Google");
    }
  };


  return (
    <section className="min-h-screen flex items-center justify-center bg-[#0D2611] px-4 py-16">
      {/* Cuadro blanco unificado */}
      <div className="bg-white rounded-3xl shadow-2xl flex flex-col lg:flex-row overflow-hidden max-w-5xl w-full">

        {/* Columna izquierda: formulario */}
        <div className="w-full lg:w-1/2 p-10 flex flex-col justify-center">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img
              src="/assets/logo.png"
              alt="Logo MaxiAlimentos"
              className="w-32 h-auto"
            />
          </div>

          <h2 className="text-3xl font-bold text-[#397C3C] mb-2 text-center">
            ¡Bienvenido de nuevo!
          </h2>
          <p className="text-gray-600 mb-6 text-center">
            Ingresa con tu cuenta corporativa para acceder a la intranet.
          </p>

          {/*  Botón de Google */}
          <div className="flex justify-center mb-4">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() =>
                setError("Error al autenticar con Google. Intenta nuevamente.")
              }
              shape="rectangular"
              theme="outline"
              size="large"
              text="signin_with"
            />
          </div>

          {/* Divider */}
          <div className="flex items-center my-6">
            <hr className="flex-1 border-gray-300" />
            <span className="px-3 text-gray-500 text-sm">o</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* Formulario normal */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="tu@maxialimentos.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#5FA15E] outline-none"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#397C3C] outline-none"
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Recordarme
              </label>
              <a
                href="/forgot-password"
                className="text-[#397C3C] hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-[#397C3C] hover:bg-[#5FA15E] text-white py-2 rounded-lg font-semibold transition duration-300"
            >
              Iniciar sesión
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            ¿No tienes cuenta?{" "}
            <a
              href="/register"
              className="text-[#397C3C] hover:underline font-medium"
            >
              Regístrate aquí
            </a>
          </p>
        </div>

        {/* Separador vertical */}
        <div className="hidden lg:block w-[1px] bg-gradient-to-b from-[#397C3C]/10 via-[#397C3C]/40 to-[#397C3C]/10"></div>

        {/* Columna derecha */}
        <div className="w-full lg:w-1/2 relative flex flex-col justify-center items-center overflow-hidden">
          {/* Fondo degradado */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#E8F5E9] via-[#F9FFF9] to-[#E8F5E9]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,124,60,0.15)_0%,transparent_70%)]"></div>

          <div className="relative z-10 text-center p-10">
            <h2 className="text-3xl font-bold mb-4 text-[#397C3C]">
              Nutriendo a Colombia con calidad y sabor.
            </h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Accede al sistema interno de <strong>MaxiAlimentos</strong> para
              gestionar tu información, reportes y comunicarte con tu equipo de trabajo.
            </p>
            <p className="text-sm text-gray-500">
              © 2025 MaxiAlimentos S.A.S. — Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
