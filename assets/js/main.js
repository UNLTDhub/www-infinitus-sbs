// SDAP LTD — Main JavaScript

// Navbar scroll behavior
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });
}

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  // close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// Animate stats on scroll
function animateStats() {
  const stats = document.querySelectorAll('.stat-num');
  if (!stats.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = el.dataset.target;
        if (!target) return;
        let start = 0;
        const end = parseInt(target.replace(/,/g, ''));
        const duration = 1800;
        const step = end / (duration / 16);
        const timer = setInterval(() => {
          start += step;
          if (start >= end) {
            el.textContent = el.dataset.suffix
              ? end.toLocaleString() + el.dataset.suffix
              : end.toLocaleString() + (el.dataset.plus ? '+' : '') + (el.dataset.percent ? '%' : '');
            clearInterval(timer);
          } else {
            el.textContent = Math.floor(start).toLocaleString();
          }
        }, 16);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(el => observer.observe(el));
}

// Donation amount selector
function initDonateAmounts() {
  const amounts = document.querySelectorAll('.amount-btn');
  amounts.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (btn.classList.contains('amount-custom')) return;
      e.preventDefault();
      amounts.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

// Smooth reveal on scroll
function initReveal() {
  const els = document.querySelectorAll('.program-card, .animal-card, .news-card, .stat');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  els.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;
    observer.observe(el);
  });
}

// Donate form: handle query param for pre-selected amount
function initDonateForm() {
  const params = new URLSearchParams(window.location.search);
  const amount = params.get('amount');
  if (amount) {
    const amountInput = document.getElementById('donationAmount');
    if (amountInput) amountInput.value = amount;
    document.querySelectorAll('.amount-btn').forEach(btn => {
      btn.classList.toggle('active', btn.textContent.replace('$','') === amount);
    });
  }
}

// Contact / Volunteer tab anchoring
function handleAnchor() {
  const hash = window.location.hash;
  if (hash) {
    const target = document.querySelector(hash);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  animateStats();
  initDonateAmounts();
  initReveal();
  initDonateForm();
  handleAnchor();
});
