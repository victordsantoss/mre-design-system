/** camelCase / PascalCase → kebab-case (segmentos) */
export function toKebabSegment(key: string): string {
  return key
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/_/g, '-')
    .toLowerCase()
}
