import { api } from "@/lib/apis";
import { AmortizationResponse } from "../model/amortization_model";

export const getAmortizationDetail = async (contractId: number): Promise<AmortizationResponse> => {
  const response = await api.get(`/api/lender/${contractId}/amortization`);
  return response.data;
};
