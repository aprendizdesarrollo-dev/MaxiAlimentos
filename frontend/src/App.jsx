import { useEffect, useState } from "react";
import { getEmpleados, addEmpleado } from "./services/api";

export default function App() {
  const [empleados, setEmpleados] = useState([]);
  const [nuevoEmpleado, setNuevoEmpleado] = useState({
    nombre: "",
    correo: "",
    cargo: "",
    area: "",
  });

  // Cargar empleados al iniciar
  useEffect(() => {
    cargarEmpleados();
  }, []);

  const cargarEmpleados = async () => {
    const data = await getEmpleados();
    setEmpleados(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addEmpleado(nuevoEmpleado);
    setNuevoEmpleado({ nombre: "", correo: "", cargo: "", area: "" });
    cargarEmpleados();
  };

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1>👨‍💼 Empleados MaxiAlimentos</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: 30 }}>
        <input
          type="text"
          placeholder="Nombre"
          value={nuevoEmpleado.nombre}
          onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, nombre: e.target.value })}
        />
        <input
          type="email"
          placeholder="Correo"
          value={nuevoEmpleado.correo}
          onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, correo: e.target.value })}
        />
        <input
          type="text"
          placeholder="Cargo"
          value={nuevoEmpleado.cargo}
          onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, cargo: e.target.value })}
        />
        <input
          type="text"
          placeholder="Área"
          value={nuevoEmpleado.area}
          onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, area: e.target.value })}
        />
        <button type="submit">Agregar</button>
      </form>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Cargo</th>
            <th>Área</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.nombre}</td>
              <td>{emp.correo}</td>
              <td>{emp.cargo}</td>
              <td>{emp.area}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
