"use client"

import Link from "next/link"
import { SidebarLinkWithSub } from "./SidebarLinkWithSub"
import { Usuario } from "@/model/usuario.models" // Asegúrate de ajustar esta ruta si varía

// Definimos el tipo del item del menú
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

export const SidebarMenu = ({
  items,
  user,
  isCollapsed,
  openMenu,
  toggleSubmenu,
  pathname,
}: Props) => {
  const userRoleIds = user.roles.map(r => r.id)

  return (
    <div className="sidebar__scroll-area">
      <ul className="sidebar__menu">
        {items
          .filter(
            (item): item is MenuItem =>
              !!item && item.roles?.some(role => userRoleIds.includes(role))
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
              <li key={i} className="sidebar__item">
                <Link
                  href={item.route}
                  className={`sidebar__link ${
                    pathname === item.route ? "sidebar__link--active" : ""
                  }`}
                >
                  <item.icon size={20} className="sidebar__icon" />
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
                {isCollapsed && (
                  <div className="sidebar__tooltip">{item.label}</div>
                )}
              </li>
            )
          )}
      </ul>
    </div>
  )
}
