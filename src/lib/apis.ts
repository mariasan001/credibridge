import axios from "axios";
import Router from "next/router";
import toast from "react-hot-toast";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://10.0.32.54:2910";

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Esto asegura que se mande la cookie
});

// Interceptor de respuestas
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    // ✅ Si el token o la cookie expiró
    if (status === 401) {
      toast.error("Tu sesión ha expirado. Inicia sesión nuevamente.", {
        duration: 5000,
        icon: "⏰",
      });

      // Redirige al login
    Router.push("/user/iniciar-sesion");

    }

    return Promise.reject(error);
  }
);
