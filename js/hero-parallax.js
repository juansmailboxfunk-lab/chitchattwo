
(() => {
  const scene = document.querySelector(".hero-scene");
  if (!scene) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  const layers = {
    bg: scene.querySelector(".hero-bg"),
    glow: scene.querySelector(".hero-glow"),
    mist: scene.querySelector(".hero-mist"),
    sparkles: scene.querySelector(".hero-sparkles"),
    chars: scene.querySelector(".hero-characters"),
  };

  const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

  let raf = null;
  let targetX = 0, targetY = 0;
  let curX = 0, curY = 0;

  function apply() {
    raf = null;
    curX += (targetX - curX) * 0.10;
    curY += (targetY - curY) * 0.10;

    const x = curX, y = curY;

    if (layers.bg) layers.bg.style.transform =
      `translate3d(${x * 0.10}px, ${y * 0.10}px, 0) scale(1.03)`;
    if (layers.glow) layers.glow.style.transform =
      `translate3d(${x * 0.12}px, ${y * 0.12}px, 0)`;
    if (layers.mist) layers.mist.style.transform =
      `translate3d(${x * 0.18}px, ${y * 0.18}px, 0)`;
    if (layers.sparkles) layers.sparkles.style.transform =
      `translate3d(${x * 0.35}px, ${y * 0.35}px, 0)`;
    if (layers.chars) layers.chars.style.transform =
      `translate3d(${x * 0.28}px, ${y * 0.28}px, 0)`;
  }

  function onMove(clientX, clientY) {
    const rect = scene.getBoundingClientRect();
    const nx = ((clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((clientY - rect.top) / rect.height) * 2 - 1;

    targetX = clamp(nx * 10, -10, 10);
    targetY = clamp(ny * 8, -8, 8);

    if (!raf) raf = requestAnimationFrame(apply);
  }

  scene.addEventListener("mousemove", (e) => onMove(e.clientX, e.clientY), { passive: true });
  scene.addEventListener("touchmove", (e) => {
    if (!e.touches || !e.touches[0]) return;
    onMove(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });

  scene.addEventListener("mouseleave", () => {
    targetX = 0; targetY = 0;
    if (!raf) raf = requestAnimationFrame(apply);
  });
})();
