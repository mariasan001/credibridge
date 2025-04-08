"use client"

// Importaciones principales
import Link from "next/link"
import { LogOut } from "lucide-react"
import { SidebarLinkWithSub } from "./SidebarLinkWithSub"

// Componente SidebarBottom: muestra la parte inferior del menú lateral
export const SidebarBottom = ({
  items,         // ítems a mostrar (configuración, centro de comunicación, etc.)
  user,          // usuario autenticado
  isCollapsed,   // estado del menú (colapsado o no)
  openMenu,      // ruta activa del submenú
  toggleSubmenu, // función para abrir/cerrar submenús
  pathname       // ruta actual
}: any) => (
  <div className="sidebar__bottom">
    {/* Mapeamos los ítems inferiores */}
    {items
      .filter((item: any) => item.roles.includes(user.rol))
      .map((item: any, i: number) =>
        item.children ? (
          // Si tiene subopciones, usamos el componente SidebarLinkWithSub
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
          // Si no tiene subopciones, renderizamos un link simple
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

    {/* Información de perfil del usuario (solo si no está colapsado) */}
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
    <button className="sidebar__logout" title="Cerrar sesión">
      <LogOut size={18} />
      {!isCollapsed && <span>cerrar sesión</span>}
    </button>
  </div>
)
