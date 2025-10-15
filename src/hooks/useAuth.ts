"use client";
import { useRouter } from "next/navigation";
import { loginRequest, logoutRequest, getSession } from "@/services/auth/authService";
import type { LoginPayload, Usuario } from "@/model/usuario.models";
import { useAuthStore } from "@/store/userStore";
import RUTAS_POR_ROL_ID from "@/constants/rutasPorRol";

const LOGIN_PATH = "/user/inicar-sesion";

export function useAuth() {
  const { user, token, loading, setAuth, clearAuth, setLoading } = useAuthStore();
  const router = useRouter();

  const login = async (payload: LoginPayload) => {
    // Si el backend no exige captcha, puede venir vacío
    const { token: sesToken } = await loginRequest(payload);
    const session: Usuario = await getSession();
    if (!session?.userId) throw new Error("Sesión inválida.");

    setAuth(session, sesToken ?? "");

    const firstRoleId = session.roles?.[0]?.id;
    const rutaDestino =
      (firstRoleId && RUTAS_POR_ROL_ID[firstRoleId as keyof typeof RUTAS_POR_ROL_ID]) ||
      "/perfil_user/inicio";
    router.push(rutaDestino);
  };

  const logout = async () => {
    try { await logoutRequest(); } finally { clearAuth(); router.replace(LOGIN_PATH); }
  };

  const checkSession = async () => {
    setLoading(true);
    try {
      const session = await getSession();
      if (session?.userId) setAuth(session, token || "");
      else { clearAuth(); router.replace(LOGIN_PATH); }
    } catch {
      clearAuth(); router.replace(LOGIN_PATH);
    } finally { setLoading(false); }
  };

  return { user, token, loading, isAuthenticated: !!user, login, logout, checkSession };
}
