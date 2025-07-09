import React from "react"

interface Props {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
}

function UsernameInputComponent({ value, onChange, error }: Props) {
  return (
    <div className="form-group">
      <label htmlFor="username">Número de Servidor Público *</label>
      <input
        id="username"
        type="text"
        placeholder="Escribe tu número de servidor público"
        value={value}
        onChange={onChange}
        className={error ? "input-error" : ""}
      />
      {error && <p className="error">{error}</p>}
    </div>
  )
}

export const UsernameInput = React.memo(UsernameInputComponent)
