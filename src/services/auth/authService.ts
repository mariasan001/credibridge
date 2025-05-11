// services/auth/authService.ts
import { api } from "@/lib/apis"
import { LoginPayload, LoginResponse } from "@/model/usuario.models"

// Llamada al backend para login. El backend debe devolver la cookie HttpOnly
export const loginRequest = async (data: LoginPayload): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/login", data, {
    withCredentials: true, // 👈 Clave para que la cookie se guarde en el navegador
  })
  return response.data
}
