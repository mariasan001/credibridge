"use client"

import React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface User {
  numeroServidor: string
  // Puedes agregar más datos como nombre, rol, etc.
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  login: (numeroServidor: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const authCookie = document.cookie.includes("auth=true")
    if (authCookie) {
      // Simulación: en un caso real, lo obtienes desde token
      setUser({ numeroServidor: "SP12345678" })
    }
    setLoading(false)
  }, [])

  const login = async (numeroServidor: string, password: string) => {
    // Simulación temporal
    if (numeroServidor === "SP12345678" && password === "1234") {
      document.cookie = "auth=true; path=/"
      setUser({ numeroServidor })
      router.push("/")
    } else {
      throw new Error("Credenciales incorrectas")
    }
  }

  const logout = () => {
    document.cookie = "auth=; Max-Age=0; path=/"
    setUser(null)
    router.push("/user/inicar-sesion")
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
