import { api, assertNotNull } from "@/lib/apis";
import type { LoginPayload, Usuario } from "@/model/usuario.models";

export async function loginRequest(payload: LoginPayload) {
  const { data } = await api.post("/auth/login", payload);
  assertNotNull(data, "Respuesta vacía de /auth/login");
  return { token: data.token as string | undefined };
}

export async function getSession(): Promise<Usuario> {
  const { data } = await api.get("/auth/me");
  assertNotNull(data, "Respuesta vacía de /auth/me");
  return data as Usuario;
}

export async function logoutRequest() {
  await api.post("/auth/logout");
}
