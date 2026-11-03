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
  $('#stat-comites').textContent = C.comites.length;
  $('#teleton-link').href = safeUrl(C.teletonUrl);
  const mail = $('#mail-link'); mail.href = 'mailto:' + C.email; mail.textContent = C.email;

  // Ticker con nombres de comités (se duplica para el bucle infinito)
  const track = $('#ticker-track');
  [...C.comites, ...C.comites].forEach((c) => track.append(el('span', { text: c.nombre })));

  // Redes sociales
  const socialNames = { instagram: 'Instagram', facebook: 'Facebook', x: 'X', youtube: 'YouTube', tiktok: 'TikTok' };
  Object.entries(C.redes).filter(([, u]) => u).forEach(([k, u]) => {
    $('#socials').append(el('a', { href: safeUrl(u), target: '_blank', rel: 'noopener', text: socialNames[k] || k }));
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

  /* ---------------- Eventos (Supabase) ---------------- */
  const tipoLabel = { club: 'Club', teleton: 'Teletón', fundacion: 'Fundación', firma: 'Firma' };
  const meses = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
  let eventos = [];
  let filtroEvento = 'todos';

  function demoEvents() {
    const d = (days) => new Date(Date.now() + days * 864e5).toISOString();
    return [
      { id: 'demo1', titulo: 'Evento de ejemplo: Colecta comunitaria', descripcion: 'Así se verá un evento publicado. Conecta Supabase para mostrar los eventos reales del Club.', tipo: 'club', fecha: d(14), lugar: 'Ciudad de Panamá', voluntarios_abiertos: true, demo: true },
      { id: 'demo2', titulo: 'Evento de ejemplo: Lanzamiento Teletón', descripcion: 'Los eventos de la Teletón y la Fundación aparecen aquí con su propia etiqueta.', tipo: 'teleton', fecha: d(35), lugar: 'Por confirmar', voluntarios_abiertos: false, demo: true }
    ];
  }

  function renderEventos() {
    const list = $('#eventos-lista');
    list.replaceChildren();
    const rows = eventos.filter((e) => filtroEvento === 'todos' ? true : filtroEvento === 'voluntariado' ? e.voluntarios_abiertos : e.tipo === filtroEvento);
    if (!rows.length) { list.append(el('div', { class: 'empty', text: 'No hay eventos en esta categoría por ahora. ¡Vuelve pronto!' })); return; }
    rows.forEach((e) => {
      const f = new Date(e.fecha);
      const hora = f.toLocaleTimeString('es-PA', { hour: 'numeric', minute: '2-digit' });
      const actions = el('div', { class: 'actions' });
      if (e.voluntarios_abiertos) {
        const b = el('button', { class: 'btn btn-red btn-sm', type: 'button', text: 'Postularme' });
        b.addEventListener('click', () => { $('#vol-evento').value = e.id; location.hash = '#voluntariado'; setTimeout(() => $('#vol-nombre').focus({ preventScroll: true }), 600); });
        actions.append(b);
      }
      list.append(el('article', { class: 'event reveal' },
        el('div', { class: 'date-badge', 'aria-label': f.toLocaleDateString('es-PA', { dateStyle: 'long' }) },
          el('b', { text: String(f.getDate()) }), el('span', { text: meses[f.getMonth()] })),
        el('div', {},
          el('span', { class: 'pill ' + e.tipo, text: tipoLabel[e.tipo] || e.tipo }),
          e.voluntarios_abiertos ? [' ', el('span', { class: 'pill vol', text: 'Buscamos voluntarios' })] : null,
          e.demo ? [' ', el('span', { class: 'pill demo', text: 'Ejemplo' })] : null,
          el('h3', { text: e.titulo }),
          e.descripcion ? el('p', { text: e.descripcion }) : null,
          el('div', { class: 'meta' }, el('span', { text: '🕒 ' + hora }), e.lugar ? el('span', { text: '📍 ' + e.lugar }) : null)),
        actions));
    });
    observeReveals();
  }

  async function cargarEventos() {
    const estado = $('#eventos-estado');
    if (!sb) { eventos = demoEvents(); estado.textContent = 'Modo demo: conecta Supabase en js/config.js para ver los eventos reales.'; }
    else {
      const { data, error } = await sb.from('eventos').select('*').gte('fecha', new Date(Date.now() - 864e5).toISOString()).order('fecha', { ascending: true });
      if (error) { estado.textContent = 'No pudimos cargar los eventos en este momento.'; estado.className = 'status err'; eventos = []; }
      else eventos = data;
    }
    const volEv = $('#vol-evento');
    eventos.filter((e) => e.voluntarios_abiertos && !e.demo).forEach((e) => {
      const f = new Date(e.fecha).toLocaleDateString('es-PA', { day: 'numeric', month: 'short' });
      volEv.append(el('option', { value: e.id, text: `${e.titulo} (${f})` }));
    });
    makeChips($('#eventos-filtros'), [['todos', 'Todos'], ['club', 'Club'], ['teleton', 'Teletón'], ['fundacion', 'Fundación'], ['firma', 'Firmas'], ['voluntariado', 'Buscan voluntarios']], (v) => { filtroEvento = v; renderEventos(); });
    renderEventos();
  }

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
    evento_id: val(fd, 'evento_id'), comite: val(fd, 'comite'), mensaje: val(fd, 'mensaje'), consentimiento: true
  }));
  wireForm($('#form-contacto'), $('#con-estado'), 'contactos', (fd) => ({
    nombre: val(fd, 'nombre'), correo: val(fd, 'correo'), asunto: val(fd, 'asunto'), mensaje: val(fd, 'mensaje'), consentimiento: true
  }));

  /* ---------------- Arranque ---------------- */
  observeReveals();
  cargarEventos();
  cargarDocs();
})();
