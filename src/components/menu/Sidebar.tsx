"use client"

// Hooks y utilidades
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { menuItems } from "@/constants/menuItems"

// Estilos y componentes del sidebar
import "@/styles/sidebar.css"
import { SidebarHeader } from "./SidebarHeader"
import { SidebarMenu } from "./SidebarMenu"
import { SidebarBottom } from "./SidebarBottom"

export const Sidebar = () => {
  const { user } = useAuth()
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  const isBrowser = typeof window !== "undefined"

  // Cargar el estado desde localStorage en el cliente
  useEffect(() => {
    if (isBrowser) {
      const savedState = localStorage.getItem("sidebar-collapsed")
      setIsCollapsed(savedState === "true")

      // También colapsar automáticamente si pantalla es pequeña
      if (window.innerWidth < 768) {
        setIsCollapsed(true)
      }
    }
  }, [])

  // Guardar el estado de colapso en localStorage + agregar clase al body
  useEffect(() => {
    if (isBrowser) {
      localStorage.setItem("sidebar-collapsed", String(isCollapsed))
      document.body.classList.toggle("sidebar-collapsed", isCollapsed)
    }
  }, [isCollapsed])

  const toggleSidebar = () => setIsCollapsed(prev => !prev)
  const toggleSubmenu = (route: string) =>
    setOpenMenu(prev => (prev === route ? null : route))

  const mainItems = menuItems.filter(
    item => !["/configuracion", "/centro-de-comunicacion"].includes(item.route)
  )
  const bottomItems = menuItems.filter(
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
