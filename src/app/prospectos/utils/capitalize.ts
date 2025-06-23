export function capitalizeWords(text: string | null | undefined): string {
  if (!text) return "";
  return text
    .toLowerCase()
    .replace(/\b\w/g, char => char.toUpperCase());
}

export function capitalizeFirst(text: string | null | undefined): string {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}