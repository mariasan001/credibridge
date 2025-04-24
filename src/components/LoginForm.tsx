"use client"
import React from "react" 
import { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"

export function LoginForm() {
  const { login, loading } = useAuth()
  const router = useRouter()

  const [numeroServidor, setNumeroServidor] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const [numeroServidorError, setNumeroServidorError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setNumeroServidorError("")
    setPasswordError("")
    setError("")

    let hasError = false

    if (!numeroServidor) {
      setNumeroServidorError("Este campo es obligatorio")
      hasError = true
    }

    if (!password) {
      setPasswordError("Este campo es obligatorio")
      hasError = true
    }

    if (hasError) return

    try {
      await login(numeroServidor, password)
    } catch (err: any) {
      if (numeroServidor !== "SP12345678") {
        setNumeroServidorError("Número de servidor incorrecto")
      } else if (password !== "1234") {
        setPasswordError("Contraseña incorrecta")
      } else {
        setError("Credenciales inválidas")
      }
    }
  }

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <div className="form-group">
        <label>Número de Servidor Público *</label>
        <input
          type="text"
          placeholder="Escribe tu número de servidor público"
          value={numeroServidor}
          onChange={(e) => setNumeroServidor(e.target.value)}
          className={numeroServidorError ? "input-error" : ""}
          autoFocus
        />
        {numeroServidorError && <p className="error">{numeroServidorError}</p>}
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
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {passwordError && <p className="error">{passwordError}</p>}
      </div>

      {error && <p className="error">{error}</p>}

      <div className="forgot-link">
        <a href="#">¿Olvidaste tu contraseña?</a>
      </div>

      <button type="submit" className="login-btn" disabled={loading}>
        {loading ? "Ingresando..." : "Ingresar al sistema"}
      </button>

      <a href="#" className="aviso">Aviso de privacidad</a>
    </form>
  )
}
