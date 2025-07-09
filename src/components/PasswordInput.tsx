import React from "react"
import { Eye, EyeOff } from "lucide-react"

interface Props {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  show: boolean
  toggle: () => void
  error?: string
}

function PasswordInputComponent({ value, onChange, show, toggle, error }: Props) {
  return (
    <div className="form-group password-group">
      <label htmlFor="password">Contraseña *</label>
      <div className="input-wrapper">
        <input
          id="password"
          type={show ? "text" : "password"}
          placeholder="Ingresa tu contraseña"
          value={value}
          onChange={onChange}
          className={error ? "input-error" : ""}
        />
        <button type="button" className="eye-toggle" onClick={toggle}>
          {show ? <Eye size={20} /> : <EyeOff size={20} />}
        </button>
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  )
}

export const PasswordInput = React.memo(PasswordInputComponent)
