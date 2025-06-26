"use client"

import Link from "next/link"
import { LogOut } from "lucide-react"
import { SidebarLinkWithSub } from "./SidebarLinkWithSub"
import { ThemeToggleButton } from "../theme/ThemeToggle"
import { useAuth } from "@/context/AuthContext"
import { Usuario } from "@/model/usuario.models" // ajusta la ruta si es necesario

interface MenuItem {
  label: string
  icon: React.ElementType
  route: string
  roles: number[]
  children?: MenuItem[]
}

interface Props {
  items: MenuItem[]
  user: Usuario
  isCollapsed: boolean
  openMenu: string | null
  toggleSubmenu: (route: string) => void
  pathname: string
}

export const SidebarBottom = ({
  items,
  user,
  isCollapsed,
  openMenu,
  toggleSubmenu,
  pathname,
}: Props) => {
  const { logout } = useAuth()

  const userRoles = user?.roles.map(r => r.id) || []

  return (
    <div className="sidebar__bottom">
      {items
        .filter((item): item is MenuItem =>
          item && item.roles?.some(role => userRoles.includes(role))
        )
        .map((item, i) =>
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

      <ThemeToggleButton isCollapsed={isCollapsed} />

      {!isCollapsed && user && (
        <>
          <div className="sidebar__perfil-label">Perfil</div>
          <div className="sidebar__perfil">
            <div className="sidebar__avatar" />
            <div className="sidebar__perfil-info">
              <strong>{user.name}</strong>
              <p className="sidebar__perfil-rol">
                {user.roles.map(role => role.description).join(", ")}
              </p>
            </div>
          </div>
        </>
      )}

      <button className="sidebar__logout" title="Cerrar sesión" onClick={logout}>
        <LogOut size={18} />
        {!isCollapsed && <span>Cerrar sesión</span>}
      </button>
    </div>
  )
}
