"use client"

import { useState } from "react"
import "./styles.css" // Puedes crear este CSS para estilos locales si quieres

export default function IniciarSesionPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí puedes conectar con tu API o lógica de auth
    console.log("Iniciando sesión con:", { email, password })
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Iniciar Sesión</h1>

        <form onSubmit={handleLogin} className="login-form">
          <label>Email</label>
          <input
            type="email"
            placeholder="correo@dominio.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Contraseña</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-btn">
            Entrar
          </button>
        </form>

        <p className="login-link">
          ¿Olvidaste tu contraseña?{" "}
          <a href="/auth/recuperacion-contraseña">Recupérala aquí</a>
        </p>
      </div>
    </div>
  )
}
