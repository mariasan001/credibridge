"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { loginRequest, logoutRequest, getSession } from "@/services/auth/authService";
import type { LoginPayload, Usuario } from "@/model/usuario.models";
import RUTAS_POR_ROL_ID from "@/constants/rutasPorRol";
import { useAuthStore } from "@/store/userStore";

const LOGIN_PATH = "/user/iniciar-sesion";

export function useAuth() {
  const { user, token, loading, setAuth, clearAuth, setLoading } = useAuthStore();
  const router = useRouter();

  const redirigirLogin = () => {
    if (typeof window !== "undefined") router.replace(LOGIN_PATH);
  };
  const estaEnLogin = () =>
    typeof window !== "undefined" && window.location.pathname.includes(LOGIN_PATH);

  const login = async (payload: LoginPayload) => {
    const toastId = toast.loading("Iniciando sesión...");

    if (!payload.captchaToken) {
      toast.error("Por favor completa el captcha.", { id: toastId });
      return;
    }

    try {
      // ← token y (si tu API lo manda) user
      const { token: sesToken } = await loginRequest(payload);

      // ← siempre pedimos la sesión normalizada a Usuario
      const session: Usuario = await getSession();

      if (!session?.userId) {
        throw new Error("Sesión inválida: el servidor no devolvió userId.");
      }

      setAuth(session, sesToken ?? "");

      const firstRoleId = session.roles?.[0]?.id;
      const rutaDestino =
        (firstRoleId && RUTAS_POR_ROL_ID[firstRoleId as keyof typeof RUTAS_POR_ROL_ID]) ||
        "/perfil_user/inicio";

      toast.success(`¡Bienvenido, ${session.name ?? "usuario"}!`, { id: toastId });
      router.push(rutaDestino);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Credenciales incorrectas o error del servidor.";
      console.error("❌ Login fallido:", e);
      toast.error(msg, { id: toastId });
      throw (e instanceof Error ? e : new Error(String(e))); // para resetear captcha
    }
  };

  const logout = async () => {
    try {
      await logoutRequest();
    } catch (e) {
      console.error("❌ Error al cerrar sesión", e);
      toast.error("Error al cerrar sesión.");
    } finally {
      clearAuth();
      router.replace(LOGIN_PATH);
    }
  };

  const checkSession = async () => {
    if (estaEnLogin()) {
      setLoading(false);
      return;
    }
    try {
      const session: Usuario = await getSession();
      if (session?.userId) {
        setAuth(session, token || "");
      } else {
        clearAuth();
        redirigirLogin();
      }
    } catch (e) {
      console.error("❌ Error en checkSession:", e);
      clearAuth();
      redirigirLogin();
    } finally {
      setLoading(false);
    }
  };

  return { user, token, loading, isAuthenticated: !!user, login, logout, checkSession };
}
