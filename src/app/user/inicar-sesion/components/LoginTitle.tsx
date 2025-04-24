"use client"

interface Props {
  saludo: string
  emoji: string
}

export function LoginTitle({ saludo, emoji }: Props) {
  return (
    <>
      <h1 className="login-logo">
        Credi<span>Bridge</span>
      </h1>
      <p className="login-subtitle">
        {saludo} {emoji}
      </p>
      <h2 className="login-title">
        Bienvenidos a <span>CrediBridge</span><br />
        toma el control de tus finanzas
      </h2>
      <p className="login-description">
        Introduce tu información y descubre tus opciones de crédito.
      </p>
    </>
  )
}
