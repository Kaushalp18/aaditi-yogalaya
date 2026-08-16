# Aaditi Yogalaya

A mobile-first single-page site for Aaditi Yogalaya, built with React, TypeScript and Vite. Enquiry and feedback forms submit to Google Forms via Cloudflare Pages Functions, with Cloudflare Turnstile captcha.

## Run locally

```bash
npm install
npm run dev
```

`npm run dev` serves the UI only. To test form submissions locally (including `/api/*` routes):

```bash
npm run dev:full
```

Open **http://localhost:8788** (not `127.0.0.1`).

## Environment variables

| Variable | Type | Used by |
|---|---|---|
| `VITE_TURNSTILE_SITE_KEY` | Plain text (build) | Frontend Turnstile widget |
| `TURNSTILE_SECRET` | Secret (runtime) | Pages Functions siteverify |
| `TURNSTILE_HOSTNAMES` | Plain text (runtime) | Allowed frontend hostnames for siteverify |

### Local setup

**`.env`** (Vite build):
```
VITE_TURNSTILE_SITE_KEY=your_turnstile_site_key
```

**`.dev.vars`** (Pages Functions at runtime):
```
TURNSTILE_SECRET=your_secret_key
TURNSTILE_HOSTNAMES=localhost,127.0.0.1
```

### Cloudflare Pages (production)

In **Settings → Environment variables**, add:

| Variable | Value example | Type |
|---|---|---|
| `VITE_TURNSTILE_SITE_KEY` | (from Turnstile dashboard) | Plain text |
| `TURNSTILE_SECRET` | (from Turnstile dashboard) | Encrypted |
| `TURNSTILE_HOSTNAMES` | `aaditi-yogalaya.pages.dev` | Plain text |

Do **not** include `localhost` in production `TURNSTILE_HOSTNAMES`.

Redeploy after changing variables.

### Turnstile widget

Copy the site key and secret from your Turnstile widget in the [Cloudflare dashboard](https://dash.cloudflare.com/?to=/:account/turnstile).

Ensure these hostnames are registered on the widget:

- `localhost`
- `127.0.0.1`
- Your Cloudflare Pages domain

Protected actions: `enquiry` (class enquiry form), `feedback` (review form).

### Turnstile troubleshooting

If the widget shows **"Unable to connect"**:

1. Confirm hostnames above are in the widget settings
2. Open `http://localhost:8788` after `npm run dev:full`
3. Rebuild after editing `.env`: `npm run dev:full`
4. Disable ad blockers for `challenges.cloudflare.com`

## Deploy on Cloudflare Pages

1. Connect the repo in [Cloudflare Pages](https://pages.cloudflare.com/)
2. Build command: `npm run build`
3. Output directory: `dist`
4. Add the three environment variables above
5. Deploy — `functions/` routes deploy automatically

## Forms

- **Enquire** → Google Form (`enquiry` action + Turnstile)
- **Feedback** → Google Form (`feedback` action + Turnstile)
- **Contact section** → phone, WhatsApp, and email links
