"use client"

import { useLoginForm } from "@/hooks/useLoginForm"
import Link from "next/link"
import { UsernameInput } from "./UsernameInput"
import { PasswordInput } from "./PasswordInput"
import { SubmitButton } from "./SubmitButton"
import ReCAPTCHA from "react-google-recaptcha"

export function LoginForm() {
  const {
    username,
    password,
    showPassword,
    errors,
    submitError,
    loading,
    togglePassword,
    handleUsernameChange,
    handlePasswordChange,
    handleLogin,
    recaptchaRef,
  } = useLoginForm()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const token = await recaptchaRef.current?.executeAsync()
      await handleLogin(token ?? "")
    } catch (error) {
      console.error("❌ Error al ejecutar captcha:", error)
    } finally {
      recaptchaRef.current?.reset()
    }
  }

  return (
    <form className="login-form" onSubmit={handleSubmit} noValidate>
      <UsernameInput value={username} onChange={handleUsernameChange} error={errors.username} />
      <PasswordInput
        value={password}
        onChange={handlePasswordChange}
        show={showPassword}
        toggle={togglePassword}
        error={errors.password}
      />

      {/* Captcha invisible */}
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey="6LeF534rAAAAAFah7J3Q5AismTC08flfeH0Uiw8f"
        size="invisible"
      />

      {submitError && <p className="error">{submitError}</p>}

      <div className="forgot-link">
        <Link href="/user/recuperacion">¿Olvidaste tu contraseña?</Link>
      </div>

      <SubmitButton loading={loading} disabled={!username || !password || loading} />

      <a href="#" className="aviso">Aviso de privacidad</a>
    </form>
  )
}
