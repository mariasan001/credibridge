"use client"

// Importamos íconos para el botón de colapso/expansión
import { Menu, ArrowLeft } from "lucide-react"

// Definimos las propiedades que recibe el componente
interface Props {
  isCollapsed: boolean      // Indica si el menú está colapsado o no
  toggleSidebar: () => void // Función que alterna el estado del menú
}

// Componente SidebarHeader: muestra el encabezado del sidebar (logo y botón de colapso)

export const SidebarHeader = ({ isCollapsed, toggleSidebar }: Props) => (
  <div className="sidebar__header">
    <div className="sidebar__brand">
      {/* Mostramos el logo solo si no está colapsado */}
      {!isCollapsed && <h2 className="sidebar__logo">CrediBridge</h2>}

      {/* Botón que permite colapsar o expandir el menú */}
      <button
        onClick={toggleSidebar}
        className="sidebar__toggle"
        title="Colapsar menú"
      >
        {/* Ícono cambia según el estado */}
        {isCollapsed ? <Menu size={20} /> : <ArrowLeft size={20} />}
      </button>
    </div>

    {/* Etiqueta "Menú", visible solo si no está colapsado */}
    <span className="sidebar__section-label">
      {!isCollapsed && "Menú"}
    </span>
  </div>
)
