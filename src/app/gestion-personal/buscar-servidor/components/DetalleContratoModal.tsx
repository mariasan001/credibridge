"use client";

import { enviarSolicitudPaso2 } from "../service/debtPurchaseService";
import styles from "./DetalleContratoModal.module.css";
import toast from "react-hot-toast";

interface Props {
  contrato: any;
  onClose: (success?: boolean) => void;
}

export function DetalleContratoModal({ contrato, onClose }: Props) {
  const handleConfirmarCompra = async () => {
    const idDbtPurchase = localStorage.getItem("idDbtPurchase");

    if (!idDbtPurchase || isNaN(Number(idDbtPurchase))) {
      toast.error("El ID de la solicitud no es válido.");
      return;
    }

    const body = {
      requestId: Number(idDbtPurchase),
      lenderServiceId: contrato.lenderService?.id || 0,
      userId: contrato.user.userId,
      contractType: contrato.lenderService?.serviceType.id || 0,
      installments: contrato.installments,
      amount: contrato.amount,
      biweeklyDiscount: contrato.biweeklyDiscount,
      effectiveRate: contrato.effectiveRate ?? 0,
      effectiveAnnualRate: contrato.anualRate ?? 0,
      phone: contrato.user.phone || "",
      installmentsToCover: contrato.installmentsToCover ?? 0,
      outstandingBalance: contrato.lastBalance ?? 0,
      beneficiaryName: contrato.user.name,
      beneficiaryRfc: contrato.user.rfc,
      serverClabe: contrato.serverClabe || "",
      oldContract: contrato.contractId,
    };

    try {
      await toast.promise(
        enviarSolicitudPaso2(body),
        {
          loading: "Registrando contrato...",
          success: "Contrato registrado exitosamente.",
          error: (err) =>
            err?.response?.data
              ? `Error del servidor: ${JSON.stringify(err.response.data)}`
              : "Ocurrió un error inesperado.",
        }
      );
      onClose(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Confirmar Compra de Deuda</h2>

        <div className={styles.infoGroup}>
          <div><span>Financiera:</span> {contrato.lender?.lenderName}</div>
          <div><span>Tipo:</span> {contrato.lenderService?.serviceType?.serviceTypeDesc}</div>
          <div><span>Folio:</span> {contrato.contractId}</div>
          <div><span>Saldo Anterior:</span> ${contrato.lastBalance?.toFixed(2) || "0.00"}</div>
          <div><span>Plazos:</span> {contrato.installments}</div>
        </div>

        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={() => onClose(false)}>Cancelar</button>
          <button className={styles.confirmBtn} onClick={handleConfirmarCompra}>Confirmar</button>
        </div>
      </div>
    </div>
  );
}
