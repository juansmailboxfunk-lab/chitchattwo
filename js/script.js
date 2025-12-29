// Chit Chat — minimal site JS (nav + year + small UX)
document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Mobile nav toggle
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("siteNav");
  const header = document.querySelector(".site-header");

  function closeNav() {
    if (!toggle || !nav) return;
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
    });

    // Close when clicking a link
    nav.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      closeNav();
    });

    // Close on escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeNav();
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      const isClickInside = nav.contains(e.target) || toggle.contains(e.target);
      if (!isClickInside) closeNav();
    });
  }

  // Smooth scroll for anchor links (respect reduced motion)
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!prefersReduced) {
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const href = a.getAttribute("href");
        if (!href || href === "#") return;
        const el = document.querySelector(href);
        if (!el) return;

        e.preventDefault();
        const y = el.getBoundingClientRect().top + window.scrollY - (header?.offsetHeight || 0) - 10;
        window.scrollTo({ top: y, behavior: "smooth" });
        history.pushState(null, "", href);
      });
    });
  }

  // Lightweight contact validation message (server still validates)
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  if (form && status) {
    form.addEventListener("submit", (e) => {
      status.hidden = true;
      status.textContent = "";

      const name = form.querySelector('input[name="name"]');
      const email = form.querySelector('input[name="email"]');
      const msg = form.querySelector('textarea[name="message"]');

      const missing = [];
      if (name && !name.value.trim()) missing.push("nombre");
      if (email && !email.value.trim()) missing.push("email");
      if (msg && !msg.value.trim()) missing.push("mensaje");

      if (missing.length) {
        e.preventDefault();
        status.hidden = false;
        status.textContent = "Por favor, completa: " + missing.join(", ") + ".";
        (missing[0] === "nombre" ? name : missing[0] === "email" ? email : msg)?.focus?.();
        return;
      }
    });
  }
});
