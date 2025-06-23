import { api } from "@/lib/apis"
import { User } from "../model/User"

// 🧩 Payload para creación y edición de usuario
export interface UserPayload {
  usuario: string
  name: string
  firstname: string
  secondName: string
  email: string
  password: string
  roleId: number
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
export async function createUser(payload: UserPayload): Promise<void> {
  await api.post("/api/users/create", payload)
}

// 🟠 Editar usuario existente
export async function updateUser(payload: UserPayload): Promise<void> {
  await api.put("/api/users/admin/users", payload)
}

// 🟦 Obtener roles disponibles
export interface Role {
  id: number
  description: string
}

export async function fetchRoles(): Promise<Role[]> {
  const response = await api.get<Role[]>("/api/users/getRoles")
  return response.data
}
