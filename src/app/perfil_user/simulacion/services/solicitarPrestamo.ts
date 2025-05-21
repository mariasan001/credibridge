// aqui se encotraran los tipos de simulacion de prestamo que exisnten
// actumente exisnte 2 (descuento quincenal o o cantidad total)

import { api } from "@/lib/apis";
import { SimType } from "../models/tipoSimulacionModel";

export const getSimTypes = async (): Promise<SimType[]> =>{
    try {
        const response =await api.get("/api/sim-types");
        return response.data; // migramos el modelo de tipo de simlacion 
    } catch (error){
        console.error("Error al obtener tipos de simulacion:", error);
        throw error;
    }
}