import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";

// COMPONENTES DE AUTENTICACIÓN
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import VerifyCode from "./pages/Auth/VerifyCode";

// DASHBOARD
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import ColaboradorDashboard from "./pages/Dashboard/ColaboradorDashboard";
import Dashboard from "./pages/Dashboard/Dashboard";

// PERFIL
import Perfil from "./pages/Perfil/Perfil";
import CompletarPerfil from "./pages/Perfil/CompletarPerfil";

// EVENTOS
import CrearEvento from "./pages/Evento/CrearEvento";


// Ruta privada (protege vistas con token)
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <GoogleOAuthProvider clientId="141903075939-fqd4re87rbjlut5d80v5lc2ktqbpd2ke.apps.googleusercontent.com">
      <Router>
        <Routes>
          {/* 🔹 Rutas públicas */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/completar-perfil" element={<CompletarPerfil />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/verify-code" element={<VerifyCode />} />
          <Route path="/crear-evento" element={<CrearEvento />} />

          {/* Rutas protegidas */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* 🔒 Panel principal (Administrador / Empleado) */}
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />

          {/* 🔹 Ruta 404 */}
          <Route
            path="*"
            element={
              <h1 style={{ textAlign: "center", marginTop: "4rem" }}>
                404 - Página no encontrada
              </h1>
            }
          />
        </Routes>

        {/* 🔔 Toaster global para notificaciones */}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              fontFamily: "Poppins, sans-serif",
              fontSize: "0.9rem",
            },
            success: {
              iconTheme: {
                primary: "#397C3C",
                secondary: "#fff",
              },
            },
          }}
        />
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
