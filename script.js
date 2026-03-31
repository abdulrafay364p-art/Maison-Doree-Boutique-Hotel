const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateCursor() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top = ringY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .gallery-item, .room-card').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.classList.add('hover'); cursorRing.classList.add('hover'); });
  el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); cursorRing.classList.remove('hover'); });
});

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

const slides = document.querySelectorAll('.hero-slide');
const indicators = document.querySelectorAll('.indicator');
let current = 0, autoSlide;

function goToSlide(n) {
  slides[current].classList.remove('active');
  indicators[current].classList.remove('active');
  current = (n + slides.length) % slides.length;
  slides[current].classList.add('active');
  indicators[current].classList.add('active');
}

function startAutoSlide() {
  autoSlide = setInterval(() => goToSlide(current + 1), 5000);
}
startAutoSlide();

indicators.forEach(ind => {
  ind.addEventListener('click', () => {
    clearInterval(autoSlide);
    goToSlide(+ind.dataset.index);
    startAutoSlide();
  });
});


const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); } });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObs.observe(el));

const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const gallerySrcs = [...galleryItems].map(el => el.dataset.src);
let lightboxIdx = 0;

function openLightbox(idx) {
  lightboxIdx = idx;
  lightboxImg.src = gallerySrcs[idx];
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

galleryItems.forEach((item, i) => item.addEventListener('click', () => openLightbox(i)));
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
lightboxPrev.addEventListener('click', () => openLightbox((lightboxIdx - 1 + gallerySrcs.length) % gallerySrcs.length));
lightboxNext.addEventListener('click', () => openLightbox((lightboxIdx + 1) % gallerySrcs.length));
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') lightboxPrev.click();
  if (e.key === 'ArrowRight') lightboxNext.click();
});

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', () => mobileMenu.classList.remove('open')));

document.getElementById('bookingForm').addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('.btn-submit');
  btn.textContent = '✓ Request Sent — We\'ll be in touch within 2 hours';
  btn.style.background = '#4CAF50';
  btn.style.color = '#fff';
  setTimeout(() => {
    btn.textContent = 'Request Reservation';
    btn.style.background = '';
    btn.style.color = '';
    e.target.reset();
  }, 4000);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const y = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  });
});
