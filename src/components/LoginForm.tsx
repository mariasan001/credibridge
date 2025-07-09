"use client"
import { useLoginForm } from "@/hooks/useLoginForm"
import Link from "next/link"
import { UsernameInput } from "./UsernameInput"
import { PasswordInput } from "./PasswordInput"
import { SubmitButton } from "./SubmitButton"

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
  } = useLoginForm()

  return (
    <form className="login-form" onSubmit={handleLogin} noValidate>
      <UsernameInput value={username} onChange={handleUsernameChange} error={errors.username} />
      <PasswordInput
        value={password}
        onChange={handlePasswordChange}
        show={showPassword}
        toggle={togglePassword}
        error={errors.password}
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
