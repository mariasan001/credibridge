"use client";
import { useLoginForm } from "@/hooks/useLoginForm";
import Link from "next/link";
import { UsernameInput } from "./UsernameInput";
import { PasswordInput } from "./PasswordInput";
import { SubmitButton } from "./SubmitButton";
import ReCAPTCHA from "react-google-recaptcha";

export function LoginForm() {
  const {
    username, password, showPassword, errors, submitError, loading,
    togglePassword, handleUsernameChange, handlePasswordChange,
    handleLogin, recaptchaRef, SITE_KEY
  } = useLoginForm();

  return (
    <form className="login-form" onSubmit={(e)=>{e.preventDefault(); handleLogin();}} noValidate>
      <UsernameInput value={username} onChange={handleUsernameChange} error={errors.username} />
      <PasswordInput value={password} onChange={handlePasswordChange} show={showPassword} toggle={togglePassword} error={errors.password} />

      {/* Solo renderiza captcha si hay SITE_KEY */}
      {SITE_KEY && <ReCAPTCHA ref={recaptchaRef} sitekey={SITE_KEY} size="invisible" />}

      {submitError && <p className="error">{submitError}</p>}

      <div className="forgot-link">
        <Link href="/user/recuperacion">¿Olvidaste tu contraseña?</Link>
      </div>

      <SubmitButton loading={loading} disabled={!username || !password || loading} />
      <a href="/legal/aviso-privacidad" className="aviso">Aviso de privacidad</a>
    </form>
  );
}
