# Bea Ambassador Onboarding

Pixel-perfect ambassador onboarding flow for Logic Yard — built with **Next.js 15**, **React 19**, and **Tailwind CSS 4**.

## Repository layout

```
.
├── apps/
│   └── web/                 # Next.js application (run dev/build here)
├── design/
│   ├── artboards/           # Source PNG exports from Illustrator (Artboard 1_*.png)
│   ├── archive/             # Original .ai files and design deliverables
│   └── scripts/             # PowerShell helpers to parse .ai design files
├── scripts/                 # Dev workflow (dev, build, install, setup-node)
├── tooling/                 # Asset extraction & pixel-perfect QA (Node/Playwright)
├── package.json             # Root npm scripts (proxy to apps/web)
└── README.md
```

## Quick start

### Prerequisites

- Node.js 22 (via [fnm](https://github.com/Schniz/fnm) recommended)
- Run `.\scripts\setup-node.ps1` once if Node is not installed

### Install & run

```powershell
.\scripts\install.ps1   # npm install in apps/web
.\scripts\dev.ps1         # http://localhost:3000
```

Or from the repo root with npm:

```powershell
npm install
npm run dev
```

### Production build

```powershell
.\scripts\build.ps1
# or: npm run build
```

## Application routes

| Route | Purpose |
|-------|---------|
| `/` | Welcome / prize overview |
| `/your-school` → `/prizes` → `/account` → `/invites` → `/youre-in` | Onboarding steps |
| `/login` | Ambassador login |
| `/forgot-password` | Password reset (stub) |
| `/api/auth/login`, `/api/auth/social` | Demo auth API |

## Regenerating assets

From `tooling/` (after `npm install`):

```powershell
cd tooling
node extract_artboard_pages.mjs    # PNG artboards → apps/web/public/artboards/
node extract_all_artboards.mjs     # Slice welcome page images
node measure.mjs overlays          # Regenerate artboard-overlays.json
```

Source artboards live in `design/artboards/`.

## Configuration

JSON-driven content in `apps/web/src/config/`:

- `login.json` — login form, API endpoints, theme
- `navigation.json` — route links
- `onboarding.json` — stepper copy

Set `useExternalBackend: true` in `login.json` to proxy auth to a real backend.

## Deploy on Vercel

1. Import [Ammmaarrr/Bea-ambassador-onboarding](https://github.com/Ammmaarrr/Bea-ambassador-onboarding) on Vercel.
2. Set **Root Directory** to `apps/web` (Vercel usually detects this automatically).
3. Deploy — no environment variables needed for demo auth.

Build/install commands default to `npm run build` and `npm install` inside `apps/web`.

## Tooling

| Command | Description |
|---------|-------------|
| `node measure.mjs overlays` | Regenerate CTA/input overlay coordinates |
| `node measure.mjs artboards` | Inspect artboard dimensions |
| `node measure.mjs prize-ref` | Compare prize cards vs reference (Playwright) |
| `node perfectpixel.mjs` | Screenshot diff QA |

## Tech stack

- **Framework:** Next.js 15 (App Router)
- **UI:** React 19, Tailwind CSS 4, lucide-react
- **Auth:** Config-driven demo mode with optional external backend proxy
