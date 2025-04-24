"use client"

import Link from "next/link"
import { LogOut } from "lucide-react"
import { SidebarLinkWithSub } from "./SidebarLinkWithSub"
import { ThemeToggleButton } from "../theme/ThemeToggle"
import { useAuth } from "@/context/AuthContext" // 

export const SidebarBottom = ({
  items,
  user,
  isCollapsed,
  openMenu,
  toggleSubmenu,
  pathname
}: any) => {
  const { logout } = useAuth() // 
  return (
    <div className="sidebar__bottom">
      {/* Mapeamos los ítems inferiores */}
      {items
        .filter((item: any) => item.roles.includes(user.rol))
        .map((item: any, i: number) =>
          item.children ? (
            <SidebarLinkWithSub
              key={i}
              item={item}
              isOpen={openMenu === item.route}
              isCollapsed={isCollapsed}
              toggleSubmenu={toggleSubmenu}
              pathname={pathname}
              user={user}
            />
          ) : (
            <Link
              key={i}
              href={item.route}
              className={`sidebar__link sidebar__link--bottom ${
                pathname === item.route ? "sidebar__link--active" : ""
              }`}
              title={isCollapsed ? item.label : ""}
            >
              <item.icon size={20} className="sidebar__icon" />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          )
        )}

      {/* Botón de cambio de tema */}
      <ThemeToggleButton isCollapsed={isCollapsed} />

      {/* Perfil de usuario */}
      {!isCollapsed && (
        <>
          <div className="sidebar__perfil-label">Perfil</div>
          <div className="sidebar__perfil">
            <div className="sidebar__avatar" />
            <div className="sidebar__perfil-info">
              <strong>{user.nombre}</strong>
              <p className="sidebar__perfil-rol">administrador sistemas</p>
            </div>
          </div>
        </>
      )}
      {/* Botón para cerrar sesión */}
      <button className="sidebar__logout" title="Cerrar sesión" onClick={logout}>
        <LogOut size={18} />
        {!isCollapsed && <span>cerrar sesión</span>}
      </button>
    </div>
  )
}
