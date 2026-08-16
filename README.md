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
2. Configure build settings:

   | Setting | Value |
   |---|---|
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | **Deploy command** | `npm run deploy` |

   Use `npm run deploy` — **not** `npx wrangler deploy`. The deploy script runs `wrangler pages deploy`, which is the correct command for Pages (static `dist/` + `functions/` API routes).

3. Add environment variables (Settings → Environment variables):

   | Variable | Type |
   |---|---|
   | `VITE_TURNSTILE_SITE_KEY` | Plain text |
   | `TURNSTILE_SECRET` | Encrypted |
   | `TURNSTILE_HOSTNAMES` | Plain text (your `*.pages.dev` domain) |

4. **Fix authentication error (code 10000)** — required for `npm run deploy`:

   **Step A: Check for a bad token**
   - In your project → **Settings** → **Environment variables** (build variables section)
   - If `CLOUDFLARE_API_TOKEN` is set with a token that lacks Pages permissions, **delete it** or replace it (see Step B)
   - The Workers Builds default token often cannot call `wrangler pages deploy`

   **Step B: Create a token with Pages access**
   1. Go to [API Tokens](https://dash.cloudflare.com/profile/api-tokens) → **Create Token** → **Create Custom Token**
   2. Add permissions:
      - **Account** → **Cloudflare Pages** → **Edit**
      - **Account** → **Account Settings** → **Read**
   3. Account resources: **Include** → your account (`5e071c210a491f85acb921864f204fb7`)
   4. Create token and copy it

   **Step C: Add build variables** (Settings → Environment variables → **Build** variables, not runtime):

   | Variable | Value |
   |---|---|
   | `CLOUDFLARE_API_TOKEN` | the token from Step B (encrypted) |
   | `CLOUDFLARE_ACCOUNT_ID` | `5e071c210a491f85acb921864f204fb7` |

   **Step D: Verify project name**
   - In **Workers & Pages**, confirm your Pages project is named exactly `aaditi-yogalaya`
   - If the name differs, update `--project-name=` in `package.json` → `deploy` script

5. Save and redeploy.

### Wrong vs right deploy command

| Wrong | Right |
|---|---|
| `npx wrangler deploy` | `npm run deploy` |
| Workers deploy | Pages deploy (`wrangler pages deploy dist`) |

## Forms

- **Enquire** → Google Form (`enquiry` action + Turnstile)
- **Feedback** → Google Form (`feedback` action + Turnstile)
- **Contact section** → phone, WhatsApp, and email links
