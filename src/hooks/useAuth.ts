export function useAuth() {
    // Simula autenticación (puedes cambiar el rol para probar)
    const user = {
      nombre: "Ana Base de Datos",
      rol: 2 // 0: admin, 1: base de datos, 3: institución
    }
  
    return { user }
  }
  