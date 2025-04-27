// 🛡 Mock de NextResponse ANTES DE TODO para que Jest no truene
jest.mock('next/server', () => ({
    NextResponse: {
      redirect: jest.fn((url: URL) => ({ status: 307, headers: { get: () => url.toString() } })),
      next: jest.fn(() => ({ body: undefined })),
    },
  }));
  
  import { middleware } from "@/app/middleware"; // ⬅️ asegúrate que esta ruta es correcta
  import { NextRequest } from "next/server";
  
  // ✨ Mock de request personalizado
  function createMockRequest(pathname: string, cookies: Record<string, string> = {}) {
    const origin = "http://localhost:3000";
  
    return {
      nextUrl: { pathname, origin },
      url: `${origin}${pathname}`,
      cookies: {
        get: (key: string) => {
          return cookies[key] ? { value: cookies[key] } : undefined;
        },
      },
    } as unknown as NextRequest;
  }
  
  // 🎯 Test suite del middleware
  describe("Middleware de autenticación", () => {
    it("redirecciona a login si no está autenticado", () => {
      const request = createMockRequest("/dashboard");
  
      const response = middleware(request);
  
      expect(response?.status).toBe(307);
      expect(response?.headers.get("location")).toBe("http://localhost:3000/user/inicar-sesion");
    });
  
    it("permite pasar si está autenticado", () => {
      const request = createMockRequest("/dashboard", { auth: "true" });
  
      const response = middleware(request);
  
      expect(response).toEqual(expect.objectContaining({ body: undefined }));
    });
  
    it("redirige a dashboard si ya está autenticado e intenta ir al login", () => {
      const request = createMockRequest("/user/inicar-sesion", { auth: "true" });
  
      const response = middleware(request);
  
      expect(response?.status).toBe(307);
      expect(response?.headers.get("location")).toBe("http://localhost:3000/inicio");

    });
  });
  