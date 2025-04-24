"use client"

import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
       router.push("/user/inicar-sesion")
    }
  }, [loading, isAuthenticated, router])

  if (loading) return <p className="text-center mt-10">Cargando...</p>

  if (!isAuthenticated) return null //

  return <>{children}</>
}
