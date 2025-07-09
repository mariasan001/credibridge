"use client";


import { useAuth } from "@/hooks/useAuth";
import "./SaludoServidor.css";

export const SaludoServidor = () => {
  const { user } = useAuth();

  if (!user) return null;

  // 👉 Separar y formatear nombre completo
  const [primerNombre = "", primerApellido = ""] = user.name
    .trim()
    .split(" ")
    .slice(0, 2);

  const capitalizar = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const nombreFormateado = `${capitalizar(primerNombre)} ${capitalizar(primerApellido)}`;

  return (
    <div className="saludo-servidor">
      <h1 className="saludo-titulo">
        Bienvenido {nombreFormateado} <span className="emoji">👋</span>
      </h1>
      <p className="saludo-descripcion">
        Gestiona tu cuenta de manera rápida y sencilla.
      </p>
    </div>
  );
};
