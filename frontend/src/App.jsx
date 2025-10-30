import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// 🧩 Importación de componentes
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import VerifyCode from "./pages/VerifyCode.jsx";
import CompletarPerfil from "./pages/CompletarPerfil.jsx";

// 🧠 Google Login
import { GoogleOAuthProvider } from "@react-oauth/google";

// 📌 Componente de protección de rutas privadas
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <GoogleOAuthProvider clientId="141903075939-fqd4re87rbjlut5d80v5lc2ktqbpd2ke.apps.googleusercontent.com">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/completar-perfil" element={<CompletarPerfil />} />
          <Route path="/dashboard"element={<PrivateRoute><Dashboard /></PrivateRoute>}/>
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/verify-code" element={<VerifyCode />} />
          <Route
            path="*"
            element={
              <h1 style={{ textAlign: "center", marginTop: "4rem" }}>
                404 - Página no encontrada
              </h1>
            }
          />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
