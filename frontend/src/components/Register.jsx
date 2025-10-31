/**
 * Componente: Register.jsx
 * --------------------------------------------------------
 * Registro corporativo de empleados (React + Laravel API)
 * Permite crear usuarios con datos laborales:
 *  - Nombre, correo, contraseña + confirmación
 *  - Cédula, cargo, área
 *
 * Envía la información al endpoint:
 *  POST http://127.0.0.1:8000/api/register
 *
 * Autor: Gonzo
 */
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    cedula: "",
    correo: "",
    cargo: "",
    area: "",
    password: "",
    password_confirmation: "",
  });

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validar dominio del correo
  const validarCorreo = (correo) => correo.endsWith("@maxialimentos.com");

  // Validar contraseña
  const validarPassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    if (!validarCorreo(form.correo)) {
      return setError("El correo debe pertenecer al dominio @maxialimentos.com");
    }

    if (!validarPassword(form.password)) {
      return setError("La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.");
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register-temp", form);

      if (response.data.success) {
        setMensaje("Código enviado al correo. Redirigiendo a verificación...");
        setTimeout(() => navigate("/verify-code", { state: { correo: form.correo } }), 2000);
      } else {
        setError("No se pudo enviar el código. Intenta de nuevo.");
      }
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || "Error al registrarte.";
      setError(msg);
    }
  };

 return (
  <section className="min-h-screen flex items-center justify-center bg-[#0D2611] px-4 py-16">
    {/* Cuadro blanco unificado */}
    <div className="bg-white rounded-3xl shadow-2xl flex flex-col lg:flex-row overflow-hidden max-w-5xl w-full">
      
      {/* Columna izquierda: Formulario de registro */}
      <div className="w-full lg:w-1/2 p-10 flex flex-col justify-center">
        {/* Logo */}
        <div className="flex justify-center mb-5">
          <img src={logo} alt="MaxiAlimentos Logo" className="w-28 h-auto" />
        </div>

        <h1 className="text-2xl font-bold text-[#397C3C] mb-4 text-center">
          Crear cuenta empresarial
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Completa tus datos para crear una cuenta en la intranet.
        </p>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {["nombre", "cedula", "cargo", "area"].map((campo) => (
            <div key={campo}>
              <label className="block text-sm font-semibold text-gray-700 mb-1 capitalize">
                {campo}
              </label>
              <input
                type="text"
                name={campo}
                value={form[campo]}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#397C3C]"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Correo institucional
            </label>
            <input
              type="email"
              name="correo"
              value={form.correo}
              onChange={handleChange}
              required
              placeholder="ejemplo@maxialimentos.com"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#397C3C]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#397C3C]"
            />
            <p className="text-xs text-gray-500 mt-1">
              Debe tener mínimo 8 caracteres, una mayúscula y un número.
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Confirmar contraseña
            </label>
            <input
              type="password"
              name="password_confirmation"
              value={form.password_confirmation}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#397C3C]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#397C3C] text-white py-3 rounded-lg font-semibold hover:bg-[#5FA15E] transition-all"
          >
            Registrarme
          </button>
        </form>

        {/* Mensajes */}
        {mensaje && (
          <p className="mt-5 text-green-600 font-medium text-center">
            {mensaje}
          </p>
        )}
        {error && (
          <p className="mt-5 text-red-600 font-medium text-center">
            {error}
          </p>
        )}
      </div>

      {/* Separador vertical */}
      <div className="hidden lg:block w-[1px] bg-gradient-to-b from-[#397C3C]/10 via-[#397C3C]/40 to-[#397C3C]/10"></div>

      {/* Columna derecha: Fondo degradado y texto institucional */}
      <div className="w-full lg:w-1/2 relative flex flex-col justify-center items-center overflow-hidden">
        {/* Capa de fondo con degradado */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#E8F5E9] via-[#F9FFF9] to-[#E8F5E9]"></div>
        {/* Luz radial suave */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,124,60,0.15)_0%,transparent_70%)]"></div>

        {/* Contenido institucional */}
        <div className="relative z-10 text-center p-10">
          <h2 className="text-3xl font-bold mb-4 text-[#397C3C]">
            Únete al equipo MaxiAlimentos.
          </h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Crea tu cuenta corporativa para acceder a herramientas internas,
            reportes y recursos diseñados para el crecimiento de la empresa.
          </p>
          <p className="text-sm text-gray-500">
            © 2025 MaxiAlimentos S.A.S. — Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  </section>
);

};
