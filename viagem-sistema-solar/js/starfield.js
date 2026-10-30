/**
 * Starfield background canvas
 */
(function () {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let stars = [];
  let w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function init() {
    const count = Math.min(Math.floor((w * h) / 6000), 150);
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.3,
      a: Math.random(),
      speed: Math.random() * 0.02 + 0.005
    }));
  }

  function draw() {
    ctx.fillStyle = '#000008';
    ctx.fillRect(0, 0, w, h);

    const grad = ctx.createRadialGradient(w * 0.5, h * 0.2, 0, w * 0.5, h * 0.5, w);
    grad.addColorStop(0, 'rgba(168, 85, 247, 0.08)');
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    stars.forEach((s) => {
      s.a += s.speed;
      const alpha = 0.3 + Math.sin(s.a) * 0.3 + 0.2;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => {
    resize();
    init();
  });

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    resize();
    init();
    draw();
  }
})();
