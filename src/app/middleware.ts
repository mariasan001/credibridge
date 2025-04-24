import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const isAuthenticated =
    request.cookies.get("auth") || request.headers.get("cookie")?.includes("auth=true")

  const pathname = request.nextUrl.pathname

  const isLoginPage = pathname.startsWith('/user/inicar-sesion')

  //  Redirigir a login si NO está autenticado y está intentando entrar a otra página
  if (!isAuthenticated && !isLoginPage) {
    return NextResponse.redirect(new URL('/user/inicar-sesion', request.url))
  }

  //  Si YA está autenticado y trata de entrar al login, mándalo al dashboard
  if (isAuthenticated && isLoginPage) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
