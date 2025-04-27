import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // ✅ Evalúa si el usuario tiene la cookie 'auth=true'
  const isAuthenticated = request.cookies.get("auth")?.value === "true"

  // ✅ Evalúa si está intentando acceder al login
  const isLoginPage = pathname.startsWith("/user/inicar-sesion")

  // 🔒 Si no está autenticado y no está entrando al login → redirige a login
  if (!isAuthenticated && !isLoginPage) {
    return NextResponse.redirect(new URL("/user/inicar-sesion", request.url))
  }

  // 🚫 Si ya está autenticado y trata de entrar al login o al root "/", mándalo al dashboard
  if (isAuthenticated && (isLoginPage || pathname === "/")) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // 🟢 Permitir el paso a cualquier otra ruta válida
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
