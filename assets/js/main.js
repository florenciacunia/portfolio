(() => {
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const base = slug => `assets/proyectos/${slug}/`;

/* Busca una imagen en .jpg y si no existe en .png. Devuelve la ruta o null. */
function findImg(path){
  return new Promise(res => {
    const exts = ['.jpg','.png','.jpeg','.webp']; let i = 0;
    const tryNext = () => {
      if (i >= exts.length) return res(null);
      const src = path + exts[i++], im = new Image();
      im.onload = () => res(src); im.onerror = tryNext; im.src = src;
    };
    tryNext();
  });
}
const coverCache = {};
const getCover = p => coverCache[p.slug] || (coverCache[p.slug] = findImg(base(p.slug)+'portada').then(s => s || findImg(base(p.slug)+'captura-1')));

/* ---------------- Loader ---------------- */
function splitChars(el, delayStart=0, step=.035){
  const words = el.textContent.split(' '); el.textContent = ''; let i = 0;
  words.forEach((w,wi) => {
    const word = document.createElement('span');
    word.style.whiteSpace = 'nowrap'; word.style.display = 'inline-block';
    [...w].forEach(c => {
      const s = document.createElement('span');
      s.className = 'ch'; s.textContent = c;
      s.style.transitionDelay = (delayStart + (i++)*step)+'s';
      word.appendChild(s);
    });
    el.appendChild(word);
    if (wi < words.length-1){ el.appendChild(document.createTextNode(' ')); i++; }
  });
}
const word = $('#loader-word');
[...word.textContent].forEach((c,i) => { const s=document.createElement('span'); s.textContent=c; s.style.animationDelay=(.1+i*.06)+'s'; if(!i) word.textContent=''; word.appendChild(s); });
$$('.hero__name .split').forEach((el,k) => splitChars(el, .15 + k*.18, .03));

function finishLoading(){
  $('#loader').classList.add('is-out');
  setTimeout(() => { document.body.classList.remove('is-loading'); document.body.classList.add('is-ready'); runCounters($('.hero')); }, 450);
  setTimeout(() => $('#loader').remove(), 1500);
}
if (reduce){ finishLoading(); }
else {
  let pct = 0, loaded = false; const t0 = performance.now();
  addEventListener('load', () => loaded = true);
  setTimeout(() => loaded = true, 4000);
  (function tick(){
    const t = performance.now() - t0;
    const target = loaded ? 100 : Math.min(90, t/18);
    pct += (target - pct) * .08; if (target === 100 && pct > 99.4) pct = 100;
    $('#loader-count').textContent = Math.round(pct);
    $('#loader-bar').style.width = pct+'%';
    if (pct < 100 || t < 1700) requestAnimationFrame(tick); else setTimeout(finishLoading, 200);
  })();
}

/* ---------------- Contadores ---------------- */
function runCounters(root){
  $$('[data-count]', root).forEach(el => {
    if (el.dataset.done) return; el.dataset.done = 1;
    const end = +el.dataset.count, t0 = performance.now(), dur = 1500;
    (function f(t){ const k = Math.min(1,(t-t0)/dur); el.textContent = Math.round(end*(1-Math.pow(1-k,4))); if (k<1) requestAnimationFrame(f); })(t0);
  });
}

/* ---------------- Nav ---------------- */
let lastY = 0;
addEventListener('scroll', () => {
  const y = scrollY, nav = $('#nav');
  nav.classList.toggle('is-solid', y > 40);
  nav.classList.toggle('is-hidden', y > lastY && y > 400);
  lastY = y;
}, {passive:true});
const spy = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) $$('.nav__links a').forEach(a => a.classList.toggle('is-on', a.getAttribute('href') === '#'+e.target.id));
}), {rootMargin:'-45% 0px -50% 0px'});
$$('main > section[id]').forEach(s => spy.observe(s));

/* Títulos de sección que suben al entrar */
const titleIO = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting){ e.target.classList.add('is-in'); titleIO.unobserve(e.target); } }), {threshold:.4});
$$('.reveal-title').forEach(t => titleIO.observe(t));

