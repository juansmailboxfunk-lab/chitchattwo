(() => {
  const overlay = document.getElementById("serviceOverlay");
  const dialog = overlay?.querySelector(".service-overlay__dialog");
  const titleEl = document.getElementById("serviceOverlayTitle");
  const badgeEl = overlay?.querySelector(".service-overlay__badge");
  const imgEl = document.getElementById("serviceOverlayImg");
  const contentEl = document.getElementById("serviceOverlayContent");

  if (!overlay || !dialog || !titleEl || !badgeEl || !imgEl || !contentEl) return;

  const DATA = {
    early: {
      title: "Estimulación temprana (0–3 años)",
      tone: "mint",
      img: "images/services/early.webp",
      html: `
        <ul>
          <li>Acompañamos el desarrollo comunicativo de los más pequeños desde sus primeros meses de vida, respetando su ritmo y potenciando sus capacidades.</li>
          <li>Dirigido a bebés y niños pequeños que presentan retrasos en el desarrollo del lenguaje, la comunicación o la interacción, o que simplemente necesitan un pequeño empujón para desarrollar todo su potencial.</li>
        </ul>

        <h4>Trabajamos aspectos como:</h4>
        <ul class="check">
          <li>Atención conjunta y contacto visual</li>
          <li>Primeros gestos y sonidos</li>
          <li>Comprensión del lenguaje</li>
          <li>Juego y comunicación funcional</li>
        </ul>

        <p>Las sesiones se basan en el juego y en las rutinas diarias, y la familia participa activamente, aprendiendo cómo favorecer la comunicación en el día a día.</p>
      `
    },

    language: {
      title: "Comunicación y lenguaje (a partir de 4 años)",
      tone: "sand",
      img: "images/services/language.webp",
      html: `
        <ul>
          <li>Intervención en dificultades del lenguaje oral y la comunicación, adaptada a cada niño y a sus necesidades.</li>
        </ul>

        <h4>Este servicio está pensado para niños que presentan:</h4>
        <ul class="check">
          <li>Retraso en el lenguaje</li>
          <li>Trastorno del Desarrollo del Lenguaje (TEL)</li>
          <li>Dificultades en la comprensión o expresión</li>
          <li>Problemas para construir frases, ampliar vocabulario o contar experiencias</li>
        </ul>

        <p>Trabajamos de forma lúdica y funcional para que el niño se sienta seguro y motivado, favoreciendo una comunicación más clara y eficaz tanto en casa como en el entorno escolar.</p>
      `
    },

    speech: {
      title: "Habla, fonemas y articulación",
      tone: "peach",
      img: "images/services/speech.webp",
      html: `
        <ul>
          <li>Ayudamos a los niños a mejorar la pronunciación de los sonidos del habla de forma respetuosa y divertida.</li>
        </ul>

        <p>Algunos niños tienen dificultades para pronunciar ciertos sonidos (como /r/, /s/, /l/, /k/…), lo que puede afectar a su inteligibilidad y confianza al hablar.</p>

        <h4>La intervención se centra en:</h4>
        <ul class="check">
          <li>Conciencia y control de los movimientos orales</li>
          <li>Producción correcta de los fonemas</li>
          <li>Generalización del sonido en el habla espontánea</li>
        </ul>

        <p>Siempre a través de juegos y actividades motivadoras, evitando ejercicios repetitivos o forzados.</p>
      `
    },

    feeding: {
      title: "Alimentación oral infantil",
      tone: "mint",
      img: "images/services/feeding.webp",
      html: `
        <ul>
          <li>Acompañamiento en dificultades relacionadas con la alimentación, la masticación y la aceptación de alimentos.</li>
        </ul>

        <h4>Trabajamos con niños que presentan:</h4>
        <ul class="check">
          <li>Dificultades para masticar o tragar</li>
          <li>Selectividad alimentaria</li>
          <li>Rechazo de texturas o alimentos nuevos</li>
          <li>Problemas en la transición a sólidos</li>
        </ul>

        <p>El enfoque es respetuoso, gradual y centrado en el bienestar del niño, sin forzar ni generar experiencias negativas con la comida. La familia recibe pautas claras para aplicar en casa y avanzar de forma segura.</p>
      `
    },

    neuro: {
      title: "Acompañamiento en neurodiversidad",
      tone: "lav",
      img: "images/services/neuro.webp",
      html: `
        <ul>
          <li>Apoyo a niños con perfiles diversos de neurodesarrollo, respetando su forma única de comunicarse y relacionarse.</li>
        </ul>

        <p>Acompaño a niños dentro del espectro del autismo y otras neurodiversidades, adaptando la intervención a sus fortalezas, intereses y estilo comunicativo.</p>

        <h4>Trabajamos:</h4>
        <ul class="check">
          <li>Comunicación funcional</li>
          <li>Interacción social</li>
          <li>Comprensión del entorno</li>
          <li>Regulación y autonomía</li>
        </ul>

        <p>El objetivo no es “normalizar”, sino potenciar la comunicación y el bienestar del niño, creando un entorno seguro y comprensivo.</p>
      `
    },

    family: {
      title: "Orientación y acompañamiento a familias",
      tone: "sand",
      img: "images/services/family.webp",
      html: `
        <ul>
          <li>Las familias son una parte fundamental del proceso terapéutico.</li>
        </ul>

        <p>Ofrezco orientación a madres, padres y cuidadores para que se sientan seguros y acompañados en el desarrollo de su hijo.</p>

        <h4>Incluye:</h4>
        <ul class="check">
          <li>Pautas prácticas para casa</li>
          <li>Resolución de dudas</li>
          <li>Acompañamiento emocional</li>
          <li>Coordinación con otros profesionales (si es necesario)</li>
        </ul>

        <p>Creo firmemente que cuando la familia entiende y participa, los avances son más significativos y duraderos.</p>
      `
    }
  };

  let lastActive = null;

  function setOpen(isOpen) {
    overlay.classList.toggle("is-open", isOpen);
    overlay.setAttribute("aria-hidden", String(!isOpen));
    document.documentElement.classList.toggle("modal-open", isOpen);
    document.body.classList.toggle("modal-open", isOpen);
  }

  function openService(key, triggerEl) {
    const item = DATA[key];
    if (!item) return;

    lastActive = triggerEl || document.activeElement;

    titleEl.textContent = item.title;
    badgeEl.className = `service-overlay__badge service-overlay__badge--${item.tone}`;
    imgEl.src = item.img;
    imgEl.alt = "";
    contentEl.innerHTML = item.html;

    setOpen(true);

    // focus close button for accessibility
    const xBtn = overlay.querySelector('[data-close]');
    xBtn?.focus({ preventScroll: true });
  }

  function closeService() {
    setOpen(false);
    // restore focus
    if (lastActive && typeof lastActive.focus === "function") {
      lastActive.focus({ preventScroll: true });
    }
    lastActive = null;
  }

  // Card buttons
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".service-more");
    if (btn) {
      const key = btn.getAttribute("data-service");
      openService(key, btn);
      return;
    }

    if (e.target.closest("[data-close]") || e.target === overlay) {
      if (overlay.classList.contains("is-open")) closeService();
    }
  });

  // ESC to close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("is-open")) {
      e.preventDefault();
      closeService();
    }
  });

  // Basic focus trap
  overlay.addEventListener("keydown", (e) => {
    if (e.key !== "Tab" || !overlay.classList.contains("is-open")) return;

    const focusables = overlay.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const list = Array.from(focusables).filter(el => !el.hasAttribute("disabled"));
    if (!list.length) return;

    const first = list[0];
    const last = list[list.length - 1];
    const active = document.activeElement;

    if (e.shiftKey && active === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  });
})();