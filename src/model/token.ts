// ✨ Modelos para la recuperación de contraseña
export interface VerificarCodigoPayload {
  code: string
  newPassword: string
}

export interface ActualizarPasswordPayload {
  code: string
  newPassword: string
}
