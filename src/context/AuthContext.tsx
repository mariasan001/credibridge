// aqui uno puede tener acceso a el incio de seccion
// entpces 
"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { loginRequest } from "@/services/auth/authService"
import { Usuario, LoginPayload } from "@/model/usuario.models"
import RUTAS_POR_ROL_ID from "@/constants/rutasPorRol"

interface AuthContextType {
  user: Usuario | null
  isAuthenticated: boolean
  loading: boolean
  login: (data: LoginPayload) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  //  Al montar, consulta si hay sesión activa con cookie
useEffect(() => {
  const checkSession = async () => {
    try {
      const res = await fetch("http://localhost:2910/auth/me", {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        const text = await res.text();
        if (text) {
          const parsed = JSON.parse(text);
          const extractedUser = parsed.user ?? parsed;
          setUser(extractedUser);
        } else {
          setUser(null);
        }
      } else {
        // Token vencido o inválido
        setUser(null);
        router.push("/user/inicar-sesion"); // redirige
      }
    } catch (err) {
      console.error("Sesión no activa", err);
      setUser(null);
      router.push("/user/inicar-sesion"); // redirige también si hubo error
    } finally {
      setLoading(false);
    }
  };

  checkSession();
}, []);



const login = async (data: LoginPayload) => {
  try {
    const userData = await loginRequest(data);
    const extractedUser = userData.user ?? userData;
    setUser(extractedUser);

    const rolPrincipal = extractedUser.roles[0]; // asumimos que el primer rol es el principal
    const rutaDestino = RUTAS_POR_ROL_ID[rolPrincipal.id] || "/perfil_user/inicio";

    router.push(rutaDestino);
  } catch (err) {
    console.error("Login fallido", err);
  }
};



const logout = async () => {
  try {
    await fetch("http://localhost:2910/auth/logout", {
      method: "POST",
      credentials: "include",
    });
  } catch (err) {
    console.error("Error al cerrar sesión", err);
  } finally {
    // 1. Redirige antes de limpiar
    router.push("/user/inicar-sesion");
    
    // 2. Dale un tiempo corto y luego limpia
    setTimeout(() => {
      setUser(null);
    }, 100); // da tiempo a que la navegación se complete visualmente
  }
}


  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}


export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider")
  return context
}
