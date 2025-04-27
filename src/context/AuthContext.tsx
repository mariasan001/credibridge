"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Role } from "@/model/usuario.models"
import { loginRequest } from "@/services/auth/authService"
import { setCookie, getCookie, deleteCookie } from "cookies-next"

interface User {
  username: string
  roles: Role[]
}

interface AuthContextType {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
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

  const login = async (username: string, password: string) => {
    const response = await loginRequest({ username, password })

    const userData: User = {
      username,
      roles: response.roles,
    }

    // 🔥 Guardamos en cookies
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
