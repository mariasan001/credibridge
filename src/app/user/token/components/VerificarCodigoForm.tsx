"use client"

import { useState } from "react"
import "./VerificarCodigoForm.css"
export function VerificarCodigoForm() {
  const [codigo, setCodigo] = useState(["", "", "", "", "", ""])
  const [error, setError] = useState("")

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return

    const nuevoCodigo = [...codigo]
    nuevoCodigo[index] = value
    setCodigo(nuevoCodigo)

    // Autoenfocar el siguiente input
    if (value && index < 5) {
      const nextInput = document.getElementById(`codigo-${index + 1}`)
      if (nextInput) nextInput.focus()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const codigoFinal = codigo.join("")

    if (codigoFinal.length < 6) {
      setError("Por favor ingresa el código completo.")
      return
    }

    // Aquí iría la logica del en el momneto en el que 
    console.log("Código ingresado:", codigoFinal)
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
    
      <div className="codigo-inputs">
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

      {error && <p className="error">{error}</p>}

      <button type="submit" className="login-btn">Verificar</button>
    </form>
  )
}
