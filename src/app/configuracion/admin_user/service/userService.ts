import { api } from "@/lib/apis"
import { User } from "../model/User"

// Modelo del payload de creación
export interface CreateUserPayload {
  usuario: string
  name: string
  firstname: string
  secondName: string
  email: string
  password: string
}

// 🟢 Obtener todos los usuarios activos
export async function fetchActiveUsers(): Promise<User[]> {
  const response = await api.get<User[]>("/api/users/all/active")
  return response.data
}

// 🔴 Eliminar usuario por ID
export async function deleteUser(userId: string): Promise<void> {
  await api.delete(`/api/users/${userId}`)
}

// 🟢 Crear un nuevo usuario
export async function createUser(payload: CreateUserPayload): Promise<void> {
  await api.post("/api/users/create", payload)
}
