export const getTagColorByStatus = (status: string) => {
  const s = status.toLowerCase();
  if (s.includes("reserva")) return "tag-yellow";
  if (s.includes("activo")) return "tag-green";
  if (s.includes("inactivo")) return "tag-gray";
  if (s.includes("pendiente")) return "tag-orange";
  if (s.includes("proceso")) return "tag-blue";
  if (s.includes("cancelado")) return "tag-red";
  return "tag-gray";
};

export const getTagColorByService = (service: string) => {
  const s = service.toLowerCase();
  if (s.includes("seguro")) return "tag-green";
  if (s.includes("prestamo")) return "tag-purple";
  return "tag-gray";
};
