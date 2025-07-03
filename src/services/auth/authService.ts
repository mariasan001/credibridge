import { api } from "@/lib/apis";
import { LoginPayload } from "@/model/usuario.models";

// Login: POST /auth/login
export const loginRequest = async (data: LoginPayload) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

// Logout: POST /auth/logout
export const logoutRequest = async () => {
  return await api.post("/auth/logout");
};

// Obtener sesión actual: GET /auth/me
export const getSession = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};
