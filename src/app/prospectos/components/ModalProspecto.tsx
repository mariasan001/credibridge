"use client";

import { useEffect, useState } from "react";
import { Contract } from "../models/Contract";
import { ContractUpdateRequest } from "../models/ContractUpdateRequest";
import { toast } from "react-hot-toast";
import "./ModalProspecto.css";
import { updateContractConditions } from "../services/ContractUpdateSerice";
import SubirDocumentacion from "./SubirDocumentacion";

interface Props {
  contract: Contract | null;
  onClose: () => void;
  onModificar: (contract: Contract) => void;
}

export const ModalProspecto = ({ contract, onClose, onModificar }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [view, setView] = useState<"detalle" | "docs">("detalle");

  const [amount, setAmount] = useState<number>(0);
  const [amountInput, setAmountInput] = useState<string>("");

  const [installments, setInstallments] = useState<number>(0);
  const [installmentsInput, setInstallmentsInput] = useState<string>("");

  const [biweeklyDiscount, setBiweeklyDiscount] = useState<number>(0);
  const [discountInput, setDiscountInput] = useState<string>("");

  useEffect(() => {
    if (contract) {
      setAmount(contract.amount ?? 0);
      setAmountInput(formatCurrency(contract.amount ?? 0));

      setInstallments(contract.installments ?? 0);
      setInstallmentsInput(`${contract.installments ?? 0} plazos`);

      setBiweeklyDiscount(contract.biweeklyDiscount ?? 0);
      setDiscountInput(formatCurrency(contract.biweeklyDiscount ?? 0));
    }
  }, [contract]);

  const formatCurrency = (value: number) =>
    `$${value.toLocaleString("es-MX", { minimumFractionDigits: 2 })} MXN`;

  if (!contract) return null;

  const handleUpdate = async () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    const payload: ContractUpdateRequest = {
      contractId: contract.id,
      mount: amount,
      installments,
      biweeklyDicount: biweeklyDiscount,
    };

    console.log("📦 Payload enviado para actualizar contrato:", payload);

    try {
      await updateContractConditions(payload);
      toast.success("Cambios guardados correctamente");
      onModificar({ ...contract, amount, installments, biweeklyDiscount });
      setIsEditing(false);
      onClose();
    } catch (error) {
      toast.error("Error al guardar cambios");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box wide">
        <div className="modal-header">
          <h2>{view === "detalle" ? "Detalle del Prospecto" : "Subir Documentación"}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {view === "detalle" ? (
          <>
            <form className="form-grid-2col">
              <div className="form-group">
                <label>Teléfono</label>
                <input type="text" value={contract.phone} readOnly />
              </div>

              <div className="form-group">
                <label>RFC</label>
                <input type="text" value={contract.rfc} readOnly />
              </div>

              <div className="form-group">
                <label>ID del contrato</label>
                <input type="text" value={contract.id} readOnly />
              </div>

              <div className="form-group">
                <label>Monto solicitado</label>
                <input
                  type="text"
                  value={amountInput}
                  onFocus={() => setAmountInput(amount.toString())}
                  onBlur={(e) => {
                    const value = Number(e.target.value);
                    setAmount(value);
                    setAmountInput(formatCurrency(value));
                  }}
                  onChange={(e) => setAmountInput(e.target.value)}
                  readOnly={!isEditing}
                  className={isEditing ? "editable" : ""}
                />
              </div>

              <div className="form-group">
                <label>Cuotas</label>
                <input
                  type="text"
                  value={installmentsInput}
                  onFocus={() => setInstallmentsInput(installments.toString())}
                  onBlur={(e) => {
                    const value = Number(e.target.value);
                    setInstallments(value);
                    setInstallmentsInput(`${value} plazos`);
                  }}
                  onChange={(e) => setInstallmentsInput(e.target.value)}
                  readOnly={!isEditing}
                  className={isEditing ? "editable" : ""}
                />
              </div>

              <div className="form-group">
                <label>Descuento quincenal</label>
                <input
                  type="text"
                  value={discountInput}
                  onFocus={() => setDiscountInput(biweeklyDiscount.toString())}
                  onBlur={(e) => {
                    const value = Number(e.target.value);
                    setBiweeklyDiscount(value);
                    setDiscountInput(formatCurrency(value));
                  }}
                  onChange={(e) => setDiscountInput(e.target.value)}
                  readOnly={!isEditing}
                  className={isEditing ? "editable" : ""}
                />
              </div>

              <div className="form-group">
                <label>Tasa efectiva</label>
                <input type="text" value={`${contract.effectiveRate}%`} readOnly />
              </div>

              <div className="form-group">
                <label>Tasa anual</label>
                <input type="text" value={`${contract.anualRate}%`} readOnly />
              </div>

              <div className="form-group">
                <label>Fecha de solicitud</label>
                <input type="text" value={new Date(contract.createdAt).toLocaleDateString("es-MX")} readOnly />
              </div>

              <div className="form-group">
                <label>Tipo de servicio</label>
                <input type="text" value={contract.typeService} readOnly />
              </div>
            </form>

            <div className="modal-actions">
              <button className="btn secondary" onClick={handleUpdate}>
                {isEditing ? "Enviar cambios" : "Actualizar préstamo"}
              </button>
              <button className="btn secondary" onClick={() => setView("docs")}>
                Subir documentación
              </button>
              <button className="btn outline" onClick={onClose}>
                Cerrar
              </button>
            </div>
          </>
        ) : (
          <SubirDocumentacion
            contractId={contract.id}
            onVolver={() => setView("detalle")}
            onClose={onClose} // ✅ Esto es lo que falta
          />

        )}
      </div>
    </div>
  );
};
