import "@/app/globals.css"
import { AuthProvider } from "@/context/AuthContext"
import ClientLayout from "./ClientLayout"


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>
          <ClientLayout>{children}</ClientLayout>
        </AuthProvider>
      </body>
    </html>
  )
}
