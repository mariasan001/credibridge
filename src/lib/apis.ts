// lib/api.ts
import axios from "axios"

// Creamos la instancia de Axios
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:2910",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Interceptores para añadir automáticamente el token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token") 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
