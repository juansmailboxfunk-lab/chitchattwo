// Chit Chat — interactions (mobile nav + service overlay)
(function(){
  const qs = (s, el=document) => el.querySelector(s);
  const qsa = (s, el=document) => Array.from(el.querySelectorAll(s));

  // Year
  const yearEl = qs('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav
  const navToggle = qs('#navToggle');
  const navMobile = qs('#navMobile');
  if (navToggle && navMobile){
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      navMobile.hidden = isOpen;
    });
    qsa('a', navMobile).forEach(a => a.addEventListener('click', () => {
      navMobile.hidden = true;
      navToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  // Overlay
  const overlay = qs('#serviceOverlay');
  const overlayTitle = qs('#overlayTitle');
  const overlaySubtitle = qs('#overlaySubtitle');
  const overlayContent = qs('#overlayContent');
  const overlayCroc = qs('#overlayCroc');
  const overlayTag = qs('#overlayTag');

  function openOverlay(btn){
    if (!overlay) return;
    const title = btn.getAttribute('data-title') || '';
    const subtitle = btn.getAttribute('data-subtitle') || '';
    const html = btn.getAttribute('data-content') || '';
    const theme = btn.getAttribute('data-theme') || '';
    const croc = btn.getAttribute('data-croc') || '';

    overlay.dataset.theme = theme;
    if (overlayTitle) overlayTitle.textContent = title;
    if (overlaySubtitle) overlaySubtitle.textContent = subtitle;
    if (overlayContent) overlayContent.innerHTML = html;
    if (overlayCroc && croc) overlayCroc.src = croc;
    if (overlayTag) overlayTag.textContent = 'Servicio';

    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');

    // focus management
    const closeBtn = qs('[data-close]', overlay);
    if (closeBtn) closeBtn.focus();

    document.body.style.overflow = 'hidden';
  }

  function closeOverlay(){
    if (!overlay) return;
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  qsa('.js-more').forEach(btn => btn.addEventListener('click', () => openOverlay(btn)));

  if (overlay){
    qsa('[data-close]', overlay).forEach(el => el.addEventListener('click', closeOverlay));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeOverlay();
    });
    // click outside panel
    overlay.addEventListener('click', (e) => {
      if (e.target && e.target.matches('.overlay__backdrop')) closeOverlay();
    });
  }

  // Contact form demo (no backend): show toast-like alert
  const contactForm = qs('#contactForm');
  if (contactForm){
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Mensaje enviado (demo). Conecta Formspree o tu backend para enviar de verdad.');
      contactForm.reset();
    });
  }
})();