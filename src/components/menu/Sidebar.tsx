"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { menuItems } from "@/constants/menuItems"

import "@/styles/sidebar.css"
import { SidebarHeader } from "./SidebarHeader"
import { SidebarBottom } from "./SidebarBottom"
import { SidebarMenu } from "./SidebarMenu"
import { abortOnSynchronousPlatformIOAccess } from "next/dist/server/app-render/dynamic-rendering"

export const Sidebar = () => {
  const { user, loading } = useAuth()
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  const isBrowser = typeof window !== "undefined"

useEffect(() => {
  if (isBrowser) {
    // Forzar colapsado siempre al inicio
    setIsCollapsed(true)
    localStorage.setItem("sidebar-collapsed", "true")
    document.body.classList.add("sidebar-collapsed")
  }
}, [])


  useEffect(() => {
    if (isBrowser) {
      localStorage.setItem("sidebar-collapsed", String(isCollapsed))
      document.body.classList.toggle("sidebar-collapsed", isCollapsed)
    }
  }, [isCollapsed])

  const toggleSidebar = () => setIsCollapsed(prev => !prev)
  const toggleSubmenu = (route: string) =>
    setOpenMenu(prev => (prev === route ? null : route))

  // 🧠 Validaciones de seguridad
  if (loading) return null
  if (!user || !Array.isArray(user.roles)) return null

  // ✅ Ahora ya seguro tienes usuario y roles
  const userRoles = user.roles.map(r => r.id)

  const filteredMenuItems = menuItems.filter(item =>
    item.roles.some(role => userRoles.includes(role))
  )

  const mainItems = filteredMenuItems.filter(
    item => !["/configuracion", "/centro-de-comunicacion"].includes(item.route)
  )

  const bottomItems = filteredMenuItems.filter(
    item => ["/configuracion", "/centro-de-comunicacion"].includes(item.route)
  )

  return (
    <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <SidebarHeader isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      <SidebarMenu
        items={mainItems}
        user={user}
        isCollapsed={isCollapsed}
        openMenu={openMenu}
        toggleSubmenu={toggleSubmenu}
        pathname={pathname}
      />
      <SidebarBottom
        items={bottomItems}
        user={user}
        isCollapsed={isCollapsed}
        openMenu={openMenu}
        toggleSubmenu={toggleSubmenu}
        pathname={pathname}
      />
    </aside>
  )
}
