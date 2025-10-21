import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await api.get("/me");
      setUser(res.data);
    } catch (err) {
      console.error("Error de autenticación:", err);
      localStorage.removeItem("token");
      navigate("/login");
    }
  };
  fetchUser();
}, [navigate]);


  const handleLogout = async () => {
    try {
      await api.post("/logout");
    } catch (err) {
      console.error("Error cerrando sesión:", err);
    } finally {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <div style={{ padding: "40px", textAlign: "center", fontFamily: "Poppins" }}>
      {user ? (
        <>
          <h1 style={{ color: "#397C3C" }}>Bienvenido, {user.nombre} 👋</h1>
          <p>Correo: {user.correo}</p>
          <p>Cargo: {user.cargo || "Sin cargo registrado"}</p>
          <p>Área: {user.area || "Sin área registrada"}</p>

          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "#397C3C",
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "8px",
              marginTop: "20px",
              cursor: "pointer",
            }}
          >
            Cerrar sesión
          </button>
        </>
      ) : (
        <p>Cargando datos del usuario...</p>
      )}
    </div>
  );
}

export default Dashboard;
