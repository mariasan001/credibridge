"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export function RecuperarContrasenaForm() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showAlert, setShowAlert] = useState<"success" | "warning" | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEmailError("")
    setShowAlert(null)
    setLoading(true)

    if (!email) {
      setEmailError("Este campo es obligatorio")
      setLoading(false)
      return
    }

    try {
      const response = await fetch("http://localhost:2910/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        throw new Error("Correo inválido o no encontrado")
      }

      // ✅ Todo bien: mostrar alerta verde
      setShowAlert("success")
      setLoading(false)

      setTimeout(() => {
        router.push("/user/token")
      }, 2500)

    } catch (error: any) {
      if (error.message === "Correo inválido o no encontrado") {
        setShowAlert("warning")
      } else {
        console.error("Ocurrió un error inesperado:", error)
      }
      setLoading(false)

      setTimeout(() => {
        setShowAlert(null)
      }, 3000)
    }
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
    <div className="form-group">
      <label htmlFor="email">Correo Electrónico *</label> 
      <input
        id="email"                                    
        type="email"
        placeholder="Escribe tu correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={emailError ? "input-error" : ""}
        autoFocus
      />
      {emailError && <p className="error">{emailError}</p>}
    </div>
    
      <button type="submit" className="login-btn" disabled={loading}>
        {loading ? "Enviando..." : "Enviar Token"}
      </button>

      {/* 🔥 ALERTAS BONITAS */}
      {showAlert === "success" && (
        <div className="alert success-alert">
          ✅ Token enviado. Revisa tu bandeja de entrada o correo no deseado.
        </div>
      )}
      {showAlert === "warning" && (
        <div className="alert warning-alert">
          ⚠️ Verifica tu correo electrónico. No pudimos encontrarlo.
        </div>
      )}
    </form>
  )
}
