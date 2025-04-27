// services/auth/authService.ts

import { api } from "@/lib/apis"
import { LoginPayload, LoginResponse } from "@/model/usuario.models"

export const loginRequest = async (data: LoginPayload): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/login", data)
  return response.data
}
