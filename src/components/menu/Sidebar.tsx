"use client"

// Importaciones principales de React y hooks personalizados
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { menuItems } from "@/constants/menuItems"

// Importación de estilos y componentes del sidebar
import "@/styles/sidebar.css"
import { SidebarHeader } from "./SidebarHeader"
import { SidebarMenu } from "./SidebarMenu"
import { SidebarBottom } from "./SidebarBottom"

export const Sidebar = () => {
  const { user } = useAuth()
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [isCollapsed, setIsCollapsed] = useState(() => {
    // Cargamos estado inicial desde localStorage si existe
    const stored = localStorage.getItem("sidebar-collapsed")
    return stored ? stored === "true" : window.innerWidth < 768
  })
  const pathname = usePathname()

  // Guardar en localStorage y sincronizar clase del body
  useEffect(() => {
    document.body.classList.toggle("sidebar-collapsed", isCollapsed)
    localStorage.setItem("sidebar-collapsed", String(isCollapsed))
  }, [isCollapsed])

  // Escuchar cambios de tamaño si no hay preferencia en localStorage
  useEffect(() => {
    const handleResize = () => {
      if (!localStorage.getItem("sidebar-collapsed")) {
        setIsCollapsed(window.innerWidth < 768)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const toggleSidebar = () => setIsCollapsed(prev => !prev)
  const toggleSubmenu = (route: string) => setOpenMenu(prev => (prev === route ? null : route))

  const mainItems = menuItems.filter(item => !["/configuracion", "/centro-de-comunicacion"].includes(item.route))
  const bottomItems = menuItems.filter(item => ["/configuracion", "/centro-de-comunicacion"].includes(item.route))

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
