import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";

function Login() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Redirección si ya hay sesión activa
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, [navigate]);

  // Recordar correo si ya fue guardado
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) setCorreo(savedEmail);
  }, []);

  // Login normal
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!correo || !password) {
      setError("Por favor completa todos los campos.");
      toast.error("Por favor completa todos los campos.");
      return;
    }
    if (!correo.endsWith("@maxialimentos.com")) {
      setError("Debes usar tu correo institucional @maxialimentos.com");
      toast.error("Debes usar tu correo institucional @maxialimentos.com");
      return;
    }

    try {
      setLoading(true);
      const response = await api.post("/login", { correo, password });

      if (response.data.success) {
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("rememberedEmail", correo);
        toast.success("Inicio de sesión exitoso");
        navigate("/dashboard");
      } else {
        setError(response.data.message || "Credenciales incorrectas");
        toast.error(response.data.message || "Credenciales incorrectas");
      }
    } catch (err) {
      console.error("Error en login:", err);
      if (err.response) {
        setError(err.response.data.message || "Error de autenticación");
        toast.error(err.response.data.message || "Error de autenticación");
      } else {
        setError("Error al conectar con el servidor");
        toast.error("Error al conectar con el servidor");
      }
    } finally {
      setLoading(false);
    }
  };

  // Login con Google
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      if (!credentialResponse || !credentialResponse.credential) {
        setError("No se recibió el token de Google. Intenta de nuevo.");
        toast.error("No se recibió el token de Google. Intenta de nuevo.");
        return;
      }

      const token = credentialResponse.credential;
      const response = await api.post("/google-login", { token });

      if (response.data.success) {
        localStorage.setItem("token", response.data.access_token);
        if (response.data.requires_data) {
          toast("Completa tu perfil antes de continuar");
          navigate("/completar-perfil");
        } else {
          toast.success("Inicio de sesión con Google exitoso");
          navigate("/dashboard");
        }
      } else {
        setError(response.data.message || "Error de autenticación con Google");
        toast.error(response.data.message || "Error de autenticación con Google");
      }
    } catch (err) {
      console.error("Error en Login con Google:", err);
      setError("Error de conexión o autenticación con Google");
      toast.error("Error de conexión o autenticación con Google");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#0D2611] px-4 py-16">
      <div className="bg-white rounded-3xl shadow-2xl flex flex-col lg:flex-row overflow-hidden max-w-5xl w-full">
        {/* Columna izquierda: formulario */}
        <div className="w-full lg:w-1/2 p-10 flex flex-col justify-center">
          <div className="flex justify-center mb-6">
            <img
              src="../assets/logo.png"
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
              width="280"
            />
          </div>

          <div className="flex items-center my-6">
            <hr className="flex-1 border-gray-300" />
            <span className="px-3 text-gray-500 text-sm">o</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* Formulario */}
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
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#397C3C] outline-none"
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
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#397C3C] outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2 text-gray-500 text-sm select-none"
                >
                  {showPassword ? "Ocultar" : "Ver"}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2 accent-[#397C3C]" />
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
              disabled={loading}
              className={`w-full py-2 rounded-lg font-semibold text-white transition duration-300 ${loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#397C3C] hover:bg-[#5FA15E]"
                }`}
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                  <span>Ingresando...</span>
                </div>
              ) : (
                "Iniciar sesión"
              )}
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

        {/* Columna derecha */}
        <div className="hidden lg:flex w-1/2 relative flex-col justify-center items-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#E8F5E9] via-[#F9FFF9] to-[#E8F5E9]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,124,60,0.15)_0%,transparent_70%)]" />

          <div className="relative z-10 text-center p-10">
            <h2 className="text-3xl font-bold mb-4 text-[#397C3C]">
              Nutriendo a Colombia con calidad y sabor.
            </h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Accede al sistema interno de <strong>MaxiAlimentos</strong> para gestionar tu información, reportes y comunicarte con tu equipo de trabajo.
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
