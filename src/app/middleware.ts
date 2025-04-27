// /middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get("auth")?.value === "true"
  const pathname = request.nextUrl.pathname

  const isLoginPage = pathname.startsWith("/user/inicar-sesion")

  // 🔒 Si no está autenticado y no está en el login, lo mandamos al login
  if (!isAuthenticated && !isLoginPage) {
    return NextResponse.redirect(new URL("/user/inicar-sesion", request.url))
  }

  // 🚫 Si ya está autenticado y trata de entrar al login o al root, lo mandamos al dashboard
  if (isAuthenticated && (isLoginPage || pathname === "/")) {
    return NextResponse.redirect(new URL("/inicio", request.url))
  }

  // ✅ Si todo está bien, que pase normal
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Aplica el middleware a todas las rutas excepto las públicas
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
