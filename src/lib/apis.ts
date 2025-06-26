// lib/api.ts
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:2910";

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 👈 Imprescindible para sesiones con cookies
});

// 🛡️ Manejo de errores 
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401 || status === 403) {
      console.warn("⛔ Sesión expirada o sin permisos.");
       //window.location.href = "/user/inicar-sesion"; // si quieres redirigir automáticamente
    }

    console.error("❌ Error en petición:", {
      url: error.config?.url,
      status,
      data: error.response?.data,
    });

    return Promise.reject(error);
  }
);
