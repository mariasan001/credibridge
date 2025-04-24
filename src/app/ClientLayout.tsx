"use client"

import { usePathname } from "next/navigation"
import { Sidebar } from "@/components/menu/Sidebar"
import { useEffect, useState } from "react"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Mientras no haya montado, no renderices nada (evita desincronización)
  if (!mounted) return null

  const isLoginPage = pathname === "/user/inicar-sesion"

  return (
    <div className="flex min-h-screen">
      {!isLoginPage && <Sidebar />}
      <main className="flex-1">{children}</main>
    </div>
  )
}
