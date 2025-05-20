import { api } from "@/lib/apis";
import { SimType } from "../model/simType";

export const getSimTypes = async (): Promise<SimType[]> => {
  try {
    const response = await api.get("/api/sim-types");
    return response.data; // ✅ TypeScript ya sabe que esto es SimType[]
  } catch (error) {
    console.error("Error al obtener tipos de simulación:", error);
    throw error;
  }
};
