# Aaditi Yogalaya

A mobile-first single-page site for Aaditi Yogalaya, built with React, TypeScript and Vite. Enquiry and feedback forms submit to Google Forms via Netlify Functions, with Cloudflare Turnstile captcha.

## Run locally

```bash
npm install
npm run dev
```

`npm run dev` serves the UI only. To test form submissions locally (including `/api/*` routes):

```bash
npm run dev:full
```

This runs `netlify dev` — Vite on port 5173 with API functions proxied at **http://localhost:8888**.

## Environment variables

| Variable | Type | Used by |
|---|---|---|
| `VITE_TURNSTILE_SITE_KEY` | Build | Frontend Turnstile widget |
| `TURNSTILE_SECRET` | Runtime secret | Netlify Functions siteverify |
| `TURNSTILE_HOSTNAMES` | Runtime | Allowed frontend hostnames for siteverify |

### Local setup

Copy `.env.example` to `.env` and fill in your values:

```
VITE_TURNSTILE_SITE_KEY=your_turnstile_site_key
TURNSTILE_SECRET=your_turnstile_secret_key
TURNSTILE_HOSTNAMES=localhost,127.0.0.1
```

`netlify dev` loads variables from `.env` automatically.

### Netlify (production)

In **Site configuration → Environment variables**, add for **Production** (and **Deploy previews** if needed):

| Variable | Value example | Scopes |
|---|---|---|
| `VITE_TURNSTILE_SITE_KEY` | (from Turnstile dashboard) | Builds |
| `TURNSTILE_SECRET` | (from Turnstile dashboard) | Functions |
| `TURNSTILE_HOSTNAMES` | `your-site.netlify.app` | Functions |

Do **not** include `localhost` in production `TURNSTILE_HOSTNAMES`.

Also add your Netlify domain to the Turnstile widget hostnames in the [Cloudflare dashboard](https://dash.cloudflare.com/?to=/:account/turnstile).

Redeploy after changing variables.

### Turnstile widget

Ensure these hostnames are registered on your Turnstile widget:

- `localhost`
- `127.0.0.1`
- Your Netlify domain (e.g. `your-site.netlify.app`)
- Custom domain if you use one

Protected actions: `enquiry` (class enquiry form), `feedback` (review form).

## Deploy on Netlify

1. Connect the repo at [Netlify](https://app.netlify.com/)
2. Build settings (auto-detected from `netlify.toml`):

   | Setting | Value |
   |---|---|
   | Build command | `npm run build` |
   | Publish directory | `dist` |
   | Functions directory | `netlify/functions` |

3. Add the three environment variables above
4. Deploy

API routes are mapped via `netlify.toml` redirects:

- `POST /api/enquiry` → Netlify Function
- `POST /api/feedback` → Netlify Function

## Forms

- **Enquire** → Google Form (`enquiry` action + Turnstile)
- **Feedback** → Google Form (`feedback` action + Turnstile)
- **Contact section** → phone, WhatsApp, and email links
