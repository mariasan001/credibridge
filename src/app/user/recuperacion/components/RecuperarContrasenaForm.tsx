"use client"

import { useState } from "react"

export function RecuperarContrasenaForm() {
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setEmailError("")
    setSuccessMessage("")

    if (!email) {
      setEmailError("Este campo es obligatorio")
      return
    }

    // Aquí deberías mandar la solicitud a tu API real
    console.log("Enviando token a:", email)
    setSuccessMessage("Hemos enviado un token a tu correo electrónico.")
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Correo Electrónico *</label>
        <input
          type="email"
          placeholder="Escribe tu correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={emailError ? "input-error" : ""}
          autoFocus
        />
        {emailError && <p className="error">{emailError}</p>}
      </div>

      <button type="submit" className="login-btn">
        Enviar Token
      </button>

      {successMessage && <p className="success">{successMessage}</p>}
    </form>
  )
}
