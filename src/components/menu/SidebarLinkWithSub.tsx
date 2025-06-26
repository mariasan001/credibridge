"use client"

import Link from "next/link"
import { ChevronRight, ChevronDown } from "lucide-react"
import { Usuario } from "@/model/usuario.models" // ajusta si está en otra ruta

interface MenuItem {
  label: string
  icon: React.ElementType
  route: string
  roles: number[]
  children?: MenuItem[]
}

interface Props {
  item: MenuItem
  isOpen: boolean
  isCollapsed: boolean
  toggleSubmenu: (route: string) => void
  pathname: string
  user: Usuario
}

export const SidebarLinkWithSub = ({
  item,
  isOpen,
  isCollapsed,
  toggleSubmenu,
  pathname,
  user,
}: Props) => {
  const userRoles = user?.roles.map(r => r.id) || []

  const children = item.children?.filter(child =>
    child.roles.some(role => userRoles.includes(role))
  ) || []

  return (
    <li className="sidebar__item">
      <div
        className="sidebar__link sidebar__link--with-sub"
        onClick={() => !isCollapsed && toggleSubmenu(item.route)}
      >
        <item.icon size={20} className="sidebar__icon" />
        {!isCollapsed && <span>{item.label}</span>}
        {!isCollapsed &&
          (isOpen ? (
            <ChevronDown size={16} className="sidebar__arrow" />
          ) : (
            <ChevronRight size={16} className="sidebar__arrow" />
          ))}
      </div>

      {/* Submenú expandido */}
      {!isCollapsed && isOpen && (
        <ul className="sidebar__submenu">
          {children.map((child, j) => (
            <li key={j}>
              <Link
                href={child.route}
                className={`sidebar__sublink ${
                  pathname === child.route ? "sidebar__sublink--active" : ""
                }`}
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* Tooltip flotante si el sidebar está colapsado */}
      {isCollapsed && (
        <div className="sidebar__popover">
          {children.map((child, j) => (
            <Link key={j} href={child.route}>
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </li>
  )
}
