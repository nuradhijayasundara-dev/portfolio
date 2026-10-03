# Wiyathma Anuradhi Jayasundara — Portfolio

An immersive, editorial-style personal portfolio built with React, Vite, Tailwind CSS, and Framer Motion.

## 1. Install dependencies

```bash
npm install
```

## 2. Run the dev server

```bash
npm run dev
```

Opens at `http://localhost:5173`.

## 3. Build for production

```bash
npm run build
```

Output goes to `dist/`. Preview it locally with:

```bash
npm run preview
```

## 4. Deploy to GitHub

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

## 5. Deploy to Vercel (free hosting)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. Click **New Project** and import the repository you just pushed.
3. Framework preset: **Vite** (auto-detected). Build command: `npm run build`. Output directory: `dist`.
4. Click **Deploy**. Vercel gives you a live `*.vercel.app` URL in about a minute.

## 6. Custom domain

1. In the Vercel project, go to **Settings → Domains**.
2. Add your domain (e.g. `wiyathma.dev`).
3. Update your DNS provider with the records Vercel shows you (usually an `A` record to `76.76.21.21` or a `CNAME` to `cname.vercel-dns.com`).
4. Wait for DNS propagation (a few minutes to a few hours) — Vercel issues an SSL certificate automatically.

## Editing content

All personal content lives in `src/data/`, so you can update the site without touching components:

- `profile.js` — name, roles, hero copy, about paragraphs, links, CV path
- `projects.js` — Backhaul-Match, Airplane Management System, and future projects
- `experience.js` — work history
- `leadership.js` — Aurora 2026 / IEEE involvement
- `education.js` — degree, timeline, coursework, achievements
- `skills.js` — toolkit categories

### Things marked as placeholders

Search the `src/data/` files for bracketed placeholders like `[ADD YEAR]`, `[ADD GITHUB URL]`, `[ADD RELEVANT COURSEWORK]` and fill them in as that information is finalized. Nothing was invented — every placeholder is intentional rather than guessed.

### Adding your CV

Drop your CV PDF at `public/cv/wiyathma-anuradhi-jayasundara-cv.pdf` (create the `cv` folder), matching the path already set in `src/data/profile.js` (`cvUrl`). The "Download CV" button in the Contact section will then work automatically.

### Open Graph image

`index.html` references `/og-image.png` for social share previews. Add a 1200×630 image at `public/og-image.png` when you have one ready.

## Tech stack

- React 18 + Vite 5
- Tailwind CSS (custom type scale, dark palette, `Fraunces` + `Inter` + `JetBrains Mono`)
- Framer Motion for scroll reveals, page-load choreography, and micro-interactions
- Lucide React for icons
- No backend, no paid services — 100% static, deployable anywhere that serves static files

## Notes on this build

This project's source was authored in a sandboxed environment without access to the npm registry, so `npm install` / `npm run build` could not be executed here to produce a verified build log. Every file was hand-written and syntax-checked (via TypeScript's parser in JS/JSX mode) with zero errors across the codebase. Run `npm install && npm run build` on your own machine as the first step — if anything surfaces, it will most likely be a dependency version nuance, not a structural issue.
