// /app/layout.tsx
import "./globals.css"
import { Sidebar } from "@/components/menu/Sidebar"

export const metadata = {
  title: "CrediBridge",
  description: "Sistema principal",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="flex min-h-screen">
        {/* Menú lateral fijo */}
        <Sidebar />

        {/* Contenido que cambia según la ruta */}
        <main className="flex-1 ">{children}</main>
      </body>
    </html>
  )
}
