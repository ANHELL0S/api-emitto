export function getJwtExpiration() {
  const jwtTimeStr = process.env.JWT_TIME || '1h'

  const timeRegex = /^(\d+)([smhd])$/ // Para capturar números y unidades (s, m, h, d)
  const match = jwtTimeStr.match(timeRegex)

  if (!match) throw new Error(`Formato de JWT_TIME inválido: "${jwtTimeStr}"`)

  const [, value, unit] = match
  const timeValue = parseInt(value, 10)

  let jwtTimeMs: number

  switch (unit) {
    case 's': // segundos
      jwtTimeMs = timeValue * 1000
      break
    case 'm': // minutos
      jwtTimeMs = timeValue * 60 * 1000
      break
    case 'h': // horas
      jwtTimeMs = timeValue * 60 * 60 * 1000
      break
    case 'd': // días
      jwtTimeMs = timeValue * 24 * 60 * 60 * 1000
      break
    default:
      throw new Error(`Unidad de tiempo inválida en JWT_TIME: "${unit}"`)
  }

  return {
    expiresIn: Math.floor(jwtTimeMs / 1000), // en segundos para JWT
    jwtTimeMs, // en milisegundos
  }
}
