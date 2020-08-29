
export function getPathFromLocation (location: string): string {
  const parts = location.split('/')
  const last = parts.pop()
  if (last && !last.includes('.')) {
    return [...parts, last].join('/')
  }
  return parts.join('/')
}
