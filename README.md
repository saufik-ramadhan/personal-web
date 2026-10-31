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

Keep all five translations complete in the same change. Runtime English
fallback is defensive only; the profile checker rejects missing translations.
The website and **both English and Korean CVs must stay synchronized**.

| Section | Status |
| --- | --- |
| About, Education, Experience | Real data from the CV |
| Embedded — ESP32 thesis, STM32 control, IMU Racer, SGSCA | Documented projects; prototype limits retained |
| Desktop — LensaLAN and MagickGUI | Documented prototypes; LensaLAN uses Qt/QML, not WPF |
| Awards — Electromedical Innovation Week 2018 | Second place, Life Support category, Politeknik Kemenkes Surabaya |
| 3D design — all three pieces | Real (from Printables) |
| Certifications | Empty; no unverified examples published |
| Additional Training | KCCI 500-hour program, July–November 2026 (expected completion); 200 hours Korean language/culture and 300 hours technical training |
| Languages | Indonesian native; reported English score with TOEIC/EPT certificate-label caveat; no invented proficiency rating |

Removing every item from `design`, `electronics`, `software`, `training`, `certifications`, `awards` or
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

### Keep the CV and all website languages aligned

The workspace CV source lives in
`../output/KCCI-Tailored-Applications/data/`: `candidate_facts.json`,
`project_catalog.json` and `cv_entries.json`. Education now includes Vocational
School 1 Katapang (Computer and Network Engineering, July 2012–June 2015).
Employment periods retain the user-confirmed overlap. Hardware skills appear
first; C# and WPF are user-declared skills, not the stack used by LensaLAN.

The thesis repository is [esp32-olsrv2-thesis](https://github.com/saufik-ramadhan/esp32-olsrv2-thesis).
The site preserves its historical five-node results and prototype limitations.
Only code and four technical images were published there; no full thesis.

For every future change to profile information:

1. Update verified CV facts/project evidence and affected English **and** Korean
   CV entries, general CVs, CSV mirrors, generated PDFs and archives.
2. Update the corresponding English, Indonesian, Korean, Japanese and Chinese
   website text together. Preserve evidence limits in every language.
3. Run `node scripts/check-profile.mjs`. Changed CV fingerprints intentionally
   fail until all translations have been reviewed against the latest CV.
4. After that review, run `node scripts/check-profile.mjs --record`, then run
   the normal check again. `--cv-dir <bundle-folder>` supports another location.
   Recording acknowledges review; it does not translate or regenerate CVs.
5. Check desktop/mobile layout and language switching, bump cache versions,
   and verify the deployment after publishing.

`profile-sync.json` stores hashes, not private CV contents. The local checker
verifies translation coverage and the last reviewed website baseline. Without
the sibling CV bundle it explicitly cannot verify current cross-workspace CV
changes; run the full check in the CV workspace before pushing. The existing
Pages workflow only publishes the site; run profile checks before publishing.
Instructions are also
recorded in [AGENTS.md](AGENTS.md). The public website keeps only a city-level
location and does not copy private application details or the full thesis.

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
