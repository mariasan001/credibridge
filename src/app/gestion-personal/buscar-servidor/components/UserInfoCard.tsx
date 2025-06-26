"use client";

import { memo } from "react";
import { User } from "../model/lender_search_model";
import "./UserInfoCard.css";
import { UserCircle } from "lucide-react";

interface Props {
  user: User;
  totalActivos?: number;
  totalTerminados?: number;
}

function UserInfoCardComponent({ user, totalActivos = 1, totalTerminados = 1 }: Props) {
  return (
    <div className="user-info-card">
      <div className="avatar">
        <UserCircle size={64} color="white" strokeWidth={1.5} />
      </div>
      <div className="user-details">
        <h3>{user.name}</h3>
        <p className="email">{user.email || "Sin correo"}</p>
        <div className="resumen">
          <div>
            <span>{totalActivos}</span>
            <small>Descuentos Activos</small>
          </div>
          <div className="divider" />
          <div>
            <span>{totalTerminados}</span>
            <small>Contratos Terminados</small>
          </div>
        </div>
      </div>
    </div>
  );
}

// Exportando el componente memoizado
export const UserInfoCard = memo(UserInfoCardComponent);
