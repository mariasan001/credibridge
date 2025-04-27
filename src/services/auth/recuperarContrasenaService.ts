// src/services/auth/recuperarContrasenaService.ts
import axios from "axios";
import { RecuperarContrasenaRequest, RecuperarContrasenaResponse } from "@/model/recuperar-contrasena.models";

export async function recuperarContrasena(data: RecuperarContrasenaRequest): Promise<RecuperarContrasenaResponse> {
  const response = await axios.post<RecuperarContrasenaResponse>(
    "http://localhost:2910/auth/forgot-password",
    data
  );
  return response.data;
}