/* ---------------- 1. Tareas ---------------- */
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
let freq = 'ALL';
function renderTasks(){
  const q = $('#task-search').value.trim().toLowerCase();
  const list = TASKS.filter(t => (freq==='ALL' || t.freq===freq) && (t.title+' '+t.systems+' '+t.desc).toLowerCase().includes(q));
  $('#tasks').innerHTML = list.length ? list.map((t,i) => `
    <div class="task">
      <button class="task__row" aria-expanded="false" aria-controls="tk${i}">
        <span class="task__title">${esc(t.title)}</span>
        <span class="freq freq--${t.freq}">${t.freq}</span>
        <span class="task__meta">${esc(t.time)}</span>
        <span class="task__meta">${esc(t.systems)}</span>
        <span class="plus" aria-hidden="true"></span>
      </button>
      <div class="task__more" id="tk${i}"><div>
        <div class="task__detail">
          <div><p>${esc(t.desc)}</p><p class="status">Estado: <b>${esc(t.status)}</b></p></div>
          <div><ol class="steps">${t.steps.map(s => `<li>${esc(s)}</li>`).join('')}</ol></div>
        </div>
      </div></div>
    </div>`).join('') : `<p class="empty">Ninguna tarea coincide con la búsqueda. Probá con otro nombre o sistema.</p>`;
}
$('#tasks').addEventListener('click', e => {
  const b = e.target.closest('.task__row'); if (!b) return;
  const t = b.parentElement, open = !t.classList.contains('is-open');
  t.classList.toggle('is-open', open); b.setAttribute('aria-expanded', open);
});
$('#task-search').addEventListener('input', renderTasks);
$$('#freq-pills .pill').forEach(p => p.addEventListener('click', () => {
  freq = p.dataset.f; $$('#freq-pills .pill').forEach(x => x.classList.toggle('is-on', x===p)); renderTasks();
}));
const cnt = f => TASKS.filter(t => t.freq===f).length;
$('#c-all').textContent = TASKS.length; $('#c-d').textContent = cnt('Diaria'); $('#c-s').textContent = cnt('Semanal'); $('#c-m').textContent = cnt('Mensual');
renderTasks();

/* ---------------- 2. Diagnóstico ---------------- */
$$('#diag-nav button').forEach(b => b.addEventListener('click', () => {
  $$('#diag-nav button').forEach(x => x.classList.toggle('is-on', x===b));
  $$('.diag__panel').forEach(p => p.classList.toggle('is-on', p.id===b.dataset.d));
}));

/* ---------------- 3. Proyectos ---------------- */
const arrow = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;
const fallbackCover = p => `<div class="cover-fallback">${esc(p.title)}</div>`;
$('#projects').innerHTML = PROJECTS.map((p,i) => `
  <li class="project">
    <button class="project__btn" data-i="${i}">
      <span class="project__title"><span class="project__area">${esc(p.area)}</span>${esc(p.title)}</span>
      <span class="project__impact">${esc(p.impact)}
        <span class="state"><span class="meter"><span data-w="${p.progress}"></span></span>${esc(p.status)}</span>
      </span>
      <span class="project__go" aria-hidden="true">${arrow}</span>
      <span class="project__thumb" data-thumb="${i}">${fallbackCover(p)}</span>
    </button>
  </li>`).join('');
PROJECTS.forEach((p,i) => getCover(p).then(src => { if (src) $(`[data-thumb="${i}"]`).innerHTML = `<img src="${src}" alt="" loading="lazy">`; }));
const meterIO = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting){ $$('[data-w]', e.target).forEach(s => s.style.width = s.dataset.w+'%'); meterIO.unobserve(e.target); } }), {threshold:.3});
$$('.project').forEach(li => meterIO.observe(li));
$('#projects').addEventListener('click', e => { const b = e.target.closest('.project__btn'); if (b) openCase(+b.dataset.i); });

