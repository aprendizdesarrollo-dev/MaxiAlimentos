/**
 * 📄 Componente: ForgotPassword.jsx
 * ---------------------------------
 * Este componente muestra un formulario sencillo para que el usuario escriba
 * su correo y reciba el enlace de recuperación de contraseña.
 * 
 * 🔗 Conecta al endpoint Laravel: POST /api/forgot-password
 * 
 * 🧠 Funcionalidad:
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
    <div className="flex justify-center items-center h-screen bg-green-700">
      <div className="bg-white shadow-lg p-10 rounded-2xl w-[90%] md:w-[420px] text-center">
        <img src="../assets/logo.png" alt="Logo MaxiAlimentos" className="mx-auto mb-6 w-32" />
        <h2 className="text-2xl font-bold text-green-700 mb-4">Recuperar Contraseña</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Correo institucional"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-green-600"
          />
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 transition-all"
          >
            Enviar enlace
          </button>
        </form>

        {msg && <p className="mt-4 text-green-600 font-medium">{msg}</p>}
        {err && <p className="mt-4 text-red-600 font-medium">{err}</p>}

        <p className="mt-6 text-sm text-gray-600">
          ¿Recordaste tu contraseña? <a href="/login" className="text-green-700 font-semibold">Inicia sesión</a>
        </p>
      </div>
    </div>
  );
}
