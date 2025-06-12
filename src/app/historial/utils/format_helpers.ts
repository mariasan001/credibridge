export const capitalizarNombre = (nombreCompleto: string) =>
  nombreCompleto
    .toLowerCase()
    .split(" ")
    .map(p => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");

export const formatearFecha = (fechaStr: string) => {
  const fecha = new Date(fechaStr);
  return new Intl.DateTimeFormat("es-MX", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(fecha);
};

export const calcularDiasRestantes = (fechaCreacion: string) => {
  const fechaInicio = new Date(fechaCreacion);
  const hoy = new Date();
  const diferencia = Math.floor((fechaInicio.getTime() + 16 * 86400000 - hoy.getTime()) / 86400000);

  if (diferencia < 0) return { texto: "Rebasado", clase: "tiempo-rebasado" };
  if (diferencia <= 1) return { texto: `Expira en ${diferencia} día`, clase: "tiempo-urgente" };
  return { texto: `Expira en ${diferencia} días`, clase: "tiempo-normal" };
};
