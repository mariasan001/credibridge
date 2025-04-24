import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"

import { AuthProvider } from "@/context/AuthContext"
import { LoginForm } from "@/components/LoginForm"

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() })
}))

describe("LoginForm", () => {
  it("muestra errores si los campos están vacíos", () => {
    render(
      <AuthProvider>
        <LoginForm />
      </AuthProvider>
    )

    const boton = screen.getByRole("button", { name: /ingresar/i })
    fireEvent.click(boton)

    expect(screen.getAllByText("Este campo es obligatorio").length).toBe(2)
  })

  it("permite escribir en los inputs", () => {
    render(
      <AuthProvider>
        <LoginForm />
      </AuthProvider>
    )

    const inputServidor = screen.getByPlaceholderText("Escribe tu número de servidor público")
    const inputPassword = screen.getByPlaceholderText("Ingresa tu contraseña")

    fireEvent.change(inputServidor, { target: { value: "SP123456" } })
    fireEvent.change(inputPassword, { target: { value: "1234" } })

    expect(inputServidor).toHaveValue("SP123456")
    expect(inputPassword).toHaveValue("1234")
  })
})
