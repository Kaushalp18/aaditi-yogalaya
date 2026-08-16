const PROGRAM_OPTIONS = [
  'Regular Yoga',
  'Prenatal Yoga + Garbha Sanskar',
  'Postnatal Yoga',
  'Personal Sessions',
] as const

const FORMAT_OPTIONS = ['Online', 'In-person, Navi Mumbai', 'Either is fine'] as const

export function validateEnquiry(body: unknown): { ok: true; data: EnquiryData } | { ok: false; error: string } {
  if (!body || typeof body !== 'object') return { ok: false, error: 'Invalid request body.' }

  const { name, phone, email, programs, format, message, turnstileToken } = body as Record<string, unknown>

  if (typeof turnstileToken !== 'string' || !turnstileToken) {
    return { ok: false, error: 'Please complete the captcha.' }
  }

  const trimmedName = typeof name === 'string' ? name.trim() : ''
  if (!trimmedName) return { ok: false, error: 'Name is required.' }

  const trimmedPhone = typeof phone === 'string' ? phone.trim() : ''
  if (!trimmedPhone) return { ok: false, error: 'Phone number is required.' }
  if (!/^[\d\s+\-()]{7,15}$/.test(trimmedPhone)) {
    return { ok: false, error: 'Please enter a valid phone number.' }
  }

  if (email !== undefined && email !== '' && (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))) {
    return { ok: false, error: 'Please enter a valid email address.' }
  }

  if (!Array.isArray(programs) || programs.length === 0) {
    return { ok: false, error: 'Please select at least one program.' }
  }

  const validPrograms = programs.filter((p): p is string => typeof p === 'string' && PROGRAM_OPTIONS.includes(p as typeof PROGRAM_OPTIONS[number]))
  if (validPrograms.length === 0) return { ok: false, error: 'Please select at least one valid program.' }

  const trimmedFormat = typeof format === 'string' ? format.trim() : ''
  if (!trimmedFormat || !FORMAT_OPTIONS.includes(trimmedFormat as typeof FORMAT_OPTIONS[number])) {
    return { ok: false, error: 'Preferred format is required.' }
  }

  return {
    ok: true,
    data: {
      name: trimmedName,
      phone: trimmedPhone,
      email: typeof email === 'string' ? email.trim() : undefined,
      programs: validPrograms,
      format: trimmedFormat,
      message: typeof message === 'string' ? message.trim() : undefined,
      turnstileToken,
    },
  }
}

export function validateFeedback(body: unknown): { ok: true; data: FeedbackData } | { ok: false; error: string } {
  if (!body || typeof body !== 'object') return { ok: false, error: 'Invalid request body.' }

  const { name, rating, feedback, turnstileToken } = body as Record<string, unknown>

  if (typeof turnstileToken !== 'string' || !turnstileToken) {
    return { ok: false, error: 'Please complete the captcha.' }
  }

  const trimmedName = typeof name === 'string' ? name.trim() : ''
  if (!trimmedName) return { ok: false, error: 'Name is required.' }

  const ratingStr = typeof rating === 'string' ? rating : String(rating ?? '')
  if (!['1', '2', '3', '4', '5'].includes(ratingStr)) {
    return { ok: false, error: 'Rating is required.' }
  }

  return {
    ok: true,
    data: {
      name: trimmedName,
      rating: ratingStr,
      feedback: typeof feedback === 'string' ? feedback.trim() : undefined,
      turnstileToken,
    },
  }
}

export interface EnquiryData {
  name: string
  phone: string
  email?: string
  programs: string[]
  format: string
  message?: string
  turnstileToken: string
}

export interface FeedbackData {
  name: string
  rating: string
  feedback?: string
  turnstileToken: string
}
