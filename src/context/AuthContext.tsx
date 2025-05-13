"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { loginRequest } from "@/services/auth/authService"
import { Usuario, LoginPayload } from "@/model/usuario.models"

interface AuthContextType {
  user: Usuario | null
  isAuthenticated: boolean
  loading: boolean
  login: (data: LoginPayload) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // ✅ Al montar, consulta si hay sesión activa con cookie
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("http://localhost:2910/auth/me", {
          method: "GET",
          credentials: "include",
        })

        if (res.ok) {
          const text = await res.text()
          if (text) {
            const parsed = JSON.parse(text)
            const extractedUser = parsed.user ?? parsed
            setUser(extractedUser)
          } else {
            setUser(null)
          }
        } else {
          setUser(null)
        }
      } catch (err) {
        console.error("Sesión no activa", err)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkSession()
  }, [])

  const login = async (data: LoginPayload) => {
    try {
      const userData = await loginRequest(data)
      const extractedUser = userData.user ?? userData
      setUser(extractedUser)
      router.push("/inicio")
    } catch (err) {
      console.error("Login fallido", err)
    }
  }

  const logout = async () => {
    try {
      await fetch("http://localhost:2910/auth/logout", {
        method: "POST",
        credentials: "include",
      })
    } catch (err) {
      console.error("Error al cerrar sesión", err)
    } finally {
      setUser(null)
      router.push("/user/inicar-sesion")
    }
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
