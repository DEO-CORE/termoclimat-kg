(function () {
  const WA = '996555660276';

  /* mobile menu */
  const burger = document.querySelector('.burger');
  if (burger) burger.addEventListener('click', () => {
    const open = document.body.classList.toggle('menu-open');
    burger.setAttribute('aria-expanded', open);
  });
  document.querySelectorAll('.mobile-menu a').forEach(a =>
    a.addEventListener('click', () => document.body.classList.remove('menu-open')));

  /* arc carousel (hero) */
  const arc = document.querySelector('.arc');
  if (arc) {
    const cards = Array.from(arc.querySelectorAll('.arc-card'));
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W, gap, total, offset = 0, last = performance.now(), paused = false;
    const measure = () => {
      W = arc.clientWidth;
      const cw = W < 600 ? 112 : 150;
      cards.forEach(c => { c.style.width = cw + 'px'; c.style.height = cw * 1.27 + 'px'; c.style.marginLeft = -cw / 2 + 'px'; });
      gap = cw + (W < 600 ? 10 : 14);
      total = gap * cards.length;
    };
    const frame = now => {
      const dt = Math.min(now - last, 50); last = now;
      if (!paused && !reduce) offset = (offset + dt * 0.035) % total;
      const half = W / 2, curve = W < 600 ? 0.0011 : 0.00042;
      cards.forEach((c, i) => {
        let x = ((i * gap - offset) % total + total) % total - total / 2;
        const y = curve * x * x;
        const rot = Math.atan(2 * curve * x) * 180 / Math.PI;
        const vis = Math.abs(x) < half + gap;
        c.style.transform = `translate3d(${x}px,${y}px,0) rotate(${rot}deg)`;
        c.style.visibility = vis ? 'visible' : 'hidden';
      });
      requestAnimationFrame(frame);
    };
    measure(); addEventListener('resize', measure);
    arc.addEventListener('mouseenter', () => paused = true);
    arc.addEventListener('mouseleave', () => paused = false);
    requestAnimationFrame(frame);
  }

  /* tabs */
  document.querySelectorAll('[data-tabs]').forEach(root => {
    const tabs = root.querySelectorAll('.tab');
    const panels = root.querySelectorAll('.tab-panel');
    tabs.forEach((t, i) => t.addEventListener('click', () => {
      tabs.forEach(x => x.classList.toggle('on', x === t));
      panels.forEach((p, j) => p.classList.toggle('on', j === i));
    }));
  });

  /* project filters */
  const filters = document.querySelector('[data-filters]');
  if (filters) {
    const btns = filters.querySelectorAll('.tab');
    const items = document.querySelectorAll('[data-cat]');
    btns.forEach(b => b.addEventListener('click', () => {
      btns.forEach(x => x.classList.toggle('on', x === b));
      const f = b.dataset.f;
      items.forEach(it => { it.style.display = (f === 'all' || it.dataset.cat.includes(f)) ? '' : 'none'; });
    }));
  }

  /* hero ask -> contacts with prefilled task */
  document.querySelectorAll('form.ask').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    const q = f.querySelector('input').value.trim();
    location.href = 'contacts.html' + (q ? '?q=' + encodeURIComponent(q) + '#form' : '#form');
  }));
  const q = new URLSearchParams(location.search).get('q');
  const ta = document.querySelector('#form textarea');
  if (q && ta) ta.value = q;

  /* lead form -> WhatsApp message */
  document.querySelectorAll('form.lead').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(f);
    const lines = ['Здравствуйте! Заявка с сайта TermoClimat.',
      'Имя: ' + (d.get('name') || ''), 'Телефон: ' + (d.get('phone') || ''),
      'Направление: ' + (d.get('type') || ''), 'Объект: ' + (d.get('object') || ''),
      'Задача: ' + (d.get('msg') || '')];
    window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(lines.join('\n')), '_blank');
    const ok = f.querySelector('.form-ok'); if (ok) ok.style.display = 'block';
  }));

  /* reveal on scroll */
  const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px -8% 0px' }) : null;
  document.querySelectorAll('.reveal').forEach(el => io ? io.observe(el) : el.classList.add('in'));

  const y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
})();
