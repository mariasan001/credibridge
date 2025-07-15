import React from "react";
import "./cash-payment-details-modal.css"; 
import { ActualPayment } from "../model/amortization_model";

interface Props {
  payment: ActualPayment;
  onClose: () => void;
}

export const CashPaymentDetailsModal: React.FC<Props> = ({ payment, onClose }) => {
  if (!payment) return null;

  return (
    <div className="cash-payment-modal-overlay">
      <div className="cash-payment-modal">
        <h2 className="cash-payment-modal-title">Detalle del Pago</h2>

        <div className="cash-payment-details-grid">
          <Field label="ID" value={payment.id} />
          <Field label="Clave del Contrato" value={payment.creditId} />
          <Field label="Usuario" value={payment.user} />
          <Field label="Periodo" value={payment.period} />
          <Field label="Año" value={payment.anio} />
          <Field label="Fecha de creación" value={payment.createdAt} />
          <Field label="Saldo inicial" value={`$${payment.beginningBalance.toFixed(2)}`} />
          <Field label="Saldo final" value={`$${payment.endingBalance.toFixed(2)}`} />
          <Field label="Monto de pago" value={`$${payment.paymentAmount.toFixed(2)}`} />
          <Field label="Intereses" value={`$${payment.interestAmount.toFixed(2)}`} />
          <Field label="Estatus" value={getStatus(payment.paymentStatus)} />
          <Field label="Tipo de Pago" value={getType(payment.paymentType)} />
          <Field label="Fecha de reexpedición" value={payment.reshipmentDate} />
          <Field label="NEG/PPA" value={payment.negppa} />
          <Field label="Evidencia" value={payment.paymentTypeEvidence} />
          <Field label="Comentario" value={payment.coment} />
          <Field label="Archivo asociado (ID)" value={payment.fileId} />
        </div>

        <div className="cash-payment-modal-actions">
          <button className="cash-payment-btn-cancel" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, value }: { label: string; value: string | number }) => (
  <div className="cash-payment-field">
    <label>{label}:</label>
    <span>{value}</span>
  </div>
);

// Funciones utilitarias para mostrar estatus y tipo de pago en texto
function getStatus(status: number): string {
  switch (status) {
    case 0:
      return "No fue cubierto";
    case 1:
      return "Cubierto";
    case 2:
      return "Excedente";
    default:
      return "Desconocido";
  }
}

function getType(type: number): string {
  switch (type) {
    case 0:
      return "Descuento";
    case 1:
      return "Efectivo";
    default:
      return "Otro";
  }
}
