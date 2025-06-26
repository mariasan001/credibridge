// ./utils/fechasUtils.ts

export function getFechasPorFiltroTiempo(tiempo: string) {
  const hoy = new Date()
  let fechaInicio: string | undefined = undefined
  let fechaFin: string | undefined = undefined

  if (tiempo === "mes") {
    fechaInicio = new Date(hoy.getFullYear(), hoy.getMonth(), 1).toISOString().split("T")[0]
    fechaFin = hoy.toISOString().split("T")[0]
  } else if (tiempo === "trimestre") {
    const tresMesesAntes = new Date(hoy)
    tresMesesAntes.setMonth(hoy.getMonth() - 3)
    fechaInicio = tresMesesAntes.toISOString().split("T")[0]
    fechaFin = hoy.toISOString().split("T")[0]
  } else if (tiempo === "año") {
    fechaInicio = new Date(hoy.getFullYear(), 0, 1).toISOString().split("T")[0]
    fechaFin = hoy.toISOString().split("T")[0]
  }

  return { fechaInicio, fechaFin }
}
