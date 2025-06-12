import React from "react";

interface Props {
  visible: boolean;
  usuariosAsignables: string[];
  usuarioSeleccionado: string;
  setUsuarioSeleccionado: (value: string) => void;
  onAssign: () => void;
  onClose: () => void;
}

export const AssignModal = ({
  visible,
  usuariosAsignables,
  usuarioSeleccionado,
  setUsuarioSeleccionado,
  onAssign,
  onClose,
}: Props) => {
  if (!visible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h3>Asignar contrato</h3>
        <select
          value={usuarioSeleccionado}
          onChange={(e) => setUsuarioSeleccionado(e.target.value)}
        >
          <option value="">Selecciona un usuario</option>
          {usuariosAsignables.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>
        <div className="modal-actions">
          <button className="btn btn-primary" onClick={onAssign} disabled={!usuarioSeleccionado}>
            Asignar
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
