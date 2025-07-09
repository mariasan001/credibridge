import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value
  const pathname = request.nextUrl.pathname

  const isLoginPage = pathname.startsWith("/user/inicar-sesion")

  // Si NO hay token y no estás en login → redirige a login
  if (!token && !isLoginPage) {
    return NextResponse.redirect(new URL("/user/inicar-sesion", request.url))
  }

  // Si tienes token y estás en login o raíz → redirige a /inicio
  if (token && (isLoginPage || pathname === "/")) {
    return NextResponse.redirect(new URL("/inicio", request.url))
  }

  // Todo bien, continúa la navegación
  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
