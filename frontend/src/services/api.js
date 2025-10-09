// src/services/api.js
// Este archivo centraliza todas las llamadas a la API de Laravel

const API_URL = "http://127.0.0.1:8000/api";

/**
 * Obtiene todos los empleados desde el backend Laravel
 * @returns {Promise<Array>} Lista de empleados
 */
export async function getEmpleados() {
  const response = await fetch(`${API_URL}/empleados`);
  if (!response.ok) throw new Error("Error al obtener empleados");
  return await response.json();
}

/**
 * Envía un nuevo empleado al backend
 * @param {Object} data Datos del nuevo empleado
 */
export async function addEmpleado(data) {
  const response = await fetch(`${API_URL}/empleados`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Error al agregar empleado");
  return await response.json();
}
