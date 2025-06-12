export const capitalizarNombre = (nombre: string) =>
  nombre
    .toLowerCase()
    .split(" ")
    .map(p => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");

export const formatearFechaHora = (fechaStr: string) => {
  const fecha = new Date(fechaStr);
  return new Intl.DateTimeFormat("es-MX", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(fecha);
};
