import { api } from "@/lib/apis";
import { CashPaymentPayload } from "../model/CashPaymentPayload";
import toast from "react-hot-toast";

export const uploadCashPayment = async (payload: CashPaymentPayload): Promise<void> => {
  const formData = new FormData();
  formData.append("file", payload.file);
  formData.append("amortizationId", String(payload.amortizationId));
  formData.append("cashPaymentType", payload.cashPaymentType);
  formData.append("comment", payload.comment);

  // (Depuración opcional)
  for (const [key, value] of formData.entries()) {
    console.log(`FormData -> ${key}:`, value);
  }

  try {
    await api.post("/api/cash-payments/cash-payments", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    toast.success("Pago en efectivo cargado exitosamente.");
  } catch (error) {
    toast.error("Error al cargar el pago en efectivo.");
    throw error;
  }
};
