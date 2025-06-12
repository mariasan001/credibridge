"use client";

import { useEffect, useState } from "react";
import { fetchLenderUserIds } from "../service/lender_user_service";
import "./AsignarModal.css";

interface Props {
  ticketId: number;
  onSelect: (userId: string) => void;
  onClose: () => void;
}

export default function AsignarModal({ ticketId, onSelect, onClose }: Props) {
  const [usuarios, setUsuarios] = useState<string[]>([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState("");

  useEffect(() => {
    fetchLenderUserIds()
      .then(setUsuarios)
      .catch(() => setUsuarios([]));
  }, []);

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3>Asignar usuario al ticket #{ticketId}</h3>
          <button onClick={onClose} className="modal-close-btn">✕</button>
        </div>

        <select
          value={usuarioSeleccionado}
          onChange={(e) => setUsuarioSeleccionado(e.target.value)}
        >
          <option value="">Selecciona un usuario</option>
          {usuarios.map(u => (
            <option key={u} value={u}>{u}</option>
          ))}
        </select>

        <div className="modal-actions">
          <button
            className="btn btn-primary"
            onClick={() => onSelect(usuarioSeleccionado)}
            disabled={!usuarioSeleccionado}
          >
            Asignar
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
