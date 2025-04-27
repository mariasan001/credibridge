import { renderHook, act } from "@testing-library/react"
import { AuthProvider, useAuth } from "@/context/AuthContext"
import { loginRequest } from "@/services/auth/authService"

// 🛡️ MOCK de Next.js Router
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
    pathname: '/',
  }),
}))

// 🛡️ MOCK de loginRequest
jest.mock("@/services/auth/authService")

describe("AuthContext", () => {
  it("debería iniciar sesión correctamente", async () => {
    const mockToken = "fake-token-123"
    const mockRoles = [{ id: 1, description: "ADMIN" }]

    ;(loginRequest as jest.Mock).mockResolvedValue({
      token: mockToken,
      roles: mockRoles,
    })

    const wrapper = ({ children }: any) => <AuthProvider>{children}</AuthProvider>

    const { result } = renderHook(() => useAuth(), { wrapper })

    await act(async () => {
      await result.current.login("usuarioPrueba", "contrasenaPrueba")
    })

    expect(result.current.isAuthenticated).toBe(true)
    expect(result.current.user?.username).toBe("usuarioPrueba")
    expect(result.current.user?.roles.length).toBe(1)
    expect(result.current.token).toBe(mockToken)
  })

  it("debería cerrar sesión correctamente", async () => {
    const mockToken = "fake-token-123"
    const mockRoles = [{ id: 1, description: "ADMIN" }]

    ;(loginRequest as jest.Mock).mockResolvedValue({
      token: mockToken,
      roles: mockRoles,
    })

    const wrapper = ({ children }: any) => <AuthProvider>{children}</AuthProvider>

    const { result } = renderHook(() => useAuth(), { wrapper })

    // 👉 Simulamos login primero
    await act(async () => {
      await result.current.login("usuarioPrueba", "contrasenaPrueba")
    })

    expect(result.current.isAuthenticated).toBe(true)

    // 👉 Ahora logout
    act(() => {
      result.current.logout()
    })

    expect(result.current.isAuthenticated).toBe(false)
    expect(result.current.user).toBe(null)
    expect(result.current.token).toBe(null)
  })
})
