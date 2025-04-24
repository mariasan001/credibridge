import { renderHook } from "@testing-library/react"
import { useSaludo } from "@/hooks/useSaludo"

// 🔧 Simula hora del sistema
const mockDate = (hour: number) => {
  const fakeDate = new Date()
  fakeDate.setHours(hour)
  jest
    .spyOn(global, "Date")
    .mockImplementation(() => fakeDate as unknown as string & Date)
}

describe("useSaludo", () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it("devuelve saludo de día si es antes de las 6PM", () => {
    mockDate(10) // 10 AM

    const { result } = renderHook(() => useSaludo())
    expect(result.current.saludo).toBe("Hola buenos días")
    expect(result.current.emoji).toBe("☀️")
    expect(result.current.darkMode).toBe(false)
  })

  it("devuelve saludo de noche si es después de las 6PM", () => {
    mockDate(19) // 7 PM

    const { result } = renderHook(() => useSaludo())
    expect(result.current.saludo).toBe("Buenas noches")
    expect(result.current.emoji).toBe("🌙")
    expect(result.current.darkMode).toBe(true)
  })
})