/* Imagen flotante que sigue al mouse */
const peek = $('#peek'); let px = 0, py = 0, tx = 0, ty = 0, peekOn = false;
addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });
(function loop(){ px += (tx-px)*.14; py += (ty-py)*.14; peek.style.left = px+'px'; peek.style.top = py+'px'; requestAnimationFrame(loop); })();
$$('.project__btn').forEach(b => {
  b.addEventListener('mouseenter', () => {
    const p = PROJECTS[+b.dataset.i]; peekOn = true;
    $('#peek-inner').innerHTML = fallbackCover(p);
    getCover(p).then(src => { if (src && peekOn) $('#peek-inner').innerHTML = `<img src="${src}" alt="">`; });
    peek.classList.add('is-on');
  });
  b.addEventListener('mouseleave', () => { peekOn = false; peek.classList.remove('is-on'); });
});

/* ---------------- Cursograma (SVG) ---------------- */
function wrap(t, max){ const w = t.split(' '), out = []; let c = ''; w.forEach(x => { if ((c+' '+x).trim().length > max && c){ out.push(c); c = x; } else c = (c+' '+x).trim(); }); if (c) out.push(c); return out; }
function cursogramaSVG(cg){
  const colW = 260, rowH = 108, head = 58, W = colW*cg.sectors.length, H = head + rowH*cg.steps.length + 24;
  const ink = '#0D1B2A', blue = '#1E3FCC';
  const hh = {start:38, end:38, op:58, doc:68};
  const pos = cg.steps.map((s,i) => ({x: colW*s.s + colW/2, y: head + rowH*i + rowH/2}));
  let svg = `<svg viewBox="0 0 ${W} ${H}" width="100%" style="min-width:${W}px;max-width:${Math.round(W*1.35)}px;margin:0 auto" xmlns="http://www.w3.org/2000/svg" font-family="Bricolage Grotesque, system-ui, sans-serif">
    <defs><marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="${ink}"/></marker></defs>`;
  cg.sectors.forEach((s,i) => {
    svg += `<rect x="${i*colW}" y="0" width="${colW}" height="${H}" fill="${i%2 ? '#F7F8FA' : '#FFFFFF'}"/>
      <text x="${i*colW + colW/2}" y="32" text-anchor="middle" font-size="15" font-weight="700" fill="${ink}">${esc(s)}</text>
      ${i ? `<line x1="${i*colW}" y1="0" x2="${i*colW}" y2="${H}" stroke="${ink}" stroke-opacity=".14"/>` : ''}`;
  });
  svg += `<line x1="0" y1="${head-6}" x2="${W}" y2="${head-6}" stroke="${ink}" stroke-width="1.2"/>`;
  for (let i=1;i<cg.steps.length;i++){
    const a = pos[i-1], b = pos[i], ya = a.y + hh[cg.steps[i-1].t]/2 - (cg.steps[i-1].t==='doc'?8:0), yb = b.y - hh[cg.steps[i].t]/2 - 2;
    const d = a.x === b.x ? `M${a.x} ${ya} V${yb}` : `M${a.x} ${ya} V${(ya+yb)/2} H${b.x} V${yb}`;
    svg += `<path class="cg-line" d="${d}" fill="none" stroke="${ink}" stroke-width="1.6" marker-end="url(#arr)" style="transition-delay:${i*.16}s"/>`;
  }
  cg.steps.forEach((s,i) => {
    const {x,y} = pos[i], h = hh[s.t], w = 200, lines = wrap(s.text, 25), fs = 13;
    let shape;
    if (s.t==='start'||s.t==='end') shape = `<rect x="${x-62}" y="${y-h/2}" width="124" height="${h}" rx="${h/2}" fill="#E3E8FB" stroke="${blue}" stroke-width="1.6"/>`;
    else if (s.t==='doc') shape = `<path d="M${x-w/2} ${y-h/2} H${x+w/2} V${y+h/2-12} Q${x+w/4} ${y+h/2-26} ${x} ${y+h/2-12} T${x-w/2} ${y+h/2-12} Z" fill="#fff" stroke="${ink}" stroke-width="1.6"/>`;
    else shape = `<rect x="${x-w/2}" y="${y-h/2}" width="${w}" height="${h}" rx="3" fill="#fff" stroke="${ink}" stroke-width="1.6"/>`;
    const cy = (s.t==='doc' ? y-8 : y) - (lines.length-1)*fs*.6 + 4.5;
    svg += `<g class="cg-node" style="transition-delay:${i*.16}s">${shape}<text text-anchor="middle" font-size="${fs}" font-weight="${s.t==='op'||s.t==='doc'?500:700}" fill="${ink}">${lines.map((l,k)=>`<tspan x="${x}" y="${cy + k*fs*1.25}">${esc(l)}</tspan>`).join('')}</text></g>`;
  });
  return svg + '</svg>';
}

