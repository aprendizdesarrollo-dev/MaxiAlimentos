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
 * Autor: Gonzo & Ricardo 😎
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
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-[#397C3C] to-[#2b5d2b]">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-[90%] md:w-[500px] text-center">
        {/* Logo */}
        <div className="flex justify-center mb-5">
          <img src={logo} alt="MaxiAlimentos Logo" className="w-28 h-auto" />
        </div>

        <h1 className="text-2xl font-bold text-[#397C3C] mb-4">Crear cuenta empresarial</h1>
        <p className="text-gray-600 mb-6">Completa tus datos para crear una cuenta en la intranet.</p>

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
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#397C3C]"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Correo institucional</label>
            <input
              type="email"
              name="correo"
              value={form.correo}
              onChange={handleChange}
              required
              placeholder="ejemplo@maxialimentos.com"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#397C3C]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Contraseña</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#397C3C]"
            />
            <p className="text-xs text-gray-500 mt-1">
              Debe tener mínimo 8 caracteres, una mayúscula y un número.
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Confirmar contraseña</label>
            <input
              type="password"
              name="password_confirmation"
              value={form.password_confirmation}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#397C3C]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#397C3C] text-white py-3 rounded-lg font-semibold hover:bg-[#2f662f] transition-all"
          >
            Registrarme
          </button>
        </form>

        {mensaje && <p className="mt-5 text-green-600 font-medium">{mensaje}</p>}
        {error && <p className="mt-5 text-red-600 font-medium">{error}</p>}
      </div>
    </div>
  );
}


/* ------------------------------------------------------
   🎨 Estilos en línea (CSS-in-JS)
   ------------------------------------------------------ */
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #397C3C, #5FA15E)",
    fontFamily: "Poppins, sans-serif",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "16px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
    padding: "40px 35px",
    width: "380px",
    textAlign: "center",
    animation: "fadeIn 0.6s ease",
  },
  logo: {
    width: "150px",
    display: "block",
    margin: "0 auto 10px",
  },
  title: {
    color: "#397C3C",
    marginBottom: "25px",
    fontWeight: "600",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "14px",
    outline: "none",
    fontSize: "14px",
    transition: "all 0.3s ease",
  },
  button: {
    width: "100%",
    backgroundColor: "#397C3C",
    color: "#fff",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "600",
    marginTop: "10px",
    transition: "background 0.3s ease",
  },
  alert: {
    backgroundColor: "#e6f5ea",
    color: "#2b6c2f",
    padding: "10px",
    borderRadius: "8px",
    fontSize: "14px",
    marginBottom: "15px",
  },
  link: {
    color: "#397C3C",
    textDecoration: "none",
    fontWeight: "600",
  },
};
