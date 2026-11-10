(() => {
  'use strict';

  const C = window.CLUB;
  const CFG = window.SUPABASE_CONFIG || {};
  const sb = (CFG.url && CFG.anonKey && window.supabase)
    ? window.supabase.createClient(CFG.url, CFG.anonKey)
    : null;

  const $ = (s, r = document) => r.querySelector(s);

  // Crea elementos de forma segura (textContent, nunca innerHTML) para que
  // el contenido que venga de la base de datos no pueda inyectar HTML.
  function el(tag, attrs = {}, ...kids) {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (v === null || v === undefined || v === false) continue;
      if (k === 'class') n.className = v;
      else if (k === 'text') n.textContent = v;
      else n.setAttribute(k, v === true ? '' : v);
    }
    for (const kid of kids.flat()) {
      if (kid === null || kid === undefined) continue;
      n.append(kid.nodeType ? kid : document.createTextNode(kid));
    }
    return n;
  }
  const safeUrl = (u) => { try { const x = new URL(u, location.href); return ['http:', 'https:'].includes(x.protocol) ? x.href : '#'; } catch { return '#'; } };

  /* ---------------- Navegación ---------------- */
  const nav = $('#nav'), toggle = $('.nav-toggle');
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  });
  nav.addEventListener('click', (e) => {
    if (e.target.closest('a')) { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
  });

  // Resalta el enlace de la sección visible
  const links = [...nav.querySelectorAll('a[href^="#"]')];
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) links.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('main section[id]').forEach((s) => spy.observe(s));

  // Animaciones de entrada
  const revealer = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); revealer.unobserve(en.target); } });
  }, { threshold: .12 });
  const observeReveals = () => document.querySelectorAll('.reveal:not(.in)').forEach((n) => revealer.observe(n));

  /* ---------------- Contenido estático ---------------- */
  $('#year').textContent = new Date().getFullYear();
  const setHref = (sel, url) => { const a = $(sel); if (a) a.href = safeUrl(url); };
  setHref('#teleton-link', C.teletonUrl); setHref('#transp-link', C.transparenciaUrl);
  setHref('#foot-teleton', C.teletonUrl); setHref('#donar-link', C.teletonUrl);

  // Barra superior
  const tbTel = $('#tb-tel'); tbTel.href = 'tel:' + C.telefonoHref; tbTel.textContent = '📞 ' + C.telefono;
  const tbMail = $('#tb-mail'); tbMail.href = 'mailto:' + C.email; tbMail.textContent = '✉️ ' + C.email;
  $('#tb-hours').textContent = '🕒 ' + (C.horarioCorto || C.horario);

  // Textos institucionales
  $('#cita').textContent = '“' + C.cita + '”';
  $('#lema').textContent = '“' + C.lema + '”';
  $('#foot-lema').textContent = C.lema;
  C.quienesSomos.forEach((t) => $('#qs-parrafos').append(el('p', { text: t })));
  C.mision.forEach((t) => $('#mision-lista').append(el('li', { text: t })));
  $('#vision-texto').textContent = C.vision;

  // Datos de contacto (sección Contacto y pie)
  [['📍', C.direccion], ['📞', C.telefono, 'tel:' + C.telefonoHref], ['✉️', C.email, 'mailto:' + C.email], ['🕒', C.horario]]
    .forEach(([ico, txt, href]) => $('#contacto-info').append(el('li', {},
      el('span', { 'aria-hidden': 'true', text: ico }), href ? el('a', { href, text: txt }) : el('span', { text: txt }))));
  $('#foot-contact').append(
    el('li', { text: '📍 ' + C.direccion }),
    el('li', {}, el('a', { href: 'tel:' + C.telefonoHref, text: '📞 ' + C.telefono })),
    el('li', {}, el('a', { href: 'mailto:' + C.email, text: '✉️ ' + C.email })));

  // Galería (solo si hay fotos)
  if (C.galeria && C.galeria.length) {
    $('#galeria').hidden = false;
    C.galeria.forEach((g) => $('#galeria-grid').append(el('figure', { class: 'reveal' }, el('img', { src: g.src, alt: g.alt || '', loading: 'lazy' }))));
  }

  // Ticker con nombres de comités (se duplica para el bucle infinito)
  const track = $('#ticker-track');
  [...C.comites, ...C.comites].forEach((c) => track.append(el('span', { text: c.nombre })));

  // Redes sociales (barra superior, contacto y pie)
  const redNames = { instagram: 'Instagram', facebook: 'Facebook', x: 'X', youtube: 'YouTube', tiktok: 'TikTok' };
  Object.entries(C.redes).filter(([, r]) => r && r.url).forEach(([k, r]) => {
    const name = redNames[k] || k;
    const link = (text, cls) => el('a', { class: cls, href: safeUrl(r.url), target: '_blank', rel: 'noopener', text });
    $('#tb-social').append(link(name));
    $('#socials').append(link(name));
    $('#foot-social').append(el('li', {}, link(name + ': ' + r.label)));
  });

  // Comités + filtros
  function makeChips(container, items, onPick) {
    const btns = items.map(([value, label]) => {
      const b = el('button', { class: 'chip', type: 'button', 'aria-pressed': 'false', text: label });
      b.addEventListener('click', () => { btns.forEach((x) => x.setAttribute('aria-pressed', String(x === b))); onPick(value); });
      container.append(b);
      return b;
    });
    btns[0].setAttribute('aria-pressed', 'true');
  }
  const grid = $('#comites-grid');
  C.comites.forEach((c) => {
    grid.append(el('article', { class: 'card reveal', 'data-cat': c.cat },
      el('div', { class: 'ico', 'aria-hidden': 'true', text: c.icono }),
      el('h3', { text: c.nombre }),
      el('p', { text: c.desc }),
      el('span', { class: 'cat', text: C.categorias[c.cat] })
    ));
  });
  makeChips($('#comites-filtros'), [['todos', 'Todos'], ...Object.entries(C.categorias)], (cat) => {
    grid.querySelectorAll('.card').forEach((card) => card.classList.toggle('hidden', cat !== 'todos' && card.dataset.cat !== cat));
  });

  // Selector de comités en el formulario
  const volComite = $('#vol-comite');
  C.comites.forEach((c) => volComite.append(el('option', { value: c.nombre, text: c.nombre })));

  // Junta directiva
  $('#junta-periodo').textContent = C.juntaPeriodo || '';
  C.junta.forEach((m) => {
    const initials = m.nombre.split(/\s+/).slice(0, 2).map((p) => p[0]).join('').toUpperCase();
    const avatar = m.foto
      ? el('div', { class: 'avatar' }, el('img', { src: m.foto, alt: m.nombre, loading: 'lazy' }))
      : el('div', { class: 'avatar', 'aria-hidden': 'true', text: initials });
    $('#junta-grid').append(el('article', { class: 'member reveal' }, avatar, el('h3', { text: m.nombre }), el('p', { text: m.cargo })));
  });

  // Asuntos del formulario de contacto
  C.asuntosContacto.forEach((a) => $('#con-asunto').append(el('option', { value: a, text: a })));

  // Enlace de Instagram en la tarjeta del inicio
  const igBtn = $('#hero-ig');
  if (igBtn && C.redes && C.redes.instagram && C.redes.instagram.url) igBtn.href = safeUrl(C.redes.instagram.url);
  else if (igBtn) igBtn.hidden = true;

  /* ---------------- Transparencia (Supabase) ---------------- */
  const tipoDoc = { estado_financiero: ['📊', 'Estado financiero'], informe: ['📄', 'Informe'], acta: ['📝', 'Acta'], otro: ['📎', 'Documento'] };
  async function cargarDocs() {
    const box = $('#docs-lista'), estado = $('#docs-estado');
    if (!sb) { estado.textContent = 'Modo demo: aquí aparecerán los estados financieros cuando conectes Supabase.'; return; }
    const { data, error } = await sb.from('documentos_transparencia').select('*').order('creado_en', { ascending: false });
    if (error) { estado.textContent = 'No pudimos cargar los documentos en este momento.'; estado.className = 'status err'; return; }
    if (!data.length) { box.append(el('div', { class: 'empty', text: 'Estamos preparando la publicación de nuestros estados financieros actualizados.' })); return; }
    const porPeriodo = new Map();
    data.forEach((d) => { if (!porPeriodo.has(d.periodo)) porPeriodo.set(d.periodo, []); porPeriodo.get(d.periodo).push(d); });
    porPeriodo.forEach((docs, periodo) => {
      box.append(el('div', { class: 'doc-group reveal' }, el('h3', { text: periodo }),
        el('div', { class: 'doc-list' }, docs.map((d) => {
          const [ico, lbl] = tipoDoc[d.tipo] || tipoDoc.otro;
          return el('a', { class: 'doc', href: safeUrl(d.archivo_url), target: '_blank', rel: 'noopener' },
            el('span', { class: 'ico', 'aria-hidden': 'true', text: ico }),
            el('span', {}, el('strong', { text: d.titulo }), el('small', { text: lbl })),
            el('span', { class: 'dl', text: 'Abrir ↗' }));
        }))));
    });
    observeReveals();
  }

  /* ---------------- Formularios ---------------- */
  function setStatus(node, msg, kind) { node.textContent = msg; node.className = 'status' + (kind ? ' ' + kind : ''); }

  function wireForm(form, statusNode, table, build) {
    form.addEventListener('submit', async (ev) => {
      ev.preventDefault();
      const fd = new FormData(form);
      if (fd.get('website')) return; // honeypot: los bots lo llenan
      if (!form.checkValidity()) { form.reportValidity(); return; }
      if (!sb) { setStatus(statusNode, 'El formulario estará activo cuando se conecte Supabase (js/config.js).', 'err'); return; }
      const last = Number(localStorage.getItem('envio-' + table) || 0);
      if (Date.now() - last < 30000) { setStatus(statusNode, 'Espera unos segundos antes de enviar de nuevo.', 'err'); return; }
      const btn = form.querySelector('button[type=submit]');
      btn.disabled = true; setStatus(statusNode, 'Enviando…');
      const { error } = await sb.from(table).insert(build(fd)); // sin .select(): el público no puede leer estas tablas
      btn.disabled = false;
      if (error) { setStatus(statusNode, 'No pudimos enviar tu mensaje. Inténtalo de nuevo o escríbenos a ' + C.email + '.', 'err'); return; }
      try { localStorage.setItem('envio-' + table, String(Date.now())); } catch (_) { /* ignorar */ }
      form.reset();
      setStatus(statusNode, '¡Gracias! Recibimos tu mensaje y te contactaremos pronto.', 'ok');
    });
  }
  const val = (fd, k) => (String(fd.get(k) || '').trim() || null);

  wireForm($('#form-voluntario'), $('#vol-estado'), 'voluntarios', (fd) => ({
    nombre: val(fd, 'nombre'), correo: val(fd, 'correo'), telefono: val(fd, 'telefono'),
    comite: val(fd, 'comite'), mensaje: val(fd, 'mensaje'), consentimiento: true
  }));
  wireForm($('#form-contacto'), $('#con-estado'), 'contactos', (fd) => ({
    nombre: val(fd, 'nombre'), correo: val(fd, 'correo'), asunto: val(fd, 'asunto'), mensaje: val(fd, 'mensaje'), consentimiento: true
  }));

  /* ---------------- Arranque ---------------- */
  /* ---------------- Secciones nuevas ---------------- */
  const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.classList.contains('paused');

  // Impacto: cifras que cuentan hacia arriba al aparecer
  C.impacto.forEach((st) => {
    const n = st.auto ? C.comites.length : st.n;
    $('#impacto-grid').append(el('div', { class: 'stat reveal' },
      el('b', { 'data-n': n, 'data-pre': st.pre || '', 'data-suf': st.suf || '', text: (st.pre || '') + n + (st.suf || '') }),
      el('span', { text: st.label })));
  });
  const counter = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (!en.isIntersecting) return;
    counter.unobserve(en.target);
    const node = en.target, n = Number(node.dataset.n), pre = node.dataset.pre, suf = node.dataset.suf;
    if (reduceMotion()) return;
    const t0 = performance.now(), dur = 1400;
    const step = (t) => {
      const p = Math.min(1, (t - t0) / dur), v = Math.round(n * (1 - Math.pow(1 - p, 3)));
      node.textContent = pre + v + suf;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }), { threshold: .5 });
  document.querySelectorAll('#impacto-grid b').forEach((b) => counter.observe(b));

  // Historia
  C.historia.forEach((h) => $('#historia-lista').append(el('li', { class: 'tl-item reveal' },
    el('span', { class: 'tl-year', text: h.anio }),
    el('div', { class: 'tl-body' }, el('h3', { text: h.titulo }), el('p', { text: h.texto })))));

  // Transparencia: pasos
  C.pasos.forEach((p, i) => $('#pasos-lista').append(el('li', { class: 'step reveal' },
    el('span', { class: 'step-n', 'aria-hidden': 'true', text: String(i + 1) }),
    el('h3', { text: p.t }), el('p', { text: p.d }))));

  // Cómo donar
  C.donar.forEach((d) => $('#donar-grid').append(el('div', { class: 'don-card reveal' },
    el('span', { class: 'don-ico', 'aria-hidden': 'true', text: d.ico }), el('h3', { text: d.t }), el('p', { text: d.d }))));
  $('#donar-aviso').textContent = '🔒 ' + C.donarAviso;

  // Menú desplegable (teclado, toque y mouse)
  document.querySelectorAll('.has-sub').forEach((g) => {
    g.querySelector('.sub-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      const open = g.classList.toggle('open');
      e.currentTarget.setAttribute('aria-expanded', String(open));
    });
  });
  document.addEventListener('click', () => document.querySelectorAll('.has-sub.open').forEach((g) => g.classList.remove('open')));

  // Botón flotante "Donar" tras pasar la portada
  const floatBtn = $('#donar-flotante');
  const onScroll = () => floatBtn.classList.toggle('show', window.scrollY > 520);
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  observeReveals();
  cargarDocs();
})();
