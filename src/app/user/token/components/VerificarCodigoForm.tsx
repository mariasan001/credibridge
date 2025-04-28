"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { verificarCodigo } from "@/services/auth/tokenNuevaContra"
import "./VerificarCodigoForm.css"

export function VerificarCodigoForm() {
  const router = useRouter()
  const [codigo, setCodigo] = useState(Array(6).fill(""))
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
      await verificarCodigo({
        code: codigoFinal,
        newPassword: "Temporal123_*"
      })

      localStorage.setItem("token-reset", codigoFinal)
      router.push("/user/nuevacontrasena")
    } catch (error: any) {
    
      if (process.env.NODE_ENV === "development") {
        console.error("Error verificando código:", error)
      }

      const status = error?.response?.status
      const backendMessage = error?.response?.data?.message

      if (status === 404 && backendMessage?.includes("Código")) {
        setError("⚠️ Código inválido, expirado o ya utilizado.")
      } else {
        setError("⚠️ Código inválido, expirado o ya utilizado.")
      }

      localStorage.removeItem("token-reset")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      
      {/* Mensaje de error */}
      {error && <div className="alert warning-alert">{error}</div>}

      {/* Inputs para código */}
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

      {/* Botón continuar */}
      <button type="submit" className="login-btn" disabled={loading}>
        {loading ? "Procesando..." : "Continuar"}
      </button>
    </form>
  )
}
