export function getAllowedCookieDomain(
  origin: string | undefined,
  allowedOrigins: string[],
): string | undefined {
  if (!origin) return undefined

  try {
    const url = new URL(origin)
    const hostname = url.hostname

    // Verifica si el origin está en la lista permitida
    if (allowedOrigins.includes(origin)) return hostname

    return undefined
  } catch {
    return undefined
  }
}
