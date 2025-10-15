"use client";
import { useState, useCallback, ChangeEvent, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import ReCAPTCHA from "react-google-recaptcha";

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

export function useLoginForm() {
  const { login, loading } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const [submitError, setSubmitError] = useState("");

  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const togglePassword = useCallback(() => setShowPassword(p => !p), []);
  const handleUsernameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value), []);
  const handlePasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value), []);

  const handleLogin = useCallback(
    async () => {
      setSubmitError("");
      const nextErrors: typeof errors = {};
      if (!username) nextErrors.username = "Este campo es obligatorio";
      if (!password) nextErrors.password = "Este campo es obligatorio";
      setErrors(nextErrors);
      if (Object.keys(nextErrors).length > 0) return;

      let captchaToken: string | null = null;
      try {
        if (SITE_KEY) {
          captchaToken = await recaptchaRef.current?.executeAsync() ?? null;
          recaptchaRef.current?.reset();
          if (!captchaToken) throw new Error("No se pudo validar el captcha.");
        }
        await login({ username, password, captchaToken });
      } catch (e: any) {
        setSubmitError(e?.message ?? "No se pudo iniciar sesión.");
      }
    },
    [username, password, login]
  );

  return {
    username, password, showPassword, errors, submitError, loading,
    togglePassword, handleUsernameChange, handlePasswordChange,
    handleLogin, recaptchaRef, SITE_KEY, setSubmitError
  };
}
