import { render, screen, fireEvent } from "@testing-library/react"
import { NuevaContrasenaForm } from "@/app/user/nuevacontrasena/components/NuevaContrasenaForm"
import '@testing-library/jest-dom' // ✅ MUY IMPORTANTE

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

describe("NuevaContrasenaForm", () => {
  it("muestra mensaje si los campos están vacíos", async () => {
    render(<NuevaContrasenaForm />)

    const submitButton = screen.getByRole("button", { name: /Guardar Nueva Contraseña/i })
    fireEvent.click(submitButton)

    expect(await screen.findByText(/Todos los campos son obligatorios/i)).toBeInTheDocument()
  })

  it("desactiva el botón mientras está cargando", async () => {
    render(<NuevaContrasenaForm />)

    const nuevaInput = screen.getByPlaceholderText(/escribe nueva contraseña/i)
    const confirmarInput = screen.getByPlaceholderText(/escribe nuevamente/i)
    const submitButton = screen.getByRole("button", { name: /Guardar Nueva Contraseña/i })

    fireEvent.change(nuevaInput, { target: { value: "NuevaContra123!" } })
    fireEvent.change(confirmarInput, { target: { value: "NuevaContra123!" } })

    localStorage.setItem("token-reset", "123456") // Simulamos token

    fireEvent.click(submitButton)

    await screen.findByRole("button", { name: /Guardando/i })
    expect(submitButton).toBeDisabled()
  })
})
