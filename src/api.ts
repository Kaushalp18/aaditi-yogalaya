export async function postForm(path: string, body: unknown): Promise<{ ok: boolean; error?: string }> {
  const response = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const text = await response.text()
  if (!text.trim()) {
    if (response.status === 404) {
      return {
        ok: false,
        error: 'Form API not found. If testing locally, run npm run dev:full (Netlify dev).',
      }
    }
    return { ok: false, error: `Server returned an empty response (${response.status}). Please try again later.` }
  }

  try {
    const result = JSON.parse(text) as { ok: boolean; error?: string }
    if (!response.ok) return { ok: false, error: result.error ?? `Request failed (${response.status}).` }
    return result
  } catch {
    return { ok: false, error: 'Unexpected server response. Please try again later.' }
  }
}
