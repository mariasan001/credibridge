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

  if (!mounted) return null

  // Ocultar Sidebar en login y recuperación
  const hideSidebarRoutes = ["/user/inicar-sesion", "/user/recuperacion", "/user/token","/user/nuevacontrasena"]
  const shouldHideSidebar = hideSidebarRoutes.includes(pathname)

  return (
    <div className="flex min-h-screen">
      {!shouldHideSidebar && <Sidebar />}
      <main className="flex-1">{children}</main>
    </div>
  )
}
 