"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { actualizarPassword } from "@/services/auth/tokenNuevaContra"

export function NuevaContrasenaForm() {
  const router = useRouter()
  const [nueva, setNueva] = useState("")
  const [confirmacion, setConfirmacion] = useState("")
  const [showPass1, setShowPass1] = useState(false)
  const [showPass2, setShowPass2] = useState(false)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccessMessage("")
    setLoading(true)

    if (!nueva || !confirmacion) {
      setError("Todos los campos son obligatorios.")
      setLoading(false)
      return
    }

    if (nueva !== confirmacion) {
      setError("Las contraseñas no coinciden.")
      setLoading(false)
      return
    }

    try {
      const tokenReset = localStorage.getItem("token-reset")
      if (!tokenReset) {
        setError("No se encontró un código válido para actualizar la contraseña.")
        setLoading(false)
        return
      }

      await actualizarPassword({
        code: tokenReset,
        newPassword: nueva,
      })

      setSuccessMessage("¡Contraseña actualizada correctamente!")

      setTimeout(() => {
        localStorage.removeItem("token-reset")
        router.push("/user/iniciar-sesion") // corregido "iniciar"
      }, 2500)

    } catch (error: any) {
      console.error("Error en actualizarPassword:", error)
      const status = error?.response?.status
      const backendMessage = error?.response?.data?.message

      if (status === 404 && backendMessage?.includes("Código")) {
        // ⚡ Si el backend responde que es problema del código
        setError("El código de recuperación es inválido, expirado o ya ha sido utilizado.")
        localStorage.removeItem("token-reset") // 🔥 Eliminamos el token inválido
      } else if (backendMessage) {
        // ⚡ Si viene otro mensaje del backend
        setError(`⚠️ ${backendMessage}`)
      } else {
        // ⚡ Fallo genérico de servidor
        setError("⚠️ Ocurrió un error inesperado. Intenta nuevamente.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      
      {/* 🔥 Mensajes */}
      {error && <div className="alert warning-alert">{error}</div>}
      {successMessage && <div className="alert success-alert">{successMessage}</div>}

      {/* 🔑 Nueva contraseña */}
      <div className="form-group password-group">
        <label>Nueva contraseña</label>
        <div className="input-wrapper">
          <input
            type={showPass1 ? "text" : "password"}
            placeholder="Escribe nueva contraseña"
            value={nueva}
            onChange={(e) => setNueva(e.target.value)}
          />
          <button
            type="button"
            className="eye-toggle"
            onClick={() => setShowPass1(!showPass1)}
            aria-label="Mostrar u ocultar"
          >
            {showPass1 ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>
      </div>

      {/* 🔒 Confirmar contraseña */}
      <div className="form-group password-group">
        <label>Confirma la contraseña</label>
        <div className="input-wrapper">
          <input
            type={showPass2 ? "text" : "password"}
            placeholder="Escribe nuevamente"
            value={confirmacion}
            onChange={(e) => setConfirmacion(e.target.value)}
          />
          <button
            type="button"
            className="eye-toggle"
            onClick={() => setShowPass2(!showPass2)}
            aria-label="Mostrar u ocultar"
          >
            {showPass2 ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>
      </div>

      {/* 🔥 Botón */}
      <button type="submit" className="login-btn mt-4" disabled={loading}>
        {loading ? (
          <span className="spinner-content">
            <Loader2 className="spinner" size={18} />
            Guardando...
          </span>
        ) : (
          "Guardar Nueva Contraseña"
        )}
      </button>
    </form>
  )
}
