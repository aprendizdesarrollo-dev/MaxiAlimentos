/**
 * Componente: Register.jsx
 * --------------------------------------------------------
 * Registro corporativo de empleados (React + Laravel API)
 * Permite crear usuarios con datos laborales:
 *  - Nombre, correo, contraseña
 *  - Cédula, cargo, área
 *
 * Envía la información al endpoint:
 *  POST http://127.0.0.1:8000/api/register
 *
 * Autor: Gonzo & Ricardo 😎
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  // --------------------------------------------
  // Estados del formulario
  // --------------------------------------------
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    password: "",
    cedula: "",
    cargo: "",
    area: "",
  });

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // --------------------------------------------
  // Capturar cambios de los inputs
  // --------------------------------------------
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // --------------------------------------------
  // Enviar datos a Laravel API
  // --------------------------------------------
  const handleRegister = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/register", form);

      if (res.data.success) {
        setMsg("✅ Registro exitoso. Redirigiendo al login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMsg("⚠️ No se pudo registrar el usuario.");
      }
    } catch (err) {
      setMsg("❌ Error al registrar. Verifica los datos.");
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------
  // Render del componente
  // --------------------------------------------
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Logo */}
        <img
          src="/assets/logo.png"
          alt="Logo MaxiAlimentos"
          style={styles.logo}
        />

        <h2 style={styles.title}>Registro de Empleados</h2>

        {msg && <div style={styles.alert}>{msg}</div>}

        <form onSubmit={handleRegister} style={styles.form}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre completo"
            value={form.nombre}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            type="email"
            name="correo"
            placeholder="Correo institucional"
            value={form.correo}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            type="text"
            name="cedula"
            placeholder="Número de cédula"
            value={form.cedula}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            type="text"
            name="cargo"
            placeholder="Cargo (Ej: Operario, Contador...)"
            value={form.cargo}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            type="text"
            name="area"
            placeholder="Área (Ej: Producción, Comercial...)"
            value={form.area}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Registrando..." : "Registrar"}
          </button>
        </form>

        <p style={{ marginTop: "15px" }}>
          ¿Ya tienes una cuenta?{" "}
          <a href="/login" style={styles.link}>
            Inicia sesión
          </a>
        </p>
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
