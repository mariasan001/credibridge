import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value
  const pathname = request.nextUrl.pathname

  const isLoginPage = pathname.startsWith("/user/inicar-sesion")

  if (!token && !isLoginPage) {
    return NextResponse.redirect(new URL("/user/inicar-sesion", request.url))
  }

  // Si SÍ hay token y está intentando entrar a login o root, redirige a dashboard
  if (token && (isLoginPage || pathname === "/")) {
    return NextResponse.redirect(new URL("/inicio", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Aplica a todas las rutas excepto las públicas
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
