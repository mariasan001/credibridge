"use client";

import React, {
  useState,
  useMemo,
  useCallback,
  FormEvent,
  ChangeEvent,
} from "react";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

// Ícono memoizado
const TogglePasswordIcon = React.memo(({ visible }: { visible: boolean }) => {
  return visible ? <Eye size={20} /> : <EyeOff size={20} />;
});

// Validación extraída
const validarCampos = (username: string, password: string) => {
  const errors: { username?: string; password?: string } = {};
  if (!username) errors.username = "Este campo es obligatorio";
  if (!password) errors.password = "Este campo es obligatorio";
  return errors;
};

function LoginFormComponent() {
  const { login, loading } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const [submitError, setSubmitError] = useState("");

  const isDisabled = useMemo(
    () => loading || !username || !password,
    [loading, username, password]
  );

  const togglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleUsernameChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setUsername(e.currentTarget.value);
    },
    []
  );

  const handlePasswordChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPassword(e.currentTarget.value);
    },
    []
  );

  const handleLogin = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setSubmitError("");

      const newErrors = validarCampos(username, password);
      setErrors(newErrors);
      if (Object.keys(newErrors).length > 0) return;

      try {
        await login({ username, password });
        // router.push("/dashboard");
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const message =
            err.response?.data?.message || "Número de servidor o contraseña incorrectos";
          setSubmitError(message);
        } else {
          setSubmitError("Ocurrió un error inesperado.");
        }
      }
    },
    [login, username, password]
  );

  return (
    <form className="login-form" onSubmit={handleLogin} noValidate>
      <div className="form-group">
        <label htmlFor="username">Número de Servidor Público *</label>
        <input
          id="username"
          type="text"
          placeholder="Escribe tu número de servidor público"
          value={username}
          onChange={handleUsernameChange}
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
            onChange={handlePasswordChange}
            className={errors.password ? "input-error" : ""}
          />
          <button
            type="button"
            className="eye-toggle"
            onClick={togglePassword}
            aria-label="Mostrar u ocultar contraseña"
          >
            <TogglePasswordIcon visible={showPassword} />
          </button>
        </div>
        {errors.password && <p className="error">{errors.password}</p>}
      </div>

      {submitError && <p className="error">{submitError}</p>}

      <div className="forgot-link">
        <Link href="/user/recuperacion">¿Olvidaste tu contraseña?</Link>
      </div>

      <button type="submit" className="login-btn" disabled={isDisabled}>
        {loading ? "Ingresando..." : "Ingresar al sistema"}
      </button>

      <a href="#" className="aviso">
        Aviso de privacidad
      </a>
    </form>
  );
}

export const LoginForm = React.memo(LoginFormComponent);
