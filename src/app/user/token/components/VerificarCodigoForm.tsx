"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { verificarCodigo } from "@/services/auth/tokenNuevaContra"
import "./VerificarCodigoForm.css"

export function VerificarCodigoForm() {
  const router = useRouter()
  const [codigo, setCodigo] = useState(["", "", "", "", "", ""])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (index: number, value: string) => {
    if (!/^[a-zA-Z0-9]?$/.test(value)) return

    const nuevoCodigo = [...codigo]
    nuevoCodigo[index] = value.toUpperCase()
    setCodigo(nuevoCodigo)

    if (value && index < 5) {
      const nextInput = document.getElementById(`codigo-${index + 1}`)
      if (nextInput) nextInput.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("Text").toUpperCase().slice(0, 6)
    if (!/^[A-Z0-9]+$/.test(pastedData)) return

    const nuevoCodigo = pastedData.split("")
    setCodigo((prev) => prev.map((_, idx) => nuevoCodigo[idx] || ""))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const codigoFinal = codigo.join("")

    if (codigoFinal.length < 6) {
      setError("Por favor ingresa el código completo.")
      setLoading(false)
      return
    }

    try {
      // 🔥 Validamos contra el servidor
      await verificarCodigo({
        code: codigoFinal,
        newPassword: "Temporal123_*", 
      })

      // ✅ Si es válido, guardamos el código y redirigimos
      localStorage.setItem("token-reset", codigoFinal)
      router.push("/user/nuevacontrasena")
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        // ⚡ Código inválido
        setError("⚠️ Código inválido o expirado. Verifica tu correo.")
      } else {
        // ⚡ Otro error
        setError("⚠️ Error inesperado. Intenta nuevamente.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      
      {/* 🔥 ALERTAS BONITAS */}
      {error && <div className="alert warning-alert">{error}</div>}

      <div className="codigo-inputs" onPaste={handlePaste}>
        {codigo.map((val, index) => (
          <input
            key={index}
            id={`codigo-${index}`}
            type="text"
            maxLength={1}
            value={val}
            onChange={(e) => handleChange(index, e.target.value)}
            className="input-codigo"
          />
        ))}
      </div>

      <button type="submit" className="login-btn" disabled={loading}>
        {loading ? "Verificando..." : "Verificar"}
      </button>
    </form>
  )
}
