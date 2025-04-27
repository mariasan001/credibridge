"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { menuItems } from "@/constants/menuItems"

import "@/styles/sidebar.css"
import { SidebarHeader } from "./SidebarHeader"

import { SidebarBottom } from "./SidebarBottom"
import { SidebarMenu } from "./SidebarMenu"

export const Sidebar = () => {
  const { user, loading } = useAuth() // 🔥 ahora también traemos loading
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  const isBrowser = typeof window !== "undefined"

  useEffect(() => {
    if (isBrowser) {
      const savedState = localStorage.getItem("sidebar-collapsed")
      setIsCollapsed(savedState === "true")

      if (window.innerWidth < 768) {
        setIsCollapsed(true)
      }
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

  if (loading) return null // 🔥 mientras carga el user no pintes nada

  if (!user) return null // 🔥 si no hay usuario tampoco renderices el sidebar

  // ✅ Ahora ya seguro tienes usuario para filtrar menús
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
