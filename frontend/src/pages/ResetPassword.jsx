/**
 * Componente: ResetPassword.jsx
 * --------------------------------------------------------
 * Versión final funcional:
 *  Cada input tiene su propio ojo FaEye / FaEyeSlash.
 *  Sin manipular el DOM manualmente.
 *  React maneja el cambio de tipo dinámicamente.
 *  Estilo corporativo MaxiAlimentos.
 */

import { useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ResetPassword() {
  // Token + email desde URL
  const { token } = useParams();
  const [searchParams] = useSearchParams();
  const emailParam = searchParams.get("correo");

  // Datos del formulario
  const [form, setForm] = useState({
    correo: emailParam || "",
    password: "",
    password_confirmation: "",
  });

  // Estados generales
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Estados para mostrar/ocultar contraseñas
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();

  // Manejar cambios del formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Enviar formulario a Laravel API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/password/reset", {
           correo: form.correo,
           password: form.password,
           password_confirmation: form.password_confirmation,
           token: token,
      });

      if (res.data.success) {
        setMessage(res.data.message);
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error al restablecer la contraseña.");
    } finally {
      setLoading(false);
    }
  };

  return (
  <section className="min-h-screen flex items-center justify-center bg-[#0D2611] relative px-4 overflow-hidden">
    {/* Fondo con luz radial */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,124,60,0.15)_0%,transparent_70%)]"></div>

    {/* Cuadro blanco */}
    <div className="relative z-10 bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md text-center transition-all duration-300 hover:shadow-[#397C3C]/30">
      {/* Logo */}
      <img
        src="/assets/logo.png"
        alt="Logo MaxiAlimentos"
        className="mx-auto mb-6 w-40"
      />

      {/* Título */}
      <h2 className="text-2xl font-bold text-[#397C3C] mb-4">
        Restablecer Contraseña
      </h2>
      <p className="text-gray-600 text-sm mb-6">
        Ingresa tu nueva contraseña para acceder nuevamente a la intranet.
      </p>

      {/* Mensajes */}
      {message && (
        <div className="bg-green-100 text-green-700 rounded-lg py-2 px-3 mb-4 text-sm font-medium">
          {message}
        </div>
      )}
      {error && (
        <div className="bg-red-100 text-red-700 rounded-lg py-2 px-3 mb-4 text-sm font-medium">
          {error}
        </div>
      )}

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-5 text-left">
        {/* Correo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Correo electrónico
          </label>
          <input
            type="email"
            name="correo"
            value={form.correo}
            onChange={handleChange}
            required
            placeholder="tu@maxialimentos.com"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#397C3C]"
          />
        </div>

        {/* Nueva contraseña */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nueva contraseña
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#397C3C]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#397C3C]"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Confirmar contraseña */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirmar contraseña
          </label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              name="password_confirmation"
              value={form.password_confirmation}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#397C3C]"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#397C3C]"
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Botón */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#397C3C] hover:bg-[#5FA15E] text-white py-3 rounded-lg font-semibold transition-all duration-300"
        >
          {loading ? "Guardando..." : "Actualizar contraseña"}
        </button>
      </form>

      {/* Enlace volver */}
      <p className="mt-6 text-sm text-gray-600">
        ¿Recordaste tu contraseña?{" "}
        <a
          href="/login"
          className="text-[#397C3C] font-semibold hover:underline"
        >
          Inicia sesión
        </a>
      </p>
    </div>
  </section>
);

};
