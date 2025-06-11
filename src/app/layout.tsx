import "@/app/globals.css";
import { AuthProvider } from "@/context/AuthContext";
import ClientLayout from "./ClientLayout";
import { Toaster } from "react-hot-toast"; // ✅ Importar Toaster
import { ToasterConfig } from "@/components/ToasterConfig";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>
          <ClientLayout>{children}</ClientLayout>
           <ToasterConfig />
        </AuthProvider>
      </body>
    </html>
  );
}
