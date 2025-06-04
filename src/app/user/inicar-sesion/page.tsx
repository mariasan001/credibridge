"use client"

import "./styles.css"
import React, { useEffect } from "react"
import { useSaludo } from "@/hooks/useSaludo"
import { LoginTitle } from "./components/LoginTitle"
import { LoginForm } from "../../../components/LoginForm"
import { LoginIllustration } from "./components/LoginIllustration"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import RUTAS_POR_ROL_ID from "@/constants/rutasPorRol"


export default function IniciarSesionPage() {
  const { saludo, emoji, darkMode } = useSaludo()
  const { isAuthenticated, loading, user } = useAuth()
  const router = useRouter()

useEffect(() => {
  if (!loading && isAuthenticated && user) {
    const roles = user.roles

    if (roles && roles.length > 0) {
      const rolPrincipalId = roles[0].id
      const rutaDestino = RUTAS_POR_ROL_ID[rolPrincipalId] || "/perfil_user/inicio"
      router.push(rutaDestino)
    } else {
      console.warn("Usuario sin roles definidos, no se redirige")
    
    }
  }
}, [isAuthenticated, loading, router, user])

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
