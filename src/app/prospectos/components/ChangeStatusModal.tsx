"use client";

import { useState } from "react";
import "./ChangeStatusModal.css";
import { ContractStatus } from "../models/ContractStatus";

interface Props {
  visible: boolean;
  onClose: () => void;
  onChangeStatus: (newStatusId: number) => void;
  statusList: ContractStatus[];
}

export function ChangeStatusModal({
  visible,
  onClose,
  onChangeStatus,
  statusList,
}: Props) {
  const [selectedStatusId, setSelectedStatusId] = useState<number | null>(null);

  if (!visible) return null;

  const handleClose = () => {
    setSelectedStatusId(null);
    onClose();
  };

  const handleSubmit = () => {
    if (selectedStatusId) {
      onChangeStatus(selectedStatusId);
      setSelectedStatusId(null); // por si se mantiene el modal en pantalla
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h3>Cambiar estatus del contrato</h3>

        <select
          value={selectedStatusId ?? ""}
          onChange={(e) => setSelectedStatusId(Number(e.target.value))}
        >
          <option value="">Selecciona un estatus</option>
          {statusList.map((s) => (
            <option key={s.id} value={s.id}>
              {s.contractStatusDesc}
            </option>
          ))}
        </select>

        <div className="modal-actions">
          <button disabled={!selectedStatusId} onClick={handleSubmit}>
            Cambiar
          </button>
          <button onClick={handleClose} className="cancel-btn">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}