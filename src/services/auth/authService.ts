
import { api } from "@/lib/apis"
import { LoginPayload, LoginResponse } from "@/model/usuario.models"
import { deleteCookie } from "cookies-next"

export const loginRequest = async (data: LoginPayload): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/login", data)
  return response.data
}

// Función para manejar requests protegidos
export const protectedRequest = async <T>(request: () => Promise<T>): Promise<T | null> => {
  try {
    const result = await request()
    return result
  } catch (error: any) {
    if (error.response?.status === 401) {
      // Si da error de autenticación, forzamos logout
      deleteCookie("auth")
      deleteCookie("token")
      deleteCookie("user")
      window.location.href = "/user/inicar-sesion"
    }
    return null
  }
}
