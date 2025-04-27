import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import { RecuperarContrasenaForm } from "@/app/user/recuperacion/components/RecuperarContrasenaForm"

// Mockeamos el router de Next.js para evitar errores en pruebas
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

// Mockeamos fetch para simular la API
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })
) as jest.Mock

describe("RecuperarContrasenaForm", () => {
  
  it("renderiza correctamente el formulario", () => {
    render(<RecuperarContrasenaForm />)

    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /enviar token/i })).toBeInTheDocument()
  })

  it("muestra error si se envía vacío", async () => {
    render(<RecuperarContrasenaForm />)

    fireEvent.click(screen.getByRole("button", { name: /enviar token/i }))

    expect(await screen.findByText(/este campo es obligatorio/i)).toBeInTheDocument()
  })

  it("envía correctamente y muestra mensaje de éxito", async () => {
    render(<RecuperarContrasenaForm />)

    fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
      target: { value: "test@example.com" },
    })

    fireEvent.click(screen.getByRole("button", { name: /enviar token/i }))

    expect(await screen.findByText(/token enviado/i)).toBeInTheDocument()
  })
})
