
"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Usuario, LoginPayload } from "@/model/usuario.models"
import { loginRequest } from "@/services/auth/authService"
import { setCookie, getCookie, deleteCookie } from "cookies-next"

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

  useEffect(() => {
    const auth = getCookie("auth")
    const storedToken = getCookie("token")
    const storedUser = getCookie("user")

    if (auth === "true" && storedToken && storedUser) {
      setToken(storedToken as string)
      setUser(JSON.parse(storedUser as string))
    }

    setLoading(false)
  }, [])

  const login = async (data: LoginPayload) => {
    const response = await loginRequest(data)

    // ✅ El user es todo el objeto
    const userData = response.user

    setCookie("auth", "true", { path: "/", secure: true, sameSite: "lax" })
    setCookie("token", response.token, { path: "/", secure: true, sameSite: "lax" })
    setCookie("user", JSON.stringify(userData), { path: "/", secure: true, sameSite: "lax" })

    setToken(response.token)
    setUser(userData)

    router.push("/inicio")
  }

  const logout = () => {
    deleteCookie("auth")
    deleteCookie("token")
    deleteCookie("user")
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
