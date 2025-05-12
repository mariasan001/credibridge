export function calcularEstado(start: string, end: string): "Activo" | "Inactivo" | "Próximo" {
    const ahora = new Date()
    const ini = new Date(start)
    const fin = new Date(end)
  
    if (ahora < ini) return "Próximo"
    if (ahora > fin) return "Inactivo"
    return "Activo"
  }
  