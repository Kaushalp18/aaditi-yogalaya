import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: TurnstileRenderOptions) => string
      reset: (widgetId: string) => void
      remove: (widgetId: string) => void
    }
    onTurnstileLoad?: () => void
  }
}

interface TurnstileRenderOptions {
  sitekey: string
  action: string
  callback: (token: string) => void
  'expired-callback'?: () => void
  'error-callback'?: () => void
}

export interface TurnstileHandle {
  reset: () => void
}

interface TurnstileProps {
  siteKey: string
  action: string
  onSuccess: (token: string) => void
  onExpire?: () => void
  onError?: () => void
}

let scriptReady: Promise<void> | null = null

function waitForTurnstile(): Promise<void> {
  if (window.turnstile) return Promise.resolve()
  if (scriptReady) return scriptReady

  scriptReady = new Promise((resolve, reject) => {
    const finish = () => resolve()
    window.onTurnstileLoad = finish

    const script = document.querySelector('script[data-turnstile-api]')
    if (!script) {
      scriptReady = null
      reject(new Error('Turnstile script not found.'))
      return
    }
    if (window.turnstile) finish()
    else script.addEventListener('load', finish, { once: true })
    script.addEventListener('error', () => {
      scriptReady = null
      reject(new Error('Failed to load Turnstile.'))
    }, { once: true })
  })

  return scriptReady
}

const Turnstile = forwardRef<TurnstileHandle, TurnstileProps>(function Turnstile({ siteKey, action, onSuccess, onExpire, onError }, ref) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | undefined>(undefined)
  const onSuccessRef = useRef(onSuccess)
  const onExpireRef = useRef(onExpire)
  const onErrorRef = useRef(onError)

  onSuccessRef.current = onSuccess
  onExpireRef.current = onExpire
  onErrorRef.current = onError

  useImperativeHandle(ref, () => ({
    reset: () => {
      if (widgetIdRef.current && window.turnstile) window.turnstile.reset(widgetIdRef.current)
    },
  }))

  useEffect(() => {
    let cancelled = false

    waitForTurnstile()
      .then(() => {
        if (cancelled || !containerRef.current || !window.turnstile) return
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          action,
          callback: (token) => onSuccessRef.current(token),
          'expired-callback': () => onExpireRef.current?.(),
          'error-callback': () => onErrorRef.current?.() ?? onExpireRef.current?.(),
        })
      })
      .catch(() => onErrorRef.current?.())

    return () => {
      cancelled = true
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = undefined
      }
    }
  }, [siteKey, action])

  return <div ref={containerRef} className="cf-turnstile turnstile-widget" />
})

export default Turnstile
