"use client";

import { enviarSolicitudPaso2 } from "../service/debtPurchaseService";
import "./ContratoModal.css";

interface Props {
    contrato: any;
    onClose: (success?: boolean) => void;
}

export function DetalleContratoModal({ contrato, onClose }: Props) {
    const handleConfirmarCompra = async () => {
        const idDbtPurchase = localStorage.getItem("idDbtPurchase");

        if (!idDbtPurchase || isNaN(Number(idDbtPurchase))) {
            alert("El ID de la solicitud no es válido.");
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
            oldContract: contrato.contractId
        };

        console.log("📦 Enviando solicitud:", body);

        try {
            const res = await enviarSolicitudPaso2(body);
            console.log("✅ Respuesta recibida:", res);

            alert("✅ Contrato registrado exitosamente."); 

            onClose(true);
        } catch (error: any) {
            console.error("❌ Error capturado:", error);

            if (error.response) {
                alert(`Error del servidor: ${JSON.stringify(error.response.data)}`);
            } else if (error.request) {
                alert("No hubo respuesta del servidor.");
            } else {
                alert(`Error inesperado: ${error.message || "Desconocido"}`);
            }
        }

    };

    return (
        <div className="modal-backdrop">
            <div className="modal-detalle">
                <h3>Detalle del Contrato</h3>
                <p><strong>Financiera:</strong> {contrato.lender?.lenderName}</p>
                <p><strong>Tipo:</strong> {contrato.lenderService?.serviceType?.serviceTypeDesc}</p>
                <p><strong>Folio:</strong> {contrato.contractId}</p>
                <p><strong>Saldo Anterior:</strong> ${contrato.lastBalance?.toFixed(2) || "0.00"}</p>
                <p><strong>Plazos:</strong> {contrato.installments}</p>
                <div className="acciones">
                    <button onClick={() => onClose(false)}>Cancelar</button>
                    <button onClick={handleConfirmarCompra}>Confirmar Compra</button>
                </div>
            </div>
        </div>
    );
}
