import React from "react"

interface Props {
  loading: boolean
  disabled: boolean
}

function SubmitButtonComponent({ loading, disabled }: Props) {
  return (
    <button type="submit" className="login-btn" disabled={disabled}>
      {loading ? "Ingresando..." : "Ingresar al sistema"}
    </button>
  )
}

export const SubmitButton = React.memo(SubmitButtonComponent)
