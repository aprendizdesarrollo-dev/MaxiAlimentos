/**
 *  Componente: ForgotPassword.jsx
 * ---------------------------------
 * Este componente muestra un formulario sencillo para que el usuario escriba
 * su correo y reciba el enlace de recuperación de contraseña.
 * 
 *  Conecta al endpoint Laravel: POST /api/forgot-password
 * 
 *  Funcionalidad:
 * - Valida el email ingresado.
 * - Envía la solicitud al backend.
 * - Muestra mensajes de éxito o error según la respuesta.
 */

import React, { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
  const [correo, setCorreo] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setErr("");

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/forgot-password", {
        correo,
      });

      if (res.data.success) {
        setMsg(res.data.message);
      } else {
        setErr(res.data.message);
      }
    } catch (error) {
      const apiError = error.response?.data?.message || "Error interno del servidor.";
      setErr(apiError);
    }
  };

return (
  <section className="min-h-screen flex items-center justify-center bg-[#0D2611] px-4 py-10 relative overflow-hidden">
    {/* Fondo con luz radial suave */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,124,60,0.15)_0%,transparent_70%)]"></div>

    {/* Contenedor del cuadro */}
    <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md text-center transition-all duration-300 hover:shadow-[#397C3C]/30">
      {/* Logo */}
      <img
        src="../assets/logo.png"
        alt="Logo MaxiAlimentos"
        className="mx-auto mb-6 w-32"
      />

      <h2 className="text-2xl font-bold text-[#397C3C] mb-3">
        Recuperar Contraseña
      </h2>
      <p className="text-gray-600 mb-6 text-sm">
        Ingresa tu correo institucional para recibir un enlace de recuperación.
      </p>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="tu@maxialimentos.com"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#397C3C]"
        />
        <button
          type="submit"
          className="w-full bg-[#397C3C] hover:bg-[#5FA15E] text-white py-3 rounded-lg font-semibold transition-all duration-300"
        >
          Enviar enlace
        </button>
      </form>

      {/* Mensajes */}
      {msg && <p className="mt-5 text-green-600 font-medium">{msg}</p>}
      {err && <p className="mt-5 text-red-600 font-medium">{err}</p>}

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
