"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCookie, setCookie, deleteCookie } from "cookies-next"
import { Usuario, LoginPayload } from "@/model/usuario.models"
import { loginRequest } from "@/services/auth/authService"

interface AuthContextType {
  user: Usuario | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
  login: (data: LoginPayload) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // ✅ Al cargar, recuperar datos desde cookies (modo temporal)
  useEffect(() => {
    const storedToken = getCookie("token") as string | undefined
    const storedUser = getCookie("user") as string | undefined

    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }

    setLoading(false)
  }, [])

  const login = async (data: LoginPayload) => {
    try {
      const response = await loginRequest(data)

      const userData = response.user
      const tokenData = response.token

      // ✅ Guardar en cookies JS (temporal)
      setCookie("token", tokenData, { path: "/" })
      setCookie("user", JSON.stringify(userData), { path: "/" })
      setCookie("auth", "true", { path: "/" })

      setToken(tokenData)
      setUser(userData)

      router.push("/inicio")
    } catch (err) {
      console.error("Login fallido", err)
    }
  }

  const logout = () => {
    deleteCookie("token")
    deleteCookie("user")
    deleteCookie("auth")
    setToken(null)
    setUser(null)
    router.push("/user/inicar-sesion")
  }

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider")
  return context
}
