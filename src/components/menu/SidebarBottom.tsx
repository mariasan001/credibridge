"use client"

import Link from "next/link"
import { LogOut } from "lucide-react"
import { SidebarLinkWithSub } from "./SidebarLinkWithSub"
import { ThemeToggleButton } from "../theme/ThemeToggle"
import { useAuth } from "@/context/AuthContext"

export const SidebarBottom = ({
  items,
  user,
  isCollapsed,
  openMenu,
  toggleSubmenu,
  pathname
}: any) => {
  const { logout } = useAuth()

  // Sacamos los ids de roles del usuario
  const userRoles = user?.roles.map((r: any) => r.id) || []

  return (
    <div className="sidebar__bottom">
      {/* 🔥 Mapeamos los ítems filtrando por roles */}
      {items
        .filter((item: any) => item.roles.some((role: number) => userRoles.includes(role)))
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

      {/* 🌙 Botón de cambio de tema */}
      <ThemeToggleButton isCollapsed={isCollapsed} />

      {/* 👤 Perfil de usuario */}
      {!isCollapsed && user && (
        <>
          <div className="sidebar__perfil-label">Perfil</div>
          <div className="sidebar__perfil">
            <div className="sidebar__avatar" />
            <div className="sidebar__perfil-info">
              <strong>{user.username}</strong> {/* 🔥 Ya no user.nombre, ahora user.username */}
              <p className="sidebar__perfil-rol">
                {user.roles.map((role: any) => role.description).join(", ")}
              </p> {/* 🔥 Mostramos los roles */}
            </div>
          </div>
        </>
      )}

      {/* 🔥 Botón para cerrar sesión */}
      <button className="sidebar__logout" title="Cerrar sesión" onClick={logout}>
        <LogOut size={18} />
        {!isCollapsed && <span>Cerrar sesión</span>}
      </button>
    </div>
  )
}
