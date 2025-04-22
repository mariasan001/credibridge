"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Intentando iniciar sesión con:", { email, password });
    // Aquí llamas a tu API o servicio
  };

  return (
    <main className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2 className="login-title">Iniciar sesión</h2>

        <label className="login-label">
          Correo electrónico
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            required
          />
        </label>

        <label className="login-label">
          Contraseña
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />
        </label>

        <button type="submit" className="login-button">
          Ingresar
        </button>
      </form>
    </main>
  );
}
