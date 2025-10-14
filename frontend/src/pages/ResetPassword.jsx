/**
 * Componente: ResetPassword.jsx
 * --------------------------------------------------------
 * Versión final funcional:
 *  ✅ Cada input tiene su propio ojo FaEye / FaEyeSlash.
 *  ✅ Sin manipular el DOM manualmente.
 *  ✅ React maneja el cambio de tipo dinámicamente.
 *  ✅ Estilo corporativo MaxiAlimentos.
 */

import { useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ResetPassword() {
  // Token + email desde URL
  const { token } = useParams();
  const [searchParams] = useSearchParams();
  const emailParam = searchParams.get("email");

  // Datos del formulario
  const [form, setForm] = useState({
    email: emailParam || "",
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
        ...form,
        token,
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
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Logo */}
        <img
          src="/assets/logo.png"
          alt="Logo MaxiAlimentos"
          style={styles.logo}
        />

        {/* Título */}
        <h2 style={styles.title}>Restablecer Contraseña</h2>

        {/* Mensajes */}
        {message && <div style={{ ...styles.alert, ...styles.success }}>{message}</div>}
        {error && <div style={{ ...styles.alert, ...styles.error }}>{error}</div>}

        {/* Formulario */}
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Email */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Correo electrónico</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          {/* Nueva contraseña */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Nueva contraseña</label>
            <div style={styles.passwordGroup}>
              <input
                type={showPassword ? "text" : "password"} // 🔥 React controla el tipo
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                style={styles.input}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)} // alterna el estado
                style={styles.eyeButton}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Confirmar contraseña */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Confirmar contraseña</label>
            <div style={styles.passwordGroup}>
              <input
                type={showConfirm ? "text" : "password"} // 🔥 controlado por React
                name="password_confirmation"
                value={form.password_confirmation}
                onChange={handleChange}
                required
                style={styles.input}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)} // alterna el segundo ojo
                style={styles.eyeButton}
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Botón enviar */}
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Guardando..." : "Actualizar contraseña"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* 🎨 Estilos en línea */
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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    animation: "fadeIn 0.6s ease",
  },
  logo: {
    width: "200px",
    marginBottom: "10px",
  },
  title: {
    color: "#397C3C",
    marginBottom: "25px",
    fontWeight: "600",
  },
  alert: {
    padding: "10px 15px",
    borderRadius: "8px",
    marginBottom: "15px",
    fontSize: "14px",
    fontWeight: "500",
  },
  success: {
    backgroundColor: "#d4edda",
    color: "#155724",
  },
  error: {
    backgroundColor: "#f8d7da",
    color: "#721c24",
  },
  form: {
    width: "100%",
    textAlign: "left",
  },
  formGroup: {
    marginBottom: "18px",
  },
  label: {
    display: "block",
    color: "#333",
    fontSize: "14px",
    marginBottom: "6px",
  },
  input: {
    width: "100%",
    padding: "10px 36px 10px 10px", // espacio para el icono
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "14px",
    transition: "all 0.3s",
  },
  passwordGroup: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  eyeButton: {
    position: "absolute",
    right: "10px",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    color: "#666",
    top: "50%",
    transform: "translateY(-50%)",
    padding: 0,
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
};
