/**
 * Astronautech — Dark Matter Particle Canvas
 */

(function () {
  const canvas = document.getElementById('dark-matter');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId;
  let width, height;

  const COLORS = [
    'rgba(255, 0, 255, 0.6)',
    'rgba(255, 119, 255, 0.5)',
    'rgba(168, 85, 247, 0.4)',
    'rgba(0, 212, 255, 0.3)',
    'rgba(255, 255, 255, 0.5)',
  ];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.5 + 0.2,
      pulse: Math.random() * Math.PI * 2,
    };
  }

  function initParticles() {
    const count = Math.min(Math.floor((width * height) / 8000), 120);
    particles = Array.from({ length: count }, createParticle);
  }

  function drawParticle(p) {
    p.pulse += 0.02;
    const glow = p.alpha + Math.sin(p.pulse) * 0.15;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
    ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${glow * 0.3})`);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${glow})`);
    ctx.fill();
  }

  function connectParticles() {
    const maxDist = 120;

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function update() {
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    const gradient = ctx.createRadialGradient(
      width * 0.5, height * 0.3, 0,
      width * 0.5, height * 0.5, width * 0.8
    );
    gradient.addColorStop(0, 'rgba(18, 0, 31, 0.3)');
    gradient.addColorStop(0.5, 'rgba(10, 0, 20, 0.1)');
    gradient.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    connectParticles();
    particles.forEach(drawParticle);
    update();

    animationId = requestAnimationFrame(animate);
  }

  function onResize() {
    resize();
    initParticles();
  }

  window.addEventListener('resize', onResize);

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReduced.matches) return;

  resize();
  initParticles();
  animate();
})();

/**
 * Smooth header on scroll
 */
(function () {
  const header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    header.style.background =
      window.scrollY > 50
        ? 'rgba(3, 0, 8, 0.95)'
        : 'linear-gradient(180deg, rgba(3, 0, 8, 0.95) 0%, rgba(3, 0, 8, 0.6) 70%, transparent 100%)';
  });
})();

/**
 * Platform cards entrance animation
 */
(function () {
  const cards = document.querySelectorAll('.platform-card');
  if (!cards.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s, border-color 0.3s, box-shadow 0.3s`;
    observer.observe(card);
  });
})();
