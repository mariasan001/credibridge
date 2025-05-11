// lib/api.ts
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:2910",
  timeout: 10000,
  withCredentials: true, // ✅ esto es clave para que Axios mande cookies
  headers: {
    "Content-Type": "application/json",
  },
});

