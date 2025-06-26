export function getServiceTagClass(service: string): string {
  const s = service.toLowerCase();
  if (s.includes("préstamo")) return "green";
  if (s.includes("seguro")) return "blue";
  return "gray";
}
