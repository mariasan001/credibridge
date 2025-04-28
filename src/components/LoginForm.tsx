"use client"

import React, { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export function LoginForm() {
  const { login, loading } = useAuth()
  const router = useRouter()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const [usernameError, setUsernameError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setUsernameError("")
    setPasswordError("")
    setError("")

    let hasError = false

    if (!username) {
      setUsernameError("Este campo es obligatorio")
      hasError = true
    }

    if (!password) {
      setPasswordError("Este campo es obligatorio")
      hasError = true
    }

    if (hasError) return

    try {
      await login(username, password) // Ahora sí username es claro
    } catch (err: any) {
      setError("Número de servidor o contraseña incorrectos")
    }
  }

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <div className="form-group">
        <label>Número de Servidor Público *</label>
        <input
          type="text"
          placeholder="Escribe tu número de servidor público"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={usernameError ? "input-error" : ""}
          autoFocus
        />
        {usernameError && <p className="error">{usernameError}</p>}
      </div>

      <div className="form-group password-group">
        <label>Contraseña *</label>
        <div className="input-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={passwordError ? "input-error" : ""}
          />
          <button
            type="button"
            className="eye-toggle"
            onClick={() => setShowPassword(!showPassword)}
            aria-label="Mostrar u ocultar contraseña"
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>
        {passwordError && <p className="error">{passwordError}</p>}
      </div>

      {error && <p className="error">{error}</p>}

      <div className="forgot-link">
        <Link href="/user/recuperacion">
          ¿Olvidaste tu contraseña?
        </Link>
      </div>

      <button type="submit" className="login-btn" disabled={loading}>
        {loading ? "Ingresando..." : "Ingresar al sistema"}
      </button>

      <a href="#" className="aviso">Aviso de privacidad</a>
    </form>
  )
}
