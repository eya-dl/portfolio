// ── Active nav link ──
const setActiveLink = () => {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
};
setActiveLink();

// ── Scroll reveal ──
const observerOpts = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' };
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'none';
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOpts);

document.querySelectorAll('.reveal').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(el);
});

// ── Smooth nav background ──
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (nav) {
    nav.style.background = window.scrollY > 50
      ? 'rgba(11, 12, 15, 0.97)'
      : 'rgba(11, 12, 15, 0.85)';
  }
});

// ── Contact form ──
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = '✓ Message envoyé !';
    btn.style.background = '#2d7a4f';
    setTimeout(() => {
      btn.textContent = 'Envoyer le message';
      btn.style.background = '';
      form.reset();
    }, 3000);
  });
}
