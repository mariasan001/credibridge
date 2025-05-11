"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Usuario, LoginPayload } from "@/model/usuario.models"
import { loginRequest } from "@/services/auth/authService"

interface AuthContextType {
  user: Usuario | null
  isAuthenticated: boolean
  loading: boolean
  login: (data: LoginPayload) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // 🔁 Al cargar la app, preguntamos al backend si hay sesión activa
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
          credentials: "include", // 👈 Envia la cookie automáticamente
        })

        if (res.ok) {
          const data = await res.json()
          setUser(data.user)
        } else {
          setUser(null)
        }
      } catch (err) {
        console.error("Error al verificar sesión", err)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkSession()
  }, [])

  const login = async (data: LoginPayload) => {
    try {
      await loginRequest(data) // La cookie se guarda automáticamente
      router.push("/inicio")   // ✅ Redirigimos sin guardar token
    } catch (err) {
      console.error("Login fallido", err)
    }
  }

  const logout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include", // 👈 También para que la cookie se envíe
      })
    } catch (err) {
      console.error("Error cerrando sesión", err)
    }

    setUser(null)
    router.push("/user/iniciar-sesion")
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider")
  return context
}
