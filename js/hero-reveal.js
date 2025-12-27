/**
 * Hero staged reveal:
 * - Logo is visible immediately
 * - Characters slide in when hero scrolls into view
 */
(function () {
  const hero = document.getElementById("hero");
  if (!hero) return;

  const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) {
    hero.classList.add("is-revealed");
    return;
  }

  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        hero.classList.add("is-revealed");
        io.disconnect();
        break;
      }
    }
  }, { threshold: 0.35 });

  io.observe(hero);
})();