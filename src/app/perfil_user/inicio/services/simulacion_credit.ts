import { api } from "@/lib/apis";
import { SimulationRequest, SimulationResult } from "../model/discount_limit_controller";

export const simulateDiscount = async (
  data: SimulationRequest
): Promise<SimulationResult[]> => {
  try {
    const response = await api.post("/api/simulations/discount", data);
    return response.data;
  } catch (error) {
    console.error("Error en la simulación de descuento:", error);
    throw error;
  }
};
