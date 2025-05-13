"use client"

import "./styles.css"
import React, { useEffect } from "react"
import { useSaludo } from "@/hooks/useSaludo"
import { LoginTitle } from "./components/LoginTitle"
import { LoginForm } from "../../../components/LoginForm"
import { LoginIllustration } from "./components/LoginIllustration"
import { useRouter } from "next/navigation" 
import { useAuth } from "@/context/AuthContext"

export default function IniciarSesionPage() {
  const { saludo, emoji, darkMode } = useSaludo()
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push("/inicio")
    }
  }, [isAuthenticated, loading, router])

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