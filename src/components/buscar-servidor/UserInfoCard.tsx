// components/buscar-servidor/UserInfoCard.tsx
"use client"

interface UserInfoCardProps {
  nombre: string
  correo: string
  descuentosActivos: number
  contratosTerminados: number
}

export const UserInfoCard = ({ nombre, correo, descuentosActivos, contratosTerminados }: UserInfoCardProps) => {
  return (
    <div className="user-info-card">
      <div className="user-info-card__avatar" />
      <h3 className="user-info-card__name">{nombre}</h3>
      <p className="user-info-card__email">{correo}</p>

      <div className="user-info-card__stats">
        <div className="stat">
          <strong>{descuentosActivos}</strong>
          <span>Descuentos Activos</span>
        </div>
        <div className="divider" />
        <div className="stat">
          <strong>{contratosTerminados}</strong>
          <span>Contratos Terminados</span>
        </div>
      </div>
    </div>
  )
}