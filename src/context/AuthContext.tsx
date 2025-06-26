"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast"; // 👈 AÑADIDO
import { loginRequest } from "@/services/auth/authService";
import { Usuario, LoginPayload } from "@/model/usuario.models";
import RUTAS_POR_ROL_ID from "@/constants/rutasPorRol";
import { api } from "@/lib/apis";

interface AuthContextType {
  user: Usuario | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (data: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const redirigirLogin = () => router.replace("/user/inicar-sesion");

  // 🔁 Validar sesión activa al montar
  useEffect(() => {
    const checkSession = async () => {
      console.time("⏱ Validación de sesión");

      try {
        const res = await api.get("/auth/me");

        if (res.status === 200 && res.data) {
          const extractedUser = res.data.user ?? res.data;
          setUser(extractedUser);
        } else {
          setUser(null);
          redirigirLogin();
        }
      } catch (err) {
        console.error("❌ Error al verificar sesión:", err);
        setUser(null);
        redirigirLogin();
      } finally {
        console.timeEnd("⏱ Validación de sesión");
        setLoading(false);
      }
    };

    checkSession();
  }, [router]);

  // 🔐 Login
  const login = async (data: LoginPayload) => {
    console.time("🔐 Tiempo total de login");
    const toastId = toast.loading("Iniciando sesión..."); // 🔄 Mensaje de espera

    try {
      const userData = await loginRequest(data);
      const extractedUser = userData.user ?? userData;
      setUser(extractedUser);

      toast.success(`¡Bienvenido, ${extractedUser.name || "usuario"}!`, {
        id: toastId,
      });

      const rolPrincipal = extractedUser.roles[0];
      const rutaDestino =
        RUTAS_POR_ROL_ID[rolPrincipal.id] || "/perfil_user/inicio";
      router.push(rutaDestino);
    } catch (err) {
      console.error("Login fallido", err);

      toast.error("Credenciales incorrectas o error del servidor.", {
        id: toastId,
      });
    } finally {
      console.timeEnd("🔐 Tiempo total de login");
    }
  };

  // 🔓 Logout
  const logout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
      router.replace("/user/inicar-sesion");
    } catch (err) {
      console.error("Error al cerrar sesión", err);
      toast.error("Error al cerrar sesión.");
    }
  };

  const contextValue = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      loading,
      login,
      logout,
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
}
