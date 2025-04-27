// src/model/recuperar-contrasena.models.ts
export interface RecuperarContrasenaRequest {
    email: string;
  }
  
  export interface RecuperarContrasenaResponse {
    success: boolean;
    message: string;
  }
  