/* ---------------- Caso de proyecto ---------------- */
let current = 0;
const caseEl = $('#case');
function caseHTML(p, i){
  const next = PROJECTS[(i+1) % PROJECTS.length];
  const link = p.url
    ? `<a class="btn btn--main" href="${p.url}" target="_blank" rel="noopener">${esc(p.urlLabel)} ${arrow.replace('<svg','<svg width="16" height="16"')}</a>`
    : `<span class="btn btn--off">${esc(p.urlLabel)}: link próximamente</span>`;
  const metrics = p.metrics ? `
    <section class="block">
      <h3 class="block__title">Lote de 500 actas: manual contra plataforma</h3>
      <div class="compare">${p.metrics.map(r => {
        const max = r.pct ? 100 : 41.6; const wm = r.m/max*100, wp = Math.max(1.2, r.p/max*100);
        return `<div class="compare__row"><b>${esc(r.label)}</b><div class="bars">
          <div><span>Manual</span><div class="track"><div class="fill fill--manual" data-w="${wm}"></div></div><span class="val">${esc(r.manual)}</span></div>
          <div><span>Plataforma</span><div class="track"><div class="fill fill--plat" data-w="${wp}"></div></div><span class="val val--plat">${esc(r.plat)}</span></div>
        </div></div>`; }).join('')}</div>
      <div class="compare__total"><b>100 h</b><span>de trabajo manual eliminadas en cada lote de 500 actas</span></div>
    </section>` : '';
  const video = p.video ? `
    <section class="block" id="video-block">
      <h3 class="block__title">Cómo funciona, en minutos</h3>
      <div class="video"><video controls playsinline preload="metadata" poster="${base(p.slug)}video-portada.jpg">
        <source src="${base(p.slug)}video.mp4" type="video/mp4" onerror="var s=this.closest('section'); if(s) s.remove()"></video></div>
    </section>` : '';
  return `
    <header class="case__head">
      <div>
        <p class="case__area">${esc(p.area)}</p>
        <h2 class="case__title" id="case-title">${esc(p.title)}</h2>
        <p class="case__summary">${esc(p.summary)}</p>
        <div class="stack">${p.stack.map(s => `<span>${esc(s)}</span>`).join('')}</div>
      </div>
      <div>
        <div class="case__impact"><small>Impacto</small><p>${esc(p.impact)}</p></div>
        <div class="case__state"><span class="meter"><span data-w="${p.progress}"></span></span>${esc(p.status)}</div>
        ${link}
      </div>
    </header>
    ${video}
    ${metrics}
    <section class="block" id="diagram-block" hidden></section>
    <section class="block" id="gallery-block" hidden>
      <h3 class="block__title">Capturas</h3>
      <div class="gallery" id="gallery"></div>
    </section>
    <button class="case__next" data-next="${(i+1) % PROJECTS.length}"><small>Siguiente proyecto</small><span>${esc(next.title)}</span></button>`;
}
function animateIn(root){
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    $$('[data-w]', e.target).forEach(s => s.style.width = s.dataset.w+'%');
    if (e.target.matches('.flow,.cg')) e.target.classList.add('is-in');
    io.unobserve(e.target);
  }), {root:$('#case-scroll'), threshold:.25});
  $$('.case__state, .compare__row, .flow, .cg', root).forEach(el => io.observe(el));
}
async function fillMedia(p, body, token){
  // Cursograma: imagen propia > cursograma dibujado > flujo simple
  const cgImg = await findImg(base(p.slug)+'cursograma');
  if (token !== openToken) return;
  const db = $('#diagram-block', body);
  let inner = '';
  if (cgImg) inner = `<div class="cg-img" data-zoom="${cgImg}"><img src="${cgImg}" alt="Cursograma de ${esc(p.title)}"></div>`;
  else if (p.cursograma) inner = `<div class="cg">${cursogramaSVG(p.cursograma)}</div>
      <div class="legend"><span><i class="lg"></i>Operación</span><span><i class="lg lg-doc"></i>Documento</span><span><i class="lg lg-start"></i>Inicio y fin</span></div>`;
  else if (p.flow) inner = `<ol class="flow">${p.flow.map(s => `<li>${esc(s)}</li>`).join('')}</ol>`;
  if (inner){
    db.innerHTML = `<h3 class="block__title">${p.flow && !cgImg && !p.cursograma ? 'Cómo fluye el proceso' : 'Cursograma'}</h3>${inner}`;
    db.hidden = false;
    $$('.flow li', db).forEach((li,k) => { li.style.transitionDelay = (k*.12)+'s'; const after = li; after.style.setProperty('--d', k); });
  }
  // Video: si no existe el archivo, se oculta el bloque
  const vb = $('#video-block', body);
  if (vb){
    const v = $('video', vb), src = $('source', vb);
    src.addEventListener('error', () => vb.remove());
    v.addEventListener('error', () => vb.remove());
    setTimeout(() => { if (v.isConnected && v.networkState === 3) vb.remove(); }, 1500);
  }
  // Galería: captura-1, captura-2, ...
  const found = await Promise.all(p.shots.map((cap,k) => findImg(base(p.slug)+'captura-'+(k+1)).then(src => src && {src, cap})));
  if (token !== openToken) return;
  const shots = found.filter(Boolean);
  if (shots.length){
    $('#gallery', body).innerHTML = shots.map(s => `<figure data-zoom="${s.src}"><div class="frame"><img src="${s.src}" alt="${esc(s.cap)}" loading="lazy"></div><figcaption>${esc(s.cap)}</figcaption></figure>`).join('');
    $('#gallery-block', body).hidden = false;
  }
  animateIn(body);
}
let openToken = 0, lastFocus = null;
function openCase(i){
  current = (i + PROJECTS.length) % PROJECTS.length;
  const p = PROJECTS[current], body = $('#case-body');
  const token = ++openToken;
  if (caseEl.hidden) lastFocus = document.activeElement;
  body.innerHTML = caseHTML(p, current);
  $('#case-pos').textContent = `Proyecto ${current+1} de ${PROJECTS.length}`;
  $('#case-scroll').scrollTop = 0;
  const wasOpen = !caseEl.hidden && caseEl.classList.contains('is-open');
  caseEl.hidden = false; document.body.classList.add('is-locked'); peek.classList.remove('is-on');
  if (wasOpen){ caseEl.classList.remove('is-open'); void caseEl.offsetWidth; }
  requestAnimationFrame(() => requestAnimationFrame(() => caseEl.classList.add('is-open')));
  $('#case-close').focus({preventScroll:true});
  fillMedia(p, body, token);
}
function closeCase(){
  caseEl.classList.remove('is-open'); document.body.classList.remove('is-locked');
  $$('video', caseEl).forEach(v => v.pause());
  setTimeout(() => { if (!caseEl.classList.contains('is-open')) caseEl.hidden = true; }, 900);
  if (lastFocus) lastFocus.focus({preventScroll:true});
}
$('#case-close').addEventListener('click', closeCase);
$('#case-prev').addEventListener('click', () => openCase(current-1));
$('#case-next').addEventListener('click', () => openCase(current+1));
caseEl.addEventListener('click', e => {
  const n = e.target.closest('[data-next]'); if (n) return openCase(+n.dataset.next);
  const z = e.target.closest('[data-zoom]'); if (z){ $('#lightbox-img').src = z.dataset.zoom; $('#lightbox').hidden = false; }
});
$('#lightbox').addEventListener('click', () => $('#lightbox').hidden = true);
addEventListener('keydown', e => {
  if (!$('#lightbox').hidden){ if (e.key==='Escape') $('#lightbox').hidden = true; return; }
  if (caseEl.hidden) return;
  if (e.key==='Escape') closeCase();
  if (e.key==='ArrowRight' && !(e.target.tagName==='VIDEO')) openCase(current+1);
  if (e.key==='ArrowLeft' && !(e.target.tagName==='VIDEO')) openCase(current-1);
});
})();
