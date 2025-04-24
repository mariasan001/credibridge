import { useEffect, useState } from "react"

export function useSaludo() {
  const [saludo, setSaludo] = useState("")
  const [emoji, setEmoji] = useState("")
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const hora = new Date().getHours()
    if (hora >= 18) {
      setSaludo("Buenas noches")
      setEmoji("🌙")
      setDarkMode(true)
    } else {
      setSaludo("Hola buenos días")
      setEmoji("☀️")
      setDarkMode(false)
    }
  }, [])

  return { saludo, emoji, darkMode }
}
