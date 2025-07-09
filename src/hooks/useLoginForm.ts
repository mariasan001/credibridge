import { useState, useCallback, FormEvent, ChangeEvent } from "react"
import { useAuth } from "@/hooks/useAuth"
import axios from "axios"

export function useLoginForm() {
  const { login, loading } = useAuth()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({})
  const [submitError, setSubmitError] = useState("")

  const togglePassword = useCallback(() => setShowPassword(prev => !prev), [])

  const handleUsernameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }, [])

  const handlePasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }, [])

  const handleLogin = useCallback(async (e: FormEvent) => {
    e.preventDefault()
    setSubmitError("")

    const newErrors: typeof errors = {}
    if (!username) newErrors.username = "Este campo es obligatorio"
    if (!password) newErrors.password = "Este campo es obligatorio"
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    try {
      await login({ username, password })
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message || "Número de servidor o contraseña incorrectos"
        setSubmitError(message)
      } else {
        setSubmitError("Ocurrió un error inesperado.")
      }
    }
  }, [login, username, password])

  return {
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
  }
}
