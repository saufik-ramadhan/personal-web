# Personal site — Saufik Ramadhan

A single-page personal site: biography, education, work experience, 3D design
portfolio, electronics/embedded projects, certifications, awards and language
proficiency.

Static HTML, CSS and vanilla JavaScript — no build step, no dependencies.
Available in **English, Bahasa Indonesia, 한국어, 日本語 and 中文**.

## Run it locally

Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 5173
```

## Editing the content

Everything you'll want to change lives in one file: [`assets/js/content.js`](assets/js/content.js).

Each user-visible string is an object keyed by language code:

```js
title: { en: 'Project title', id: '…', ko: '…', ja: '…', zh: '…' }
```

Missing languages fall back to `en`, so you can add an entry in English first
and translate it later. Entries marked `// TODO` in that file are placeholders:

| Section | Status |
| --- | --- |
| About, Education, Experience | Real data from the CV |
| Electronics — SGSCA | Real |
| Awards — National Electromedical Weeks 2018 | Real |
| **3D design** | **Placeholder — 3 slots to fill in** |
| **Certifications** | **Placeholder — 2 slots to fill in** |
| **Languages** | Indonesian + English, **check the levels** |

Removing every item from `design`, `electronics`, `certifications`, `awards` or
`languages` hides that section automatically.

### 3D portfolio images

Drop images into `assets/img/` and point the `image` field at them:

```js
{ year: '2025', title: {…}, image: 'assets/img/my-render.jpg', link: 'https://…' }
```

Leave `image` empty and a generated wireframe cover is used instead.

### Adding a language

Add it to `LANGS` at the top of `content.js` and fill in the matching key
across the file. Nothing else needs to change.

## Deployment

Pushing to `main` publishes to GitHub Pages via
[`.github/workflows/pages.yml`](.github/workflows/pages.yml).

## Layout

```
index.html              markup shell — sections are filled in at runtime
assets/css/style.css    design tokens, layout, light + dark themes
assets/js/content.js    all content, all languages   ← edit this
assets/js/app.js        rendering, i18n, nav, scroll behaviour
```
