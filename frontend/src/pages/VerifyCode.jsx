import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function VerifyCode() {
  const location = useLocation();
  const navigate = useNavigate();

  const correo = location.state?.correo || "";
  const [code, setCode] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/verify-temp", {
        correo,
        code,
      });

      if (response.data.success) {
        setMensaje("✅ Cuenta verificada correctamente. Serás redirigido al login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError("Código incorrecto o expirado.");
      }
    } catch (err) {
      console.error(err);
      setError("❌ Error al verificar el código. Intenta nuevamente.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start pt-20 bg-gradient-to-b from-[#397C3C] to-[#2b5d2b]">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-[90%] md:w-[450px] text-center">
        {/* Logo */}
        <div className="flex justify-center mb-5">
          <img src={logo} alt="MaxiAlimentos" className="w-24 h-auto" />
        </div>

        <h1 className="text-2xl font-bold text-[#397C3C] mb-3">
          Verificar tu cuenta
        </h1>
        <p className="text-gray-600 mb-8">
          Ingresa el código de verificación enviado a tu correo institucional.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Código de verificación"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            maxLength={6}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-[#397C3C] text-center text-xl tracking-widest"
          />

          <button
            type="submit"
            className="w-full bg-[#397C3C] text-white py-3 rounded-lg font-semibold hover:bg-[#2f662f] transition-all"
          >
            Confirmar código
          </button>
        </form>

        {mensaje && <p className="mt-5 text-green-600 font-medium">{mensaje}</p>}
        {error && <p className="mt-5 text-red-600 font-medium">{error}</p>}
      </div>
    </div>
  );
}
