type PagesFunction<Env = unknown> = (context: EventContext<Env, string, unknown>) => Response | Promise<Response>

interface EventContext<Env, P extends string, Data> {
  request: Request
  env: Env
  params: Record<P, string>
  waitUntil: (promise: Promise<unknown>) => void
  passThroughOnException: () => void
  next: () => Promise<Response>
  data: Data
}
