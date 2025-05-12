// lib/api.ts
import axios from "axios"
import { getCookie } from "cookies-next"

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:2910",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// ✅ Interceptor para incluir token manualmente desde cookies
api.interceptors.request.use(
  (config) => {
    const token = getCookie("token") as string | undefined
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
