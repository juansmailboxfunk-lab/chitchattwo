(() => {
  // Mobile nav
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector("#navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  // Reveal: logo is always visible; characters slide in when hero art enters viewport.
  const art = document.querySelector("[data-hero-reveal]");
  if (!art) return;

  const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced) {
    art.classList.add("is-visible");
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        art.classList.add("is-visible");
        io.disconnect();
      }
    });
  }, { threshold: 0.35 });

  io.observe(art);
})();
