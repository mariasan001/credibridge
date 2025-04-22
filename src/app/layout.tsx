import "./globals.css"
import { Sidebar } from "@/components/menu/Sidebar"
import 'react-loading-skeleton/dist/skeleton.css'

export const metadata = {
  title: "CrediBridge",
  description: "Sistema principal",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  )
}
