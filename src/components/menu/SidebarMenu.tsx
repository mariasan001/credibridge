"use client"

// Importación de Next.js para navegación entre páginas
import Link from "next/link"

// Componente reutilizable para enlaces con submenús
import { SidebarLinkWithSub } from "./SidebarLinkWithSub"

// Componente principal del menú de navegación superior (parte media del sidebar)
export const SidebarMenu = ({
  items,           // Array de elementos de menú
  user,            // Usuario actual (para evaluar roles)
  isCollapsed,     // Indica si el menú lateral está colapsado
  openMenu,        // Ruta del submenú actualmente abierto
  toggleSubmenu,   // Función para abrir/cerrar submenús
  pathname,        // Ruta actual (para resaltar el activo)
}: any) => (
  <div className="sidebar__scroll-area">
    <ul className="sidebar__menu">
      {items
        .filter((item: any) => item.roles.includes(user.rol)) // Solo muestra elementos según rol
        .map((item: any, i: number) =>
          item.children ? (
            // Si el ítem tiene subopciones, usamos el componente especializado
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
            // Enlace simple sin subopciones
            <li key={i} className="sidebar__item">
              <Link
                href={item.route}
                className={`sidebar__link ${
                  pathname === item.route ? "sidebar__link--active" : ""
                }`}
              >
                <item.icon size={20} className="sidebar__icon" />
                {/* Solo se muestra el texto si no está colapsado */}
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
              {/* Tooltip flotante visible solo en modo colapsado */}
              {isCollapsed && (
                <div className="sidebar__tooltip">{item.label}</div>
              )}
            </li>
          )
        )}
    </ul>
  </div>
)
