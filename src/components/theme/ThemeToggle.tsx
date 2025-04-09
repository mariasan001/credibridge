"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

export const ThemeToggleButton = ({ isCollapsed }: { isCollapsed: boolean }) => {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode")
      setDarkMode(true)
    }
  }, [])

  const toggleTheme = () => {
    const isDark = !darkMode
    setDarkMode(isDark)
    localStorage.setItem("theme", isDark ? "dark" : "light")
    document.body.classList.toggle("dark-mode", isDark)
  }

  return (
    <div
      className="sidebar__link"
      onClick={toggleTheme}
      title={darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      style={{ cursor: "pointer" }}
    >
      {darkMode ? <Sun size={20} className="sidebar__icon" /> : <Moon size={20} className="sidebar__icon" />}
      {!isCollapsed && (
        <span>{darkMode ? "Modo Claro" : "Modo Oscuro"}</span>
      )}
    </div>
  )
}
