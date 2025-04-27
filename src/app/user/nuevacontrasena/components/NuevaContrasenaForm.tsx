"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

export function NuevaContrasenaForm() {
  const [nueva, setNueva] = useState("")
  const [confirmacion, setConfirmacion] = useState("")
  const [showPass1, setShowPass1] = useState(false)
  const [showPass2, setShowPass2] = useState(false)

  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!nueva || !confirmacion) {
      setError("Todos los campos son obligatorios")
      return
    }

    if (nueva !== confirmacion) {
      setError("Las contraseñas no coinciden")
      return
    }

    // Aquí harías el fetch para guardar la contraseña real
    console.log("Contraseña nueva:", nueva)
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

      {error && <p className="error">{error}</p>}

      <button type="submit" className="login-btn mt-4">
        Guardar Nueva Contraseña
      </button>
    </form>
  )
}
