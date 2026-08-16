interface TurnstileVerifyResponse {
  success: boolean
  action?: string
  hostname?: string
  'error-codes'?: string[]
}

export async function verifyTurnstile(
  token: string,
  secret: string,
  expectedAction: string,
  expectedHostnames: Set<string>,
  ip?: string,
): Promise<boolean> {
  if (
    typeof token !== 'string' ||
    token.length === 0 ||
    token.length > 2048 ||
    expectedHostnames.size === 0
  ) {
    return false
  }

  const body = new URLSearchParams({ secret, response: token })
  if (ip) body.append('remoteip', ip)

  let result: TurnstileVerifyResponse
  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      signal: AbortSignal.timeout(10_000),
      body: body.toString(),
    })
    if (!response.ok) return false
    result = (await response.json()) as TurnstileVerifyResponse
  } catch {
    return false
  }

  return (
    result.success === true &&
    result.action === expectedAction &&
    typeof result.hostname === 'string' &&
    expectedHostnames.has(result.hostname)
  )
}

export function parseHostnames(raw: string | undefined): Set<string> {
  return new Set(
    (raw ?? '')
      .split(',')
      .map((hostname) => hostname.trim())
      .filter(Boolean),
  )
}
