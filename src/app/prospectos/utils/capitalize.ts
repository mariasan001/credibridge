export function capitalizeWords(text: string): string {
  return text
    .toLowerCase()
    .replace(/\b\w/g, char => char.toUpperCase());
}

export function capitalizeFirst(text: string): string {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}
