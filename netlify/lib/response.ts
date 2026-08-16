export function jsonResponse(statusCode: number, body: object) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }
}

export function clientIp(headers: Record<string, string | undefined>) {
  return headers['x-forwarded-for']?.split(',')[0]?.trim()
}
