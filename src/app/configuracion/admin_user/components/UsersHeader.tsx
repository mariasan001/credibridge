"use client"

import "./UsersHeader.css"

interface Props {
  onCreateUser?: () => void
}

export default function UsersHeader({ onCreateUser }: Props) {
  return (
    <div className="users-header">
      <div className="users-header-text">
        <h1>Control de Usuarios</h1>
        <p>Administra los usuarios activos, sus roles y permisos asignados dentro del sistema.</p>
      </div>
      <div className="users-header-action">
        <button className="crear-usuario-btn" onClick={onCreateUser}>
          + Crear nuevo usuario
        </button>
      </div>
    </div>
  )
}
