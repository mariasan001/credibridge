import React, { useState } from "react";
import "./cash-payment-modal.css";
import { uploadCashPayment } from "../service/cashPaymentService";
import { CashPaymentPayload } from "../model/CashPaymentPayload";

const cashPaymentOptions = [
  { label: "Devolución de sobrepago", value: "OVERPAYMENT_RETURN" },
  { label: "Otro tipo de pago", value: "SOME_OTHER_TYPE" },
] as const;

interface CashPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  creditId: number;
}

export const CashPaymentModal: React.FC<CashPaymentModalProps> = ({
  isOpen,
  onClose,
  creditId,
}) => {
  const [cashPaymentType, setCashPaymentType] = useState<CashPaymentPayload["cashPaymentType"]>("OVERPAYMENT_RETURN");
  const [comment, setComment] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!file) {
      alert("Debes subir un archivo.");
      return;
    }

    const payload: CashPaymentPayload = {
      amortizationId: creditId,
      cashPaymentType,
      comment,
      file,
    };

    console.log("📦 Enviando payload a la API:", payload);

    setLoading(true);
    try {
      await uploadCashPayment(payload);
      console.log("✅ Envío exitoso");
      onClose();
    } catch (error) {
      console.error("❌ Error al subir el pago:", error);
      alert("Ocurrió un error al enviar el pago. Verifica la consola para más detalles.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="cash-payment-modal-overlay">
      <div className="cash-payment-modal">
        <h2 className="cash-payment-modal-title">Registrar pago en efectivo</h2>

        {/* Clave del contrato */}
        <div className="cash-payment-modal-field">
          <label htmlFor="creditId">Clave del Contrato</label>
          <input
            id="creditId"
            type="text"
            value={creditId}
            readOnly
            className="input-readonly"
          />
        </div>

        {/* Tipo de pago */}
        <div className="cash-payment-modal-field">
          <label htmlFor="type">Tipo de Pago</label>
          <select
            id="type"
            value={cashPaymentType}
            onChange={(e) =>
              setCashPaymentType(e.target.value as CashPaymentPayload["cashPaymentType"])
            }
          >
            {cashPaymentOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Comentario */}
        <div className="cash-payment-modal-field">
          <label htmlFor="comment">Comentario</label>
          <input
            id="comment"
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Escribe un comentario..."
          />
        </div>

        {/* Archivo */}
        <div className="cash-payment-modal-field">
          <label htmlFor="file">Archivo</label>
          <input
            id="file"
            type="file"
            onChange={(e) => e.target.files?.[0] && setFile(e.target.files[0])}
          />
        </div>

        {/* Botones */}
        <div className="cash-payment-modal-actions">
          <button className="cash-payment-btn-cancel" onClick={onClose}>
            Cancelar
          </button>
          <button
            className="cash-payment-btn-submit"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </div>
      </div>
    </div>
  );
};
