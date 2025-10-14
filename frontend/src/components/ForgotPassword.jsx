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

import { useState } from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  // 🔹 Estados para manejar los datos del formulario y los mensajes
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // 🔹 Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      // Envío de datos al backend (endpoint de Laravel)
      const response = await fetch("http://127.0.0.1:8000/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      // ✅ Si el backend responde correctamente
      if (response.ok) {
        setMessage(data.message || "Revisa tu correo para continuar.");
        setEmail("");
      } else {
        setError(data.error || "No se encontró una cuenta con ese correo.");
      }
    } catch (err) {
      setError("Error de conexión con el servidor.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#5FA15E] to-[#397C3C] px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">
        
        {/* 🔹 Logo corporativo */}
        <div className="flex justify-center mb-6">
          <img
            src="/assets/logo.png"
            alt="Logo MaxiAlimentos"
            className="w-32 h-auto"
          />
        </div>

        {/* 🔹 Título */}
        <h2 className="text-2xl font-bold text-center text-[#397C3C] mb-4">
          Recuperar Contraseña
        </h2>

        {/* 🔹 Formulario */}
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

          {/* 🔹 Mensajes dinámicos */}
          {message && (
            <p className="text-green-600 text-sm text-center">{message}</p>
          )}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* 🔹 Botón principal */}
          <button
            type="submit"
            className="w-full bg-[#397C3C] hover:bg-[#5FA15E] text-white py-2 rounded-lg font-semibold transition duration-300"
          >
            Enviar enlace
          </button>
        </form>

        {/* 🔹 Enlace de retorno */}
        <p className="text-center text-gray-600 mt-6">
          ¿Recordaste tu contraseña?{" "}
          <Link to="/login" className="text-[#397C3C] hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
