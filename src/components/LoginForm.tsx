"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function LoginForm() {
  const { login, loading } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const [submitError, setSubmitError] = useState("");

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!username) newErrors.username = "Este campo es obligatorio";
    if (!password) newErrors.password = "Este campo es obligatorio";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (!validate()) return;

    try {
      await login({ username, password });
    } catch (err: any) {
      const message =
        err?.response?.data?.message || "Número de servidor o contraseña incorrectos";
      setSubmitError(message);
    }
  };

  return (
    <form className="login-form" onSubmit={handleLogin} noValidate>
      <div className="form-group">
        <label htmlFor="username">Número de Servidor Público *</label>
        <input
          id="username"
          type="text"
          placeholder="Escribe tu número de servidor público"
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
          className={errors.username ? "input-error" : ""}
          autoFocus
        />
        {errors.username && <p className="error">{errors.username}</p>}
      </div>

      <div className="form-group password-group">
        <label htmlFor="password">Contraseña *</label>
        <div className="input-wrapper">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            className={errors.password ? "input-error" : ""}
          />
          <button
            type="button"
            className="eye-toggle"
            onClick={() => setShowPassword(!showPassword)}
            aria-label="Mostrar u ocultar contraseña"
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>
        {errors.password && <p className="error">{errors.password}</p>}
      </div>

      {submitError && <p className="error">{submitError}</p>}

      <div className="forgot-link">
        <Link href="/user/recuperacion">¿Olvidaste tu contraseña?</Link>
      </div>

      <button
        type="submit"
        className="login-btn"
        disabled={loading || !username || !password}
      >
        {loading ? "Ingresando..." : "Ingresar al sistema"}
      </button>

      <a href="#" className="aviso">
        Aviso de privacidad
      </a>
    </form>
  );
}
