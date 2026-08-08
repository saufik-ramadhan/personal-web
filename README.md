# Personal site — Saufik Ramadhan

A single-page personal site: biography, education, work experience, 3D design
portfolio, electronics/embedded projects, certifications, awards and language
proficiency.

Static HTML, CSS and vanilla JavaScript — no build step, no dependencies.
Available in **English, Bahasa Indonesia, 한국어, 日本語 and 中文**.

Dense academic/newspaper layout — narrow measure, tight leading, hairline rules.
Light theme by default with a toggle in the header; both the theme and the
language choice persist in `localStorage`.

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
| 3D design — all three pieces | Real (from Printables) |
| **Certifications** | **Placeholder — 2 slots to fill in** |
| **Languages** | Indonesian + English, **check the levels** |

Removing every item from `design`, `electronics`, `certifications`, `awards` or
`languages` hides that section automatically.

### 3D portfolio images

Drop images into `assets/img/` and list them in `images`. The first is the
cover; any others become thumbnails that swap the cover when clicked:

```js
{
  year: '2026',
  title: {…},
  images: ['assets/img/thing/01.jpg', 'assets/img/thing/02.jpg'],
  link: 'https://…',
}
```

A single `image: '…'` still works. Leave both empty and a generated wireframe
cover is used instead.

### Adding a language

Add it to `LANGS` at the top of `content.js` and fill in the matching key
across the file. Nothing else needs to change.

## Deployment

Pushing to `main` publishes to GitHub Pages via
[`.github/workflows/pages.yml`](.github/workflows/pages.yml).

After changing `style.css` or either JS file, bump the `?v=` query strings on
the three asset tags in `index.html` — that's what stops returning visitors
from being served a stale cached copy.

## Layout

```
index.html              markup shell — sections are filled in at runtime
assets/css/style.css    design tokens, layout, light + dark themes
assets/js/content.js    all content, all languages   ← edit this
assets/js/app.js        rendering, i18n, nav, scroll behaviour
```
