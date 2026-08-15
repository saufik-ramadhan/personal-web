/**
 * app.js — renders every section from content.js and handles language
 * switching, theme, navigation state and scroll reveals. No build step, no deps.
 */
(function () {
  'use strict';

  var LANGS = window.SITE.LANGS;
  var UI = window.SITE.UI;
  var SECTIONS = window.SITE.SECTIONS;
  var C = window.SITE.CONTENT;

  var LANG_KEY = 'site-lang';
  var THEME_KEY = 'site-theme';
  var CODES = LANGS.map(function (l) { return l.code; });
  var lang = resolveInitialLang();

  /* Section order drives the nav, the numbering and the scroll spy. */
  var NAV = ['about', 'education', 'experience', 'design', 'electronics', 'certifications', 'awards', 'languages'];

  /* ── Helpers ───────────────────────────────────────────────── */

  /** Pick the active-language string, falling back to English. */
  function t(value) {
    if (value == null) return '';
    if (typeof value === 'string') return value;
    return value[lang] || value.en || '';
  }

  function resolveInitialLang() {
    try {
      var saved = localStorage.getItem(LANG_KEY);
      if (saved && CODES.indexOf(saved) !== -1) return saved;
    } catch (e) { /* private mode — fall through */ }

    var prefs = navigator.languages || [navigator.language || 'en'];
    for (var i = 0; i < prefs.length; i++) {
      var base = String(prefs[i]).toLowerCase().split('-')[0];
      if (base === 'in') base = 'id';                       // legacy Indonesian tag
      if (CODES.indexOf(base) !== -1) return base;
    }
    return 'en';
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); }

  /** Comma-separated inline list — denser than a row of pills. */
  function inlineList(items) {
    var ul = el('ul', 'inline-list');
    items.forEach(function (item) { ul.appendChild(el('li', null, item)); });
    return ul;
  }

  /** "Tech stack  React, Next.js, …" on a single line. */
  function metaLine(labelKey, items) {
    var p = el('p', 'meta-line');
    p.appendChild(el('span', 'label', t(UI[labelKey])));
    p.appendChild(inlineList(items));
    return p;
  }

  function externalLink(href, label, className) {
    var a = el('a', className || 'link-more', label);
    a.href = href;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    return a;
  }

  /** Placeholder cover for empty portfolio slots. Uses theme tokens so it
   *  follows the light/dark switch; opacity varies per tile for some rhythm. */
  function placeholderCover(index) {
    var wrap = el('div', 'piece__cover');
    wrap.innerHTML =
      '<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
        '<rect width="400" height="300" fill="var(--bg-alt)"/>' +
        '<g fill="none" stroke="var(--accent)" stroke-opacity="' + (0.28 + (index % 3) * 0.1).toFixed(2) + '" stroke-width="1">' +
          '<path d="M200 78 L292 131 L292 213 L200 266 L108 213 L108 131 Z"/>' +
          '<path d="M200 78 L200 172 L292 131 M200 172 L108 131 M200 172 L200 266"/>' +
        '</g>' +
      '</svg>';
    return wrap;
  }

  /* ── Section renderers ─────────────────────────────────────── */

  function renderStaticText() {
    document.documentElement.lang = lang;
    document.title = C.meta.name + ' — ' + t(C.meta.role);

    document.querySelectorAll('[data-i18n]').forEach(function (node) {
      var path = node.getAttribute('data-i18n').split('.');
      var dict = path[0] === 'section' ? SECTIONS : UI;
      node.textContent = t(dict[path[1]]);
    });

    document.querySelectorAll('[data-bind]').forEach(function (node) {
      var key = node.getAttribute('data-bind').replace('meta.', '');
      node.textContent = t(C.meta[key]);
    });

    var mail = document.getElementById('footer-email');
    mail.href = 'mailto:' + C.meta.email;
    mail.textContent = C.meta.email;

    document.getElementById('footer-year').textContent = '© ' + new Date().getFullYear();

    var links = document.getElementById('footer-links');
    clear(links);
    (C.meta.links || []).forEach(function (item) {
      var li = el('li');
      li.appendChild(externalLink(item.url, item.label, null));
      links.appendChild(li);
    });
    links.appendChild(el('li', null, t(UI.builtWith)));
  }

  /** Contact block in the masthead: a compact label/value definition list. */
  function renderMasthead() {
    var dl = document.getElementById('masthead-meta');
    clear(dl);

    function row(label, valueNode) {
      var dt = el('dt', 'label', label);
      var dd = el('dd');
      dd.appendChild(valueNode);
      dl.appendChild(dt);
      dl.appendChild(dd);
    }

    row(t(UI.basedIn), document.createTextNode(t(C.meta.location)));

    var mail = el('a', null, C.meta.email);
    mail.href = 'mailto:' + C.meta.email;
    row(t(UI.email), mail);

    (C.meta.links || []).forEach(function (item) {
      row(item.label, externalLink(item.url, item.url.replace(/^https?:\/\//, ''), null));
    });
  }

  function renderNav() {
    [
      { list: document.getElementById('nav-list'), linkClass: 'nav__link', numbered: false },
      { list: document.getElementById('mobile-nav-list'), linkClass: 'mobile-menu__link', numbered: true },
    ].forEach(function (target) {
      clear(target.list);

      NAV.concat(['contact']).forEach(function (key, i) {
        var li = el('li');
        var a = el('a', target.linkClass);
        a.href = '#' + key;
        if (target.numbered) {
          a.appendChild(el('span', 'mobile-menu__num', key === 'contact' ? '—' : '0' + (i + 1)));
        }
        a.appendChild(el('span', null, t(SECTIONS[key])));
        li.appendChild(a);
        target.list.appendChild(li);
      });
    });
  }

  function renderAbout() {
    var body = document.getElementById('about-body');
    clear(body);
    C.about.paragraphs.forEach(function (p) { body.appendChild(el('p', null, t(p))); });

    var facts = document.getElementById('about-facts');
    clear(facts);
    C.about.skills.forEach(function (group) {
      var row = el('div', 'deflist__row reveal');
      row.appendChild(el('dt', 'label', t(group.label)));
      var dd = el('dd');
      dd.appendChild(inlineList(group.items));
      row.appendChild(dd);
      facts.appendChild(row);
    });
  }

  /** Shared shape for education / experience / electronics. */
  function entry(period, title, sub, place) {
    var li = el('li', 'entry reveal');
    li.appendChild(el('p', 'entry__period', period));

    var main = el('div', 'entry__main');
    main.appendChild(el('h3', 'entry__title', title));
    if (sub) main.appendChild(el('p', 'entry__sub', sub));
    if (place) main.appendChild(el('p', 'entry__place', place));

    li.appendChild(main);
    li.main = main;
    return li;
  }

  function renderEducation() {
    var list = document.getElementById('education-list');
    clear(list);
    C.education.forEach(function (item) {
      var li = entry(item.period, t(item.degree), t(item.school));
      if (item.detail) li.main.appendChild(el('p', 'entry__detail', t(item.detail)));

      if (item.thesis) {
        var line = el('p', 'meta-line');
        line.appendChild(el('span', 'label', t(UI.thesis)));
        line.appendChild(el('cite', 'entry__thesis', t(item.thesis)));
        li.main.appendChild(line);
      }

      list.appendChild(li);
    });
  }

  function renderExperience() {
    var list = document.getElementById('experience-list');
    clear(list);
    C.experience.forEach(function (job) {
      var li = entry(job.period, job.company, t(job.role), job.location ? t(job.location) : '');

      var bullets = el('ul', 'bullets');
      job.bullets.forEach(function (b) { bullets.appendChild(el('li', null, t(b))); });
      li.main.appendChild(bullets);

      if (job.projects && job.projects.length) li.main.appendChild(metaLine('projects', job.projects));
      if (job.stack && job.stack.length) li.main.appendChild(metaLine('stack', job.stack));

      list.appendChild(li);
    });
  }

  function renderElectronics() {
    var list = document.getElementById('electronics-list');
    clear(list);
    C.electronics.forEach(function (item) {
      var li = entry(item.year, t(item.title));
      li.main.appendChild(el('p', 'entry__detail', t(item.desc)));
      if (item.stack && item.stack.length) li.main.appendChild(metaLine('stack', item.stack));
      /* `demo` is optional and comes first — something playable beats source. */
      if (item.demo) {
        var d = el('p', 'meta-line');
        d.appendChild(externalLink(item.demo, t(UI.playDemo) + ' →'));
        li.main.appendChild(d);
      }
      if (item.link) {
        var p = el('p', 'meta-line');
        p.appendChild(externalLink(item.link, t(UI.viewMore) + ' →'));
        li.main.appendChild(p);
      }
      list.appendChild(li);
    });
  }

  /** Thumbnail strip that swaps the cover image in place. */
  function thumbStrip(images, coverImg, title) {
    var strip = el('div', 'piece__thumbs');

    images.forEach(function (src, i) {
      var btn = el('button', 'piece__thumb' + (i === 0 ? ' is-on' : ''));
      btn.type = 'button';
      btn.setAttribute('aria-label', title + ' — ' + (i + 1) + '/' + images.length);

      var thumb = el('img');
      thumb.src = src;
      thumb.alt = '';
      thumb.loading = 'lazy';
      btn.appendChild(thumb);

      btn.addEventListener('click', function () {
        coverImg.src = src;
        strip.querySelectorAll('.piece__thumb').forEach(function (b) { b.classList.remove('is-on'); });
        btn.classList.add('is-on');
      });

      strip.appendChild(btn);
    });

    return strip;
  }

  function renderDesign() {
    var list = document.getElementById('design-list');
    clear(list);
    C.design.forEach(function (item, i) {
      var article = el('article', 'piece reveal');

      /* `images` (list) wins; `image` (single) still works. */
      var images = (item.images && item.images.length) ? item.images : (item.image ? [item.image] : []);

      if (images.length) {
        var cover = el('div', 'piece__cover');
        var img = el('img');
        img.src = images[0];
        img.alt = t(item.title);
        img.loading = 'lazy';
        cover.appendChild(img);
        article.appendChild(cover);
        if (images.length > 1) article.appendChild(thumbStrip(images, img, t(item.title)));
      } else {
        article.appendChild(placeholderCover(i));
      }

      var body = el('div', 'piece__body');
      body.appendChild(el('p', 'piece__year', item.year));
      body.appendChild(el('h3', 'piece__title', t(item.title)));
      body.appendChild(el('p', 'piece__desc', t(item.desc)));

      var foot = el('div', 'piece__foot');
      if (item.tools && item.tools.length) foot.appendChild(metaLine('tools', item.tools));
      if (item.link) {
        var p = el('p', 'meta-line');
        p.appendChild(externalLink(item.link, t(UI.viewMore) + ' →'));
        foot.appendChild(p);
      }
      body.appendChild(foot);

      article.appendChild(body);
      list.appendChild(article);
    });
  }

  function renderCertifications() {
    var list = document.getElementById('certifications-list');
    clear(list);
    C.certifications.forEach(function (cert) {
      var li = el('li', 'row reveal');
      li.appendChild(el('span', 'row__year', cert.year));

      var main = el('div');
      main.appendChild(el('h3', 'row__name', t(cert.name)));
      main.appendChild(el('p', 'row__sub', t(UI.issuedBy) + ' · ' + t(cert.issuer)));
      if (cert.id) main.appendChild(el('p', 'row__note', t(UI.credential) + ' ' + cert.id));
      li.appendChild(main);

      if (cert.link) {
        var aside = el('div', 'row__aside');
        aside.appendChild(externalLink(cert.link, t(UI.viewMore) + ' →'));
        li.appendChild(aside);
      }
      list.appendChild(li);
    });
  }

  function renderAwards() {
    var list = document.getElementById('awards-list');
    clear(list);
    C.awards.forEach(function (award) {
      var li = el('li', 'row reveal');
      li.appendChild(el('span', 'row__year', award.year));

      var main = el('div');
      main.appendChild(el('h3', 'row__name', t(award.name)));
      if (award.issuer) main.appendChild(el('p', 'row__sub', t(award.issuer)));
      if (award.desc) main.appendChild(el('p', 'row__desc', t(award.desc)));
      li.appendChild(main);

      list.appendChild(li);
    });
  }

  function renderLanguages() {
    var list = document.getElementById('languages-list');
    clear(list);
    C.languages.forEach(function (item) {
      var li = el('li', 'lang-row reveal');
      li.appendChild(el('span', 'lang-row__name', t(item.name)));

      var note = el('span', 'lang-row__note', t(item.note));
      if (item.score) {
        note.appendChild(el('span', 'lang-row__score', t(item.score)));
      }
      li.appendChild(note);

      var meter = el('span', 'meter');
      meter.setAttribute('role', 'img');
      meter.setAttribute('aria-label', t(UI.level) + ' ' + item.level + '/5');
      for (var i = 1; i <= 5; i++) {
        meter.appendChild(el('span', 'meter__seg' + (i <= item.level ? ' is-on' : '')));
      }
      li.appendChild(meter);

      list.appendChild(li);
    });
  }

  /** Sections with no data would render as an empty heading — hide them. */
  function hideEmptySections() {
    var map = {
      design: C.design, electronics: C.electronics,
      certifications: C.certifications, awards: C.awards, languages: C.languages,
    };
    Object.keys(map).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) section.hidden = !(map[id] && map[id].length);
    });
  }

  function renderAll() {
    renderStaticText();
    renderMasthead();
    renderNav();
    renderAbout();
    renderEducation();
    renderExperience();
    renderDesign();
    renderElectronics();
    renderCertifications();
    renderAwards();
    renderLanguages();
    hideEmptySections();
    observeReveals();
    bindMobileNavClose();
  }

  /* ── Theme ─────────────────────────────────────────────────── */
  /* Light is the default; the inline script in <head> has already applied
     the stored choice, so this only keeps the button label in sync. */

  function currentTheme() {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) { /* ignore */ }
    syncThemeButton();
  }

  function syncThemeButton() {
    var btn = document.getElementById('theme-btn');
    var dark = currentTheme() === 'dark';
    btn.setAttribute('aria-pressed', String(dark));
    btn.setAttribute('aria-label', t(dark ? UI.toLight : UI.toDark));
    btn.title = btn.getAttribute('aria-label');
  }

  function bindTheme() {
    document.getElementById('theme-btn').addEventListener('click', function () {
      applyTheme(currentTheme() === 'dark' ? 'light' : 'dark');
    });
  }

  /* ── Language switcher ─────────────────────────────────────── */

  function buildLangMenu() {
    var menu = document.getElementById('lang-menu');
    clear(menu);
    LANGS.forEach(function (item) {
      var li = el('li', 'lang__item');
      var btn = el('button', 'lang__option');
      btn.type = 'button';
      btn.setAttribute('role', 'option');
      btn.setAttribute('lang', item.code);
      btn.setAttribute('aria-selected', String(item.code === lang));
      btn.appendChild(el('span', null, item.label));
      btn.appendChild(el('span', 'lang__code', item.short));
      btn.addEventListener('click', function () { setLang(item.code); closeLangMenu(); });
      li.appendChild(btn);
      menu.appendChild(li);
    });

    var current = LANGS.filter(function (l) { return l.code === lang; })[0] || LANGS[0];
    document.getElementById('lang-current').textContent = current.short;
    document.getElementById('lang-btn').setAttribute('aria-label', t(UI.language) + ': ' + current.label);
  }

  function setLang(code) {
    if (CODES.indexOf(code) === -1 || code === lang) return;
    lang = code;
    try { localStorage.setItem(LANG_KEY, code); } catch (e) { /* ignore */ }
    renderAll();
    buildLangMenu();
    syncThemeButton();
    updateActiveNav();
  }

  function openLangMenu() {
    document.getElementById('lang').classList.add('is-open');
    document.getElementById('lang-btn').setAttribute('aria-expanded', 'true');
  }
  function closeLangMenu() {
    document.getElementById('lang').classList.remove('is-open');
    document.getElementById('lang-btn').setAttribute('aria-expanded', 'false');
  }

  function bindLangSwitcher() {
    var wrap = document.getElementById('lang');

    document.getElementById('lang-btn').addEventListener('click', function (e) {
      e.stopPropagation();
      if (wrap.classList.contains('is-open')) closeLangMenu(); else openLangMenu();
    });
    document.addEventListener('click', function (e) {
      if (!wrap.contains(e.target)) closeLangMenu();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeLangMenu(); closeMobileMenu(); }
    });
  }

  /* ── Mobile menu ───────────────────────────────────────────── */

  function openMobileMenu() {
    var panel = document.getElementById('mobile-menu');
    panel.hidden = false;
    requestAnimationFrame(function () { panel.classList.add('is-open'); });
    document.getElementById('menu-btn').setAttribute('aria-expanded', 'true');
    document.body.classList.add('is-locked');
  }

  function closeMobileMenu() {
    var panel = document.getElementById('mobile-menu');
    if (panel.hidden) return;
    panel.classList.remove('is-open');
    document.getElementById('menu-btn').setAttribute('aria-expanded', 'false');
    document.body.classList.remove('is-locked');
    window.setTimeout(function () {
      if (!panel.classList.contains('is-open')) panel.hidden = true;
    }, 200);
  }

  function bindMobileMenu() {
    document.getElementById('menu-btn').addEventListener('click', function () {
      var open = document.getElementById('menu-btn').getAttribute('aria-expanded') === 'true';
      if (open) closeMobileMenu(); else openMobileMenu();
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1000) closeMobileMenu();
    });
  }

  /* Nav links are re-created on every render, so rebind after each one. */
  function bindMobileNavClose() {
    document.querySelectorAll('.mobile-menu__link').forEach(function (link) {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  /* ── Scroll behaviour ──────────────────────────────────────── */

  function observeReveals() {
    var items = document.querySelectorAll('.reveal:not(.is-visible)');
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (n) { n.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -4% 0px', threshold: 0.05 });

    items.forEach(function (n) { io.observe(n); });
  }

  function updateActiveNav() {
    var offset = 110;
    var current = NAV[0];
    NAV.concat(['contact']).forEach(function (id) {
      var section = document.getElementById(id);
      if (section && !section.hidden && section.getBoundingClientRect().top <= offset) current = id;
    });
    document.querySelectorAll('.nav__link').forEach(function (link) {
      link.classList.toggle('is-active', link.getAttribute('href') === '#' + current);
    });
  }

  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    document.getElementById('progress').style.width = (max > 0 ? Math.min(y / max, 1) * 100 : 0) + '%';
    updateActiveNav();
  }

  function bindScroll() {
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () { onScroll(); ticking = false; });
    }, { passive: true });
    onScroll();
  }

  /* ── Boot ──────────────────────────────────────────────────── */
  function init() {
    renderAll();
    buildLangMenu();
    syncThemeButton();
    bindTheme();
    bindLangSwitcher();
    bindMobileMenu();
    bindScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
