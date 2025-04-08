"use client"

// Importación de Next.js para navegación entre páginas
import Link from "next/link"

// Íconos para mostrar flechas de expansión/colapso
import { ChevronRight, ChevronDown } from "lucide-react"

// Definimos las propiedades que espera este componente
interface Props {
  item: any                  // Objeto del menú con posibles subopciones
  isOpen: boolean            // Indica si este submenú está abierto
  isCollapsed: boolean       // Indica si el sidebar está colapsado
  toggleSubmenu: (route: string) => void // Función para abrir/cerrar el submenú
  pathname: string           // Ruta actual del navegador
  user: any                  // Usuario actual (usado para permisos por rol)
}

// Componente que renderiza una opción de menú con subopciones
export const SidebarLinkWithSub = ({
  item,
  isOpen,
  isCollapsed,
  toggleSubmenu,
  pathname,
  user,
}: Props) => {
  // Filtramos subopciones según el rol del usuario
  const children = item.children.filter((child: any) =>
    child.roles.includes(user.rol)
  )

  return (
    <li className="sidebar__item">
      {/* Enlace principal del menú que abre/cierra el submenú */}
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

      {/* Submenú expandido visible solo si no está colapsado */}
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

      {/* Popover flotante si el menú está colapsado */}
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
