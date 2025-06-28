// services/lenderService.ts

import { api } from "@/lib/apis";
import { Lender } from "../types/lender";

export const getLenders = async (): Promise<Lender[]> => {
  const response = await api.get("/api/admin/lenders");
  return response.data;
};

export const createLender = async (data: Partial<Lender>): Promise<Lender> => {
  const response = await api.post("/api/admin/lenders", data);
  return response.data;
};

export const updateLender = async (id: number, data: Partial<Lender>): Promise<Lender> => {
  const response = await api.put(`/api/admin/lenders/${id}`, data);
  return response.data;
};

export const deleteLender = async (id: number): Promise<void> => {
  await api.delete(`/api/admin/lenders/${id}`);
};
