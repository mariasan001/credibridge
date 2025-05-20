import { api } from "@/lib/apis";

export const getUserDiscountLimit = async (userId: string): Promise<number> => {
  try {
    const response = await api.get(`/users/${userId}/discount-limit`);
    return response.data; // Asumiendo que solo devuelve un número
  } catch (error) {
    console.error("Error al consultar el límite de descuento:", error);
    throw error;
  }
};
