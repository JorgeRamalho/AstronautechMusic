/**
 * Astronautech — fundo discreto, menu e pedido de booking.
 */

(function () {
  const canvas = document.getElementById("dark-matter");
  if (!canvas) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const ctx = canvas.getContext("2d");
  let particles = [];
  let width = 0;
  let height = 0;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.3 + 0.3,
      vy: -(Math.random() * 0.18 + 0.04),
      alpha: Math.random() * 0.45 + 0.15,
    };
  }

  function init() {
    const count = Math.min(Math.floor((width * height) / 18000), 70);
    particles = Array.from({ length: count }, createParticle);
  }

  function frame() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p) => {
      p.y += p.vy;
      if (p.y < -4) {
        p.y = height + 4;
        p.x = Math.random() * width;
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(244, 240, 232, ${p.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(frame);
  }

  window.addEventListener("resize", () => {
    resize();
    init();
  });

  resize();
  init();
  frame();
})();

(function () {
  const header = document.querySelector("[data-header]");
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("nav-menu");
  if (!header || !toggle || !menu) return;

  const label = toggle.querySelector(".visually-hidden");

  function setOpen(open) {
    header.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    if (label) label.textContent = open ? "Fechar menu" : "Abrir menu";
    document.body.style.overflow = open ? "hidden" : "";
  }

  toggle.addEventListener("click", () => {
    setOpen(!header.classList.contains("is-open"));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  window.addEventListener("scroll", () => {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  }, { passive: true });
})();

(function () {
  const topFab = document.querySelector("[data-back-top]");
  if (!topFab) return;

  const threshold = () => Math.min(window.innerHeight * 0.55, 520);

  function updateTopFab() {
    topFab.classList.toggle("is-visible", window.scrollY > threshold());
  }

  window.addEventListener("scroll", updateTopFab, { passive: true });
  window.addEventListener("resize", updateTopFab, { passive: true });
  updateTopFab();
})();

(function () {
  const form = document.getElementById("booking-form");
  const status = document.getElementById("form-status");
  if (!form || !status) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const nome = String(data.get("nome") || "").trim();
    const formato = String(data.get("formato") || "").trim();
    const quando = String(data.get("quando") || "").trim();
    const nota = String(data.get("nota") || "").trim();

    const lines = [
      "Olá, Astronautech. Quero reservar um set.",
      `Nome: ${nome}`,
      `Formato: ${formato}`,
    ];
    if (quando) lines.push(`Cidade e data: ${quando}`);
    if (nota) lines.push(`Nota: ${nota}`);
    const message = lines.join("\n");

    let copied = false;
    try {
      await navigator.clipboard.writeText(message);
      copied = true;
    } catch (error) {
      copied = false;
    }

    status.textContent = copied
      ? "Pedido copiado. O Instagram abriu numa nova aba — cola a mensagem na conversa."
      : "O Instagram abriu. Se a cópia falhar, escreve o pedido direto na conversa.";

    window.open("https://www.instagram.com/astronautechmusic/", "_blank", "noopener,noreferrer");
  });
})();
