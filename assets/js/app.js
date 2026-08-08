/**
 * app.js — renders every section from content.js and handles language
 * switching, navigation state and scroll reveals. No build step, no deps.
 */
(function () {
  'use strict';

  var LANGS = window.SITE.LANGS;
  var UI = window.SITE.UI;
  var SECTIONS = window.SITE.SECTIONS;
  var C = window.SITE.CONTENT;

  var STORAGE_KEY = 'site-lang';
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
      var saved = localStorage.getItem(STORAGE_KEY);
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

  function tagList(items) {
    var ul = el('ul', 'tags');
    items.forEach(function (item) { ul.appendChild(el('li', 'tag', item)); });
    return ul;
  }

  /** "Tech stack: React, Next.js…" style row with a small caps label. */
  function metaRow(labelKey, items) {
    var row = el('div', 'meta-row');
    row.appendChild(el('span', 'label', t(UI[labelKey])));
    row.appendChild(tagList(items));
    return row;
  }

  function externalLink(href, label) {
    var a = el('a', 'link-more');
    a.href = href;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.appendChild(el('span', null, label));
    a.appendChild(el('span', null, '→'));
    return a;
  }

  /** Deterministic placeholder cover so empty portfolio slots still look designed. */
  function placeholderCover(index) {
    var hue = 208 + index * 26;
    var wrap = el('div', 'piece__cover');
    wrap.innerHTML =
      '<svg viewBox="0 0 400 300" role="img" aria-hidden="true" preserveAspectRatio="xMidYMid slice">' +
        '<defs><linearGradient id="g' + index + '" x1="0" y1="0" x2="1" y2="1">' +
          '<stop offset="0%" stop-color="hsl(' + hue + ' 34% 88%)"/>' +
          '<stop offset="100%" stop-color="hsl(' + (hue + 32) + ' 26% 72%)"/>' +
        '</linearGradient></defs>' +
        '<rect width="400" height="300" fill="url(#g' + index + ')"/>' +
        '<g fill="none" stroke="hsl(' + hue + ' 30% 42%)" stroke-opacity=".38" stroke-width="1">' +
          '<path d="M200 78 L292 131 L292 213 L200 266 L108 213 L108 131 Z"/>' +
          '<path d="M200 78 L200 172 L292 131 M200 172 L108 131 M200 172 L200 266"/>' +
        '</g>' +
      '</svg>';
    return wrap;
  }

  function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); }

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

    ['hero-email', 'footer-email'].forEach(function (id) {
      var a = document.getElementById(id);
      a.href = 'mailto:' + C.meta.email;
      a.textContent = C.meta.email;
    });

    document.getElementById('footer-year').textContent = '© ' + new Date().getFullYear();

    var links = document.getElementById('footer-links');
    clear(links);
    (C.meta.links || []).forEach(function (item) {
      var li = el('li');
      var a = el('a', null, item.label);
      a.href = item.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      li.appendChild(a);
      links.appendChild(li);
    });
    var note = el('li', null, t(UI.builtWith));
    links.appendChild(note);
  }

  function renderNav() {
    [
      { list: document.getElementById('nav-list'), linkClass: 'nav__link', numbered: false },
      { list: document.getElementById('mobile-nav-list'), linkClass: 'mobile-menu__link', numbered: true },
    ].forEach(function (target) {
      clear(target.list);
      NAV.forEach(function (key, i) {
        var li = el('li');
        var a = el('a', target.linkClass);
        a.href = '#' + key;
        if (target.numbered) {
          a.appendChild(el('span', 'mobile-menu__num', '0' + (i + 1)));
        }
        a.appendChild(el('span', null, t(SECTIONS[key])));
        li.appendChild(a);
        target.list.appendChild(li);
      });

      var contact = el('li');
      var ca = el('a', target.linkClass);
      ca.href = '#contact';
      if (target.numbered) ca.appendChild(el('span', 'mobile-menu__num', '—'));
      ca.appendChild(el('span', null, t(SECTIONS.contact)));
      contact.appendChild(ca);
      target.list.appendChild(contact);
    });
  }

  function renderAbout() {
    var body = document.getElementById('about-body');
    clear(body);
    C.about.paragraphs.forEach(function (p) { body.appendChild(el('p', null, t(p))); });

    var facts = document.getElementById('about-facts');
    clear(facts);
    C.about.skills.forEach(function (group) {
      var li = el('li', 'fact reveal');
      li.appendChild(el('span', 'label fact__label', t(group.label)));
      li.appendChild(tagList(group.items));
      facts.appendChild(li);
    });
  }

  function renderEducation() {
    var list = document.getElementById('education-list');
    clear(list);
    C.education.forEach(function (item) {
      var li = el('li', 'entry reveal');
      li.appendChild(el('p', 'entry__period', item.period));
      li.appendChild(el('h3', 'entry__title', t(item.degree)));
      li.appendChild(el('p', 'entry__sub', t(item.school)));
      if (item.detail) li.appendChild(el('p', 'entry__detail', t(item.detail)));
      list.appendChild(li);
    });
  }

  function renderExperience() {
    var list = document.getElementById('experience-list');
    clear(list);
    C.experience.forEach(function (job) {
      var li = el('li', 'entry reveal');
      li.appendChild(el('p', 'entry__period', job.period));
      li.appendChild(el('h3', 'entry__title', job.company));
      li.appendChild(el('p', 'entry__sub', t(job.role)));
      if (job.location) li.appendChild(el('p', 'entry__place', t(job.location)));

      var bullets = el('ul', 'bullets');
      job.bullets.forEach(function (b) { bullets.appendChild(el('li', null, t(b))); });
      li.appendChild(bullets);

      if (job.projects && job.projects.length) li.appendChild(metaRow('projects', job.projects));
      if (job.stack && job.stack.length) li.appendChild(metaRow('stack', job.stack));

      list.appendChild(li);
    });
  }

  function renderDesign() {
    var list = document.getElementById('design-list');
    clear(list);
    C.design.forEach(function (item, i) {
      var article = el('article', 'piece reveal');

      if (item.image) {
        var cover = el('div', 'piece__cover');
        var img = el('img');
        img.src = item.image;
        img.alt = t(item.title);
        img.loading = 'lazy';
        cover.appendChild(img);
        article.appendChild(cover);
      } else {
        article.appendChild(placeholderCover(i));
      }

      var body = el('div', 'piece__body');
      body.appendChild(el('p', 'piece__year', item.year));
      body.appendChild(el('h3', 'piece__title', t(item.title)));
      body.appendChild(el('p', 'piece__desc', t(item.desc)));

      var foot = el('div', 'piece__foot');
      if (item.tools && item.tools.length) foot.appendChild(tagList(item.tools));
      if (item.link) foot.appendChild(externalLink(item.link, t(UI.viewMore)));
      body.appendChild(foot);

      article.appendChild(body);
      list.appendChild(article);
    });
  }

  function renderElectronics() {
    var list = document.getElementById('electronics-list');
    clear(list);
    C.electronics.forEach(function (item) {
      var article = el('article', 'card reveal');
      article.appendChild(el('p', 'card__year', item.year));
      article.appendChild(el('h3', 'card__title', t(item.title)));
      article.appendChild(el('p', 'card__desc', t(item.desc)));
      if (item.stack && item.stack.length) article.appendChild(metaRow('stack', item.stack));
      if (item.link) article.appendChild(externalLink(item.link, t(UI.viewMore)));
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
        aside.appendChild(externalLink(cert.link, t(UI.viewMore)));
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
      var li = el('li', 'lang-card reveal');

      var top = el('div', 'lang-card__top');
      top.appendChild(el('h3', 'lang-card__name', t(item.name)));
      top.appendChild(el('span', 'row__year', item.level + '/5'));
      li.appendChild(top);

      li.appendChild(el('p', 'lang-card__note', t(item.note)));

      var meter = el('div', 'meter');
      meter.setAttribute('role', 'img');
      meter.setAttribute('aria-label', t(item.name) + ': ' + item.level + '/5');
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
    try { localStorage.setItem(STORAGE_KEY, code); } catch (e) { /* ignore */ }
    renderAll();
    buildLangMenu();
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
    var btn = document.getElementById('lang-btn');

    btn.addEventListener('click', function (e) {
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
    }, 260);
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
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    items.forEach(function (n) { io.observe(n); });
  }

  function updateActiveNav() {
    var offset = 140;
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
    document.getElementById('header').classList.toggle('is-stuck', y > 8);

    var max = document.documentElement.scrollHeight - window.innerHeight;
    var pct = max > 0 ? Math.min(y / max, 1) * 100 : 0;
    document.getElementById('progress').style.width = pct + '%';

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
