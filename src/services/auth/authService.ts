// services/auth/authService.ts
import { api } from "@/lib/apis"
import { LoginPayload, LoginResponse } from "@/model/usuario.models"

// Llamada al backend para login. El backend devuelve { token, user }
export const loginRequest = async (data: LoginPayload): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/login", data)
  return response.data
}
