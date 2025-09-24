"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { loginRequest, logoutRequest, getSession } from "@/services/auth/authService";
import { LoginPayload } from "@/model/usuario.models";
import RUTAS_POR_ROL_ID from "@/constants/rutasPorRol";
import { useAuthStore } from "@/store/userStore";

export function useAuth() {
  const { user, token, loading, setAuth, clearAuth, setLoading } = useAuthStore();
  const router = useRouter();

  const redirigirLogin = () => {
    if (typeof window !== "undefined") {
      router.replace("/user/inicar-sesion");
    }
  };

  const estaEnLogin = () =>
    typeof window !== "undefined" &&
    window.location.pathname.includes("/user/inicar-sesion");

  const login = async (data: LoginPayload) => {
    const toastId = toast.loading("Iniciando sesión...");

    // Validación de captchaToken
    if (!data.captchaToken) {
      toast.error("Por favor completa el captcha.", { id: toastId });
      return;
    }

    try {
      const loginRes = await loginRequest(data);
      const session = await getSession();
      setAuth(session, loginRes.token);

      toast.success(`¡Bienvenido, ${session.name}!`, { id: toastId });

      const rutaDestino = RUTAS_POR_ROL_ID[session.roles?.[0]?.id] || "/perfil_user/inicio";
      router.push(rutaDestino);
    } catch (err) {
      console.error("❌ Login fallido", err);
      toast.error("Credenciales incorrectas o error del servidor.", { id: toastId });
      throw err; //Esto permite que useLoginForm resetee el captcha
    }
  };

  const logout = async () => {
    try {
      await logoutRequest();
      clearAuth();
      router.replace("/user/inicar-sesion");
    } catch (err) {
      console.error("❌ Error al cerrar sesión", err);
      toast.error("Error al cerrar sesión.");
    }
  };

  const checkSession = async () => {
    if (estaEnLogin()) {
      setLoading(false);
      return;
    }

    try {
      const data = await getSession();
      if (data?.userId) {
        setAuth(data, token || "");
      } else {
        clearAuth();
        redirigirLogin();
      }
    } catch (err) {
      console.error("❌ Error en checkSession:", err);
      clearAuth();
      redirigirLogin();
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    token,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
    checkSession,
  };
}
