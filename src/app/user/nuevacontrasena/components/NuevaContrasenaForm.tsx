"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import { actualizarPassword } from "@/services/auth/tokenNuevaContra" // ✅ Usamos tu servicio real

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
      setError("Todos los campos son obligatorios")
      setLoading(false)
      return
    }

    if (nueva !== confirmacion) {
      setError("Las contraseñas no coinciden")
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
        localStorage.removeItem("token-reset") // ✅ Eliminamos el código
        router.push("/user/inicar-sesion")    // ✅ Redirigimos a login
      }, 2500)
    } catch (error) {
      console.error(error)
      setError("⚠️ Ocurrió un error al actualizar la contraseña. Intenta nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      
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
            {showPass1 ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <div className="form-group password-group">
        <label>Ingresa de Nuevo</label>
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
            {showPass2 ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

        {/* 🔥 ALERTAS */}
      {error && <div className="alert warning-alert">{error}</div>}
      {successMessage && <div className="alert success-alert">{successMessage}</div>}
      <button type="submit" className="login-btn mt-4" disabled={loading}>
        {loading ? "Guardando..." : "Guardar Nueva Contraseña"}
      </button>
    </form>
  )
}
