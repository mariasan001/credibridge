"use client"

import Image from "next/image"
import "./styles.css"

import { useEffect, useState } from "react"
import { VerificarCodigoForm } from "./components/VerificarCodigoForm"

export default function TokenPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [saludo, setSaludo] = useState("")
  const [emoji, setEmoji] = useState("")

  useEffect(() => {
    const hora = new Date().getHours()
    if (hora >= 18) {
      setDarkMode(true)
      setSaludo("Buenas noches")
      setEmoji("🌙")
    } else {
      setDarkMode(false)
      setSaludo("Hola buenos días")
      setEmoji("☀️")
    }
  }, [])

  return (
    <div className={`login-container ${darkMode ? "modo-oscuro" : ""}`}>
      <div className="login-form-section">
        <h1 className="login-logo">Credi<span>Bridge</span></h1>
        <p className="login-subtitle">{saludo} {emoji}</p>
        <h2 className="login-title">
        Revisa tu correo e <span>ingresa tu código</span>
        </h2>
        <p className="login-description">
        Tevisa tu bandeja de entrada y copia el código que te enviamos.
        </p>
       <VerificarCodigoForm/>

      </div>

      <div className="login-image-section">
        <Image
          src={darkMode ? "/img/img3-oscuro.png" : "/img/img3.webp"}
          alt="CrediBridge ilustración"
          fill
          className="login-image-fill"
          priority
        />
      </div>
    </div>
  )
}
