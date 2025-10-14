import { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/me');
        setUser(res.data);
      } catch {
        navigate('/login');
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await api.post('/logout');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      {user ? (
        <>
          <h1>Bienvenido, {user.name} 👋</h1>
          <p>Correo: {user.email}</p>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}

export default Dashboard;
