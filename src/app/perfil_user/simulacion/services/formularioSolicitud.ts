// esta es el uso del servico pra la creacion el formulario 
// t la respuesta de ello 

import { api } from "@/lib/apis";
import { SimulationRequest, SimulationResult } from "../models/formularioSolicitud";

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
 