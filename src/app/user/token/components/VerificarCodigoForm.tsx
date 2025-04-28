"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
      // 🔥 AQUÍ YA NO VALIDAMOS NADA
      localStorage.setItem("token-reset", codigoFinal)
      router.push("/user/nuevacontrasena")
    } catch (error) {
      console.error("Error procesando código:", error)
      setError("⚠️ Error inesperado. Intenta nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
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
        {loading ? "Procesando..." : "Continuar"}
      </button>
    </form>
  )
}
