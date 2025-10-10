// app/layout.tsx
import "@/app/globals.css";
import { Providers } from "./Providers";
import ClientLayout from "./ClientLayout";
import RUMInit from "./RUMInit";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <title>CrediBridge</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Providers>
          <RUMInit /> {/* ⬅️ corre Web Vitals, observers, contexto */}
          <ClientLayout>{children}</ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
