import axios from "axios";

// 📦 URL base (desde entorno o fallback a localhost)
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:2910";

// 🔧 Instancia personalizada de Axios
export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ Permite enviar cookies automáticamente
});

// 🛡️ Interceptor global para manejar errores de sesión
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url;

    // ⚠️ Manejo de errores de sesión
    if ((status === 401 || status === 403) && !url?.includes("/auth/me")) {
      console.warn("⛔ Sesión expirada o acceso denegado.");

      if (typeof window !== "undefined") {
        if (!window.location.pathname.includes("/user/iniciar-sesion")) {
          window.location.href = "/user/iniciar-sesion";
        }
      }
    }

    console.error("❌ Error en petición:", {
      url,
      status,
      data: error.response?.data,
    });

    return Promise.reject(error);
  }
);
