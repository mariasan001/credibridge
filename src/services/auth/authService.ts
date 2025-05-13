// services/auth/authService.ts
import { api } from "@/lib/apis"
import { LoginPayload, Usuario } from "@/model/usuario.models"

// 👉 El backend devuelve { user: Usuario }, por eso ajustamos el tipo de retorno
export const loginRequest = async (data: LoginPayload): Promise<{ user: Usuario }> => {
  const response = await api.post<{ user: Usuario }>("/auth/login", data, {
    withCredentials: true,
  })
  return response.data
}
