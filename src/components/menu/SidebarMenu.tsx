"use client"

import Link from "next/link"
import { SidebarLinkWithSub } from "./SidebarLinkWithSub"

export const SidebarMenu = ({
  items,
  user,
  isCollapsed,
  openMenu,
  toggleSubmenu,
  pathname,
}: any) => {
  // Sacamos los ids de roles que tiene el usuario
  const userRoleIds = user.roles.map((r: any) => r.id)

  return (
    <div className="sidebar__scroll-area">
      <ul className="sidebar__menu">
        {items
          .filter((item: any) => item.roles.some((role: number) => userRoleIds.includes(role))) // 🔥 Aquí corregimos
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
