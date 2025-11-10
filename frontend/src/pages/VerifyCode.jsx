import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function VerifyCode() {
  const location = useLocation();
  const navigate = useNavigate();

  const correo = location.state?.correo || ""; // Correo recibido desde Register.jsx
  const [code, setCode] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Para evitar doble clic
  const [reenviando, setReenviando] = useState(false); // Estado de reenvío

  // Enviar código ingresado por el usuario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/verify-temp", {
        correo,
        code,
      });

      if (response.data.success) {
        setMensaje("Cuenta verificada correctamente. Serás redirigido al login...");
        setTimeout(() => navigate("/login"), 2500);
      } else {
        setError(response.data.message || "Código incorrecto o expirado.");
      }
    } catch (err) {
      console.error("Error al verificar:", err);
      const msg = err.response?.data?.error || "Error al verificar el código. Intenta nuevamente.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // Permite reenviar el código de verificación
  const reenviarCodigo = async () => {
    if (!correo) {
      return setError("No se puede reenviar el código. Falta el correo.");
    }

    setReenviando(true);
    setMensaje("");
    setError("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register-temp", {
        correo, // solo se necesita el correo original
      });

      if (response.data.success) {
        setMensaje("Nuevo código enviado al correo institucional.");
      } else {
        setError(response.data.message || "No se pudo reenviar el código.");
      }
    } catch (err) {
      console.error("Error al reenviar código:", err);
      const msg = err.response?.data?.message || "Error al reenviar el código.";
      setError(msg);
    } finally {
      setReenviando(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#0D2611] px-4 py-16 relative overflow-hidden">
      {/* Fondo con luz radial */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,124,60,0.15)_0%,transparent_70%)]"></div>

      {/* Cuadro principal */}
      <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md text-center transition-all duration-300 hover:shadow-[#397C3C]/30">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="MaxiAlimentos" className="w-28 h-auto" />
        </div>

        {/* Título */}
        <h1 className="text-2xl font-bold text-[#397C3C] mb-3">
          Verificar tu cuenta
        </h1>
        <p className="text-gray-600 mb-6 text-sm">
          Ingresa el código de verificación que enviamos a tu correo institucional:
          <span className="block text-[#397C3C] font-medium mt-1">{correo}</span>
        </p>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Código de verificación"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            maxLength={6}
            className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-[#397C3C] text-center text-2xl tracking-[0.5em] font-semibold text-gray-800"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? "bg-gray-400" : "bg-[#397C3C] hover:bg-[#5FA15E]"
            } text-white py-3 rounded-lg font-semibold transition-all duration-300`}
          >
            {loading ? "Verificando..." : "Confirmar código"}
          </button>
        </form>

        {/* Mensajes */}
        {mensaje && <p className="mt-5 text-green-600 font-medium">{mensaje}</p>}
        {error && <p className="mt-5 text-red-600 font-medium">{error}</p>}

        {/* Enlace volver / reenviar */}
        <p className="mt-6 text-sm text-gray-600">
          ¿No recibiste el código?{" "}
          <button
            type="button"
            onClick={reenviarCodigo}
            disabled={reenviando}
            className="text-[#397C3C] font-semibold hover:underline disabled:opacity-60"
          >
            {reenviando ? "Reenviando..." : "Reenviar código"}
          </button>
        </p>
      </div>
    </section>
  );
}
