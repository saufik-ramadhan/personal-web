# Maintaining this portfolio alongside the CV

Every profile/CV information change must be reflected in both English and Korean CVs and all website languages: English, Indonesian, Korean, Japanese and Chinese. This is an explicit user requirement.

In the parent workspace, candidate facts and project evidence live in `../output/KCCI-Tailored-Applications/data/{candidate_facts,project_catalog,cv_entries}.json`. Update those records, applicable CSV mirrors, both CV languages, PDFs and archives when facts change. This site consumes its reviewed multilingual content from `assets/js/content.js`; do not silently leave a locale falling back to English.

Use `node scripts/check-profile.mjs` before and after editing. It checks translation coverage, shared facts, project evidence, local assets and CV source fingerprints when the sibling CV bundle is available. A changed CV fingerprint requires a manual review of all translations; only then use `node scripts/check-profile.mjs --record` to record the reviewed baseline. It does not translate prose or regenerate CVs. If the CV source is absent, state that cross-workspace verification was unavailable and obtain the source before claiming full synchronization.

Do not invent dates, certifications, proficiency, benchmark results or completed portfolio work. C#/WPF is user-declared; LensaLAN uses C++20 and Qt/QML. Thesis metrics are historical, and full RFC conformance is not established. Do not add the full thesis, private home address, birth date, application photo or private CV files to this public repository. Use city-level location.

Run JavaScript syntax checks and the profile check, then review desktop/mobile rendering and all locale switches. Bump asset cache versions in `index.html` after changing assets. Pushing `main` publishes via GitHub Pages; inspect the deployment result before claiming the live site is updated.
