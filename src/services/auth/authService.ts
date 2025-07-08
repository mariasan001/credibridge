import { api } from "@/lib/apis";
import { LoginPayload } from "@/model/usuario.models";

// LOGIN
export const loginRequest = async (data: LoginPayload) => {
  console.log("🟨 Enviando loginRequest:", data);
  const res = await api.post("/auth/login", data);
  console.log("✅ Respuesta login:", res.data);
  return res.data;
};

// LOGOUT
export const logoutRequest = async () => {
  console.log("🔴 Enviando logoutRequest");
  const res = await api.post("/auth/logout");
  console.log("✅ Logout response:", res.data);
  return res.data;
};

// OBTENER SESIÓN
export const getSession = async () => {
  console.log("🔵 Ejecutando getSession...");
  const res = await api.get("/auth/me");
  console.log("✅ Respuesta getSession:", res.data);
  return res.data;
};
