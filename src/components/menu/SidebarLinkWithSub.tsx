"use client"

import Link from "next/link"
import { ChevronRight, ChevronDown } from "lucide-react"

interface Props {
  item: any
  isOpen: boolean
  isCollapsed: boolean
  toggleSubmenu: (route: string) => void
  pathname: string
  user: any
}

export const SidebarLinkWithSub = ({
  item,
  isOpen,
  isCollapsed,
  toggleSubmenu,
  pathname,
  user,
}: Props) => {
  // 🚀 Traemos todos los ids de los roles del usuario
  const userRoles = user?.roles.map((r: any) => r.id) || []

  // 🚀 Filtramos los submenús permitidos según los roles
  const children = item.children.filter((child: any) =>
    child.roles.some((role: number) => userRoles.includes(role))
  )

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
          {children.map((child: any, j: number) => (
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
          {children.map((child: any, j: number) => (
            <Link key={j} href={child.route}>
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </li>
  )
}
