import { submitEnquiryForm } from '../_lib/googleForms'
import { parseHostnames, verifyTurnstile } from '../_lib/turnstile'
import { validateEnquiry } from '../_lib/validation'

interface Env {
  TURNSTILE_SECRET: string
  TURNSTILE_HOSTNAMES: string
}

const EXPECTED_ACTION = 'enquiry'

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const body = await context.request.json()
    const validated = validateEnquiry(body)
    if (!validated.ok) {
      return Response.json({ ok: false, error: validated.error }, { status: 400 })
    }

    const { turnstileToken, ...enquiry } = validated.data
    const secret = context.env.TURNSTILE_SECRET
    const hostnames = parseHostnames(context.env.TURNSTILE_HOSTNAMES)
    if (!secret || hostnames.size === 0) {
      return Response.json({ ok: false, error: 'Server configuration error.' }, { status: 500 })
    }

    const ip = context.request.headers.get('CF-Connecting-IP') ?? undefined
    const captchaOk = await verifyTurnstile(turnstileToken, secret, EXPECTED_ACTION, hostnames, ip)
    if (!captchaOk) {
      return Response.json({ ok: false, error: 'Captcha verification failed. Please try again.' }, { status: 403 })
    }

    const submitted = await submitEnquiryForm(enquiry)
    if (!submitted) {
      return Response.json({ ok: false, error: 'Unable to submit enquiry. Please try again.' }, { status: 502 })
    }

    return Response.json({ ok: true })
  } catch {
    return Response.json({ ok: false, error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
