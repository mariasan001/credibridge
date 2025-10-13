// services/auth/authService.ts
import { api } from "@/lib/apis";
import type { AxiosResponse } from "axios";
import type { LoginPayload, Usuario } from "@/model/usuario.models";

type LoginResponse = { token: string; user: Usuario };
type LogoutResponse = { ok: boolean; message?: string };

function ensureData<T>(res: AxiosResponse<T>, ctx: string): T {
  if (res?.data == null) {
    throw new Error(`Respuesta vacía (${ctx}). Status=${res.status} URL=${res.config?.url}`);
  }
  return res.data;
}

export async function loginRequest(payload: LoginPayload): Promise<LoginResponse> {
  const res = await api.post<LoginResponse>("/auth/login", payload);
  return ensureData(res, "login");
}

export async function logoutRequest(): Promise<LogoutResponse> {
  const res = await api.post<LogoutResponse>("/auth/logout");
  return ensureData(res, "logout");
}

export async function getSession(): Promise<Usuario> {
  const res = await api.get<Usuario>("/auth/me");
  return ensureData(res, "getSession");
}
