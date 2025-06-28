// lib/api.ts
import axios from "axios";

// 📦 URL base (desde entorno o localhost por defecto)
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:2910";

// 🔧 Instancia de Axios personalizada
export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    // 👇 Puedes agregar otras cabeceras comunes si lo necesitas
    //"Accept": "application/json",
  },
  withCredentials: true, // 👈 Necesario para que Axios incluya cookies (importantísimo)
});

// 🛡️ Interceptor de respuestas para manejo global de errores
api.interceptors.response.use(
  (response) => response, // ✅ Pasar respuestas exitosas tal cual
  (error) => {
    const status = error.response?.status;

    if (status === 401 || status === 403) {
      console.warn("⛔ Sesión expirada o sin permisos.");

      // ✅ Puedes redirigir si estás en el navegador:
      if (typeof window !== "undefined") {
        // Evita bucles infinitos con rutas públicas
        if (!window.location.pathname.includes("/user/inicar-sesion")) {
          window.location.href = "/user/inicar-sesion";
        }
      }
    }

    // 🐞 Log de errores útiles para debugging
    console.error("❌ Error en petición:", {
      url: error.config?.url,
      status,
      data: error.response?.data,
    });

    return Promise.reject(error); // ⛔ Propaga el error para manejarlo en el componente si quieres
  }
);
