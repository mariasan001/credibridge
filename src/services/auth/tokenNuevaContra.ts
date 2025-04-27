import { api } from "@/lib/apis"
import { ActualizarPasswordPayload, VerificarCodigoPayload } from "@/model/token"

// 🔥 Servicio para verificar si el código es válido
export async function verificarCodigo(payload: VerificarCodigoPayload) {
  try {
    const response = await api.post("/auth/reset-password", payload)
    return response.data
  } catch (error: any) {
    if (error.response && error.response.status === 400) {
      throw new Error("Código inválido o expirado")
    } else {
      console.error("Error inesperado en verificarCodigo:", error)
      throw new Error("Error inesperado. Intenta de nuevo.")
    }
  }
}

// 🔥 Servicio para actualizar la contraseña real
export async function actualizarPassword(payload: ActualizarPasswordPayload) {
  try {
    const response = await api.post("/auth/reset-password", payload)
    return response.data
  } catch (error: any) {
    if (error.response && error.response.status === 403) {
      throw new Error("Código inválido o expirado. No puedes actualizar la contraseña.")
    } else {
      console.error("Error inesperado en actualizarPassword:", error)
      throw new Error("Error inesperado. Intenta de nuevo.")
    }
  }
}
