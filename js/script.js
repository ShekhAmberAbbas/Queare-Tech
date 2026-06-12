// ============================
// PRELOADER
// ============================
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('hidden');
  }, 2000);
});

// ============================
// AOS INIT
// ============================
AOS.init({
  duration: 750,
  once: true,
  easing: 'ease-out-cubic',
  offset: 60,
});

// ============================
// SWIPER — TESTIMONIALS
// ============================
new Swiper('.swiper-testimonials', {
  slidesPerView: 1,
  spaceBetween: 24,
  loop: true,
  autoplay: { delay: 5000, disableOnInteraction: false },
  pagination: { el: '.swiper-testimonials .swiper-pagination', clickable: true },
  breakpoints: {
    640:  { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  },
});

// ============================
// SWIPER — BLOG
// ============================
new Swiper('.swiper-blog', {
  slidesPerView: 1,
  spaceBetween: 24,
  loop: true,
  autoplay: { delay: 4000, disableOnInteraction: false },
  pagination: { el: '.swiper-blog .swiper-pagination', clickable: true },
  breakpoints: {
    640:  { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  },
});

// ============================
// NAVBAR SCROLL
// ============================
const mainNav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) mainNav.classList.add('scrolled');
  else mainNav.classList.remove('scrolled');
});

// ============================
// BACK TO TOP
// ============================
const backTop = document.getElementById('back-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) backTop.classList.add('show');
  else backTop.classList.remove('show');
});
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ============================
// CUSTOM CURSOR
// ============================
const dot     = document.getElementById('cursor-dot');
const outline = document.getElementById('cursor-outline');
let mouseX = 0, mouseY = 0;
let outX = 0, outY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  dot.style.left = mouseX + 'px';
  dot.style.top  = mouseY + 'px';
});

(function animateCursor() {
  outX += (mouseX - outX) * 0.12;
  outY += (mouseY - outY) * 0.12;
  outline.style.left = outX + 'px';
  outline.style.top  = outY + 'px';
  requestAnimationFrame(animateCursor);
})();

document.querySelectorAll('a, button, .about-card, .service-card, .tech-item, .blog-card, .testimonial-card, .delivery-step, .contact-info-item').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

// ============================
// ANIMATED COUNTERS
// ============================
function animateCounter(el) {
  const target = +el.dataset.target;
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current);
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('.counter').forEach(c => counterObserver.observe(c));

// ============================
// PARALLAX ORB
// ============================
document.addEventListener('mousemove', e => {
  const orbs = document.querySelectorAll('.parallax-orb[data-parallax]');
  const cx = window.innerWidth  / 2;
  const cy = window.innerHeight / 2;
  orbs.forEach(orb => {
    const depth = parseFloat(orb.dataset.parallax);
    const dx = (e.clientX - cx) * depth * 0.04;
    const dy = (e.clientY - cy) * depth * 0.04;
    orb.style.transform = `translate(${dx}px, ${dy}px)`;
  });
});

// ============================
// SCROLL PARALLAX (hero)
// ============================
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const bg = document.getElementById('parallaxBg');
  if (bg) bg.style.transform = `translateY(${scrollY * 0.25}px)`;
});

// ============================
// RIPPLE EFFECT
// ============================
document.querySelectorAll('.btn-ripple').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    ripple.style.cssText = `
      width:${size}px;height:${size}px;
      left:${e.clientX - rect.left - size/2}px;
      top:${e.clientY - rect.top  - size/2}px;
    `;
    this.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
});

// ============================
// CONTACT FORM
// ============================
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button[type="submit"]');
  btn.innerHTML = '<span class="material-icons" style="font-size:1rem;animation:spin 1s linear infinite;">refresh</span> Sending...';
  setTimeout(() => {
    btn.innerHTML = '<span class="material-icons" style="font-size:1rem;">check_circle</span> Message Sent!';
    btn.style.background = '#4caf50';
    this.reset();
    setTimeout(() => {
      btn.innerHTML = 'Send Message <span class="material-icons" style="font-size:1rem;">send</span>';
      btn.style.background = '';
    }, 3000);
  }, 1800);
});

// ============================
// SPIN KEYFRAME (dynamic)
// ============================
const style = document.createElement('style');
style.textContent = `@keyframes spin { from { transform: rotate(0); } to { transform: rotate(360deg); } }`;
document.head.appendChild(style);

// ============================
// NAVBAR ACTIVE ON SCROLL
// ============================
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link[href^="#"]');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--c-accent)';
        }
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => navObserver.observe(s));