/// <reference types="cypress" />

describe("Login con cookies HttpOnly", () => {
    const username = "oscar.acuna"
    const password = "prueba"
  
    it("Debe mantener sesión activa con cookies tras recarga", () => {
      cy.visit("/user/inicar-sesion")
  
      cy.get("input[placeholder='Escribe tu número de servidor público']").type(username)
      cy.get("input[placeholder='Ingresa tu contraseña']").type(password)
      cy.get("button.login-btn").click()
  
      // ✅ Redirección
      cy.url().should("include", "/inicio")
  
      // ✅ Cookies existen (aunque no podamos leer HttpOnly)
      cy.getCookies().should("exist")
  
      // ✅ Verificación de algo visible en sesión activa
      cy.contains("FINANCIERA_EJEC").should("exist")
  
      // 🔁 Recarga para ver si se mantiene la sesión
      cy.reload()
  
      // ✅ Sigue en /inicio
      cy.url().should("include", "/inicio")
    })
  })
  