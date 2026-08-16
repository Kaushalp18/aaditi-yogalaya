import type { Handler } from '@netlify/functions'
import { submitFeedbackForm } from '../lib/googleForms'
import { clientIp, jsonResponse } from '../lib/response'
import { parseHostnames, verifyTurnstile } from '../lib/turnstile'
import { validateFeedback } from '../lib/validation'

const EXPECTED_ACTION = 'feedback'

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { ok: false, error: 'Method not allowed.' })
  }

  try {
    const body = JSON.parse(event.body ?? '{}')
    const validated = validateFeedback(body)
    if (!validated.ok) return jsonResponse(400, { ok: false, error: validated.error })

    const { turnstileToken, ...feedback } = validated.data
    const secret = process.env.TURNSTILE_SECRET
    const hostnames = parseHostnames(process.env.TURNSTILE_HOSTNAMES)
    if (!secret || hostnames.size === 0) {
      return jsonResponse(500, { ok: false, error: 'Server configuration error.' })
    }

    const captchaOk = await verifyTurnstile(turnstileToken, secret, EXPECTED_ACTION, hostnames, clientIp(event.headers))
    if (!captchaOk) {
      return jsonResponse(403, { ok: false, error: 'Captcha verification failed. Please try again.' })
    }

    const submitted = await submitFeedbackForm(feedback)
    if (!submitted) {
      return jsonResponse(502, { ok: false, error: 'Unable to submit feedback. Please try again.' })
    }

    return jsonResponse(200, { ok: true })
  } catch {
    return jsonResponse(500, { ok: false, error: 'Something went wrong. Please try again.' })
  }
}
