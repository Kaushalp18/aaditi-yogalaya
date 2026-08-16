const ENQUIRY_FORM_ID = '1FAIpQLSeoXN5GVX7TRIRgF0PKP8_sshvGPyunjC6b3DesPoGg9Xk7Cg'
const FEEDBACK_FORM_ID = '1FAIpQLSeGK2SuhpJxyfXbq17Zik0D3g43ipgeN-dJSkvEfU2R6v5a-w'

export async function submitGoogleForm(formId: string, entries: Record<string, string | string[]>): Promise<boolean> {
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(entries)) {
    if (Array.isArray(value)) {
      for (const item of value) params.append(key, item)
    } else if (value) {
      params.append(key, value)
    }
  }

  try {
    const response = await fetch(`https://docs.google.com/forms/d/e/${formId}/formResponse`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
      redirect: 'manual',
    })

    return response.status === 200 || response.status === 302
  } catch {
    return false
  }
}

export function submitEnquiryForm(data: {
  name: string
  phone: string
  email?: string
  programs: string[]
  format: string
  message?: string
}) {
  return submitGoogleForm(ENQUIRY_FORM_ID, {
    'entry.132482892': data.name,
    'entry.1863336812': data.phone,
    'entry.1974624443': data.email ?? '',
    'entry.1620327182': data.programs,
    'entry.670440874': data.format,
    'entry.1606648014': data.message ?? '',
  })
}

export function submitFeedbackForm(data: {
  name: string
  rating: string
  feedback?: string
}) {
  return submitGoogleForm(FEEDBACK_FORM_ID, {
    'entry.1552895185': data.name,
    'entry.675692001': data.rating,
    'entry.383145406': data.feedback ?? '',
  })
}
