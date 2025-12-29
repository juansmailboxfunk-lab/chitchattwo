(() => {
  const stage = document.getElementById("lockupStage");
  const tagline = document.getElementById("lockupTagline");
  if (!stage || !tagline) return;

  // Respect reduced motion
  const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) {
    stage.classList.add("is-animated");
    tagline.classList.add("is-animated");
    return;
  }

  // Start animation shortly after first paint
  window.requestAnimationFrame(() => {
    // 0.5s delay before the first slide-in (woman)
    setTimeout(() => {
      stage.classList.add("is-animated");
      tagline.classList.add("is-animated");
    }, 500);
  });
})();
