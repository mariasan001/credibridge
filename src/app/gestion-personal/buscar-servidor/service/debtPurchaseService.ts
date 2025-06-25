// services/debtPurchaseService.ts
import { api } from "@/lib/apis";

export const enviarSolicitudPaso2 = async (body: {
  requestId: number;
  lenderServiceId: number;
  userId: string;
  contractType: number;
  installments: number;
  amount: number;
  biweeklyDiscount: number;
  effectiveRate: number;
  effectiveAnnualRate: number;
  phone: string;
  installmentsToCover: number;
  outstandingBalance: number;
  beneficiaryName: string;
  beneficiaryRfc: string;
  serverClabe: string;
  oldContract: number;
}) => {
  try {
    const response = await api.post("/api/debt-purchase/step2", body);
    return response.data;
  } catch (error: any) {
    console.error("❌ Error en la compra de deuda:", error);
    throw error;
  }
};
