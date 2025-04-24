"use client"

import "./styles.css"
import React from "react"
import { useSaludo } from "@/hooks/useSaludo"
import { LoginTitle } from "./components/LoginTitle"
import { LoginForm } from "../../../components/LoginForm"
import { LoginIllustration } from "./components/LoginIllustration"

export default function IniciarSesionPage() {
  const { saludo, emoji, darkMode } = useSaludo()

  return (
    <div className={`login-container ${darkMode ? "modo-oscuro" : ""}`}>
      <div className="login-form-section">
        <LoginTitle saludo={saludo} emoji={emoji} />
        <LoginForm />
      </div>
      <LoginIllustration darkMode={darkMode} />
    </div>
  )
}
