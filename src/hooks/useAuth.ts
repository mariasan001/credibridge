export function useAuth() {
    // Simula autenticación (puedes cambiar el rol para probar)
    const user = {
      nombre: "Ana Base de Datos",
      rol: 0// 0: admin, 1: base de datos, 2: institución
    }
  
    return { user }
  }
  