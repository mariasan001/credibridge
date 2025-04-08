"use client"

import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"
import { menuItems } from "@/constants/menuItems"
import { useState } from "react"
import {
  ChevronRight,
  ChevronDown,
  LogOut,
  Menu,
  ArrowLeft
} from "lucide-react"
import { usePathname } from "next/navigation"

import "@/styles/sidebar.css"

export const Sidebar = () => {
  const { user } = useAuth()
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  const mainItems = menuItems.filter(
    item => !["/configuracion", "/centro-de-comunicacion"].includes(item.route)
  )

  const bottomItems = menuItems.filter(
    item => ["/configuracion", "/centro-de-comunicacion"].includes(item.route)
  )

  const toggleSidebar = () => setIsCollapsed(prev => !prev)

  const toggleSubmenu = (route: string) => {
    setOpenMenu(prev => (prev === route ? null : route))
  }

  return (
    <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar__header">
        <div className="sidebar__brand">
          {!isCollapsed && <h2 className="sidebar__logo">CrediBridge</h2>}
          <button onClick={toggleSidebar} className="sidebar__toggle" title="Colapsar menú">
            {isCollapsed ? <Menu size={20} /> : <ArrowLeft size={20} />}
          </button>
        </div>
      </div>

      <span className="sidebar__section-label">
        {!isCollapsed && "Menú"}
      </span>

      <div className="sidebar__scroll-area">
        <ul className="sidebar__menu">
          {mainItems
            .filter(item => item.roles.includes(user.rol))
            .map((item, i) => {
              const isOpen = openMenu === item.route
              const hasChildren = !!item.children

              return (
                <li
                  key={i}
                  className="sidebar__item"
                  style={{ position: "relative" }}
                >
                  {hasChildren ? (
                    <>
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

                      {/* Submenú normal */}
                      {!isCollapsed && isOpen && (
                        <ul className="sidebar__submenu">
                          {item.children
                            .filter(child => child.roles.includes(user.rol))
                            .map((child, j) => (
                              <li key={j}>
                                <Link
                                  href={child.route}
                                  className={`sidebar__sublink ${
                                    pathname === child.route
                                      ? "sidebar__sublink--active"
                                      : ""
                                  }`}
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                        </ul>
                      )}

                      {/* Popover si está colapsado */}
                      {isCollapsed && (
                        <div className="sidebar__popover">
                          {item.children
                            .filter(child => child.roles.includes(user.rol))
                            .map((child, j) => (
                              <Link key={j} href={child.route}>
                                {child.label}
                              </Link>
                            ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <Link href={item.route} className="sidebar__link">
                        <item.icon size={20} className="sidebar__icon" />
                        {!isCollapsed && <span>{item.label}</span>}
                      </Link>

                      {/* Tooltip para colapsado */}
                      {isCollapsed && <div className="sidebar__tooltip">{item.label}</div>}
                    </>
                  )}
                </li>
              )
            })}
        </ul>
      </div>

      <div className="sidebar__bottom">
        {bottomItems
          .filter(item => item.roles.includes(user.rol))
          .map((item, i) => (
            <Link
              key={i}
              href={item.route}
              className="sidebar__link sidebar__link--bottom"
              title={isCollapsed ? item.label : ""}
            >
              <item.icon size={20} className="sidebar__icon" />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          ))}

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

        <button className="sidebar__logout" title="Cerrar sesión">
          <LogOut size={18} />
          {!isCollapsed && <span>cerrar sesión</span>}
        </button>
      </div>
    </aside>
  )
}
