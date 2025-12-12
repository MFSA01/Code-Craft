// Navigasi mobile toggle
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('#primary-menu');

if (navToggle && navList) {
  navToggle.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Slider sederhana
const track = document.querySelector('.slider-track');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.control.prev');
const nextBtn = document.querySelector('.control.next');
const dotsWrap = document.querySelector('.slider-dots');

let index = 0;
const total = slides.length;
let autoPlayTimer = null;
const intervalMs = 5000;

// Buat dot navigasi
if (dotsWrap) {
  for (let i = 0; i < total; i++) {
    const dot = document.createElement('button');
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Ke slide ${i + 1}`);
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  }
}

function updateDots() {
  const dots = dotsWrap.querySelectorAll('button');
  dots.forEach((d, i) => {
    d.classList.toggle('active', i === index);
  });
}

function goTo(i) {
  index = (i + total) % total;
  const offset = -index * 100;
  track.style.transform = `translateX(${offset}%)`;
  updateDots();
  resetAutoplay();
}

function next() { goTo(index + 1); }
function prev() { goTo(index - 1); }

if (nextBtn) nextBtn.addEventListener('click', next);
if (prevBtn) prevBtn.addEventListener('click', prev);

// Autoplay
function startAutoplay() {
  stopAutoplay();
  autoPlayTimer = setInterval(next, intervalMs);
}
function stopAutoplay() {
  if (autoPlayTimer) clearInterval(autoPlayTimer);
}
function resetAutoplay() {
  startAutoplay();
}

// Pause autoplay saat hover untuk kontrol manual
const slider = document.querySelector('.hero-slider');
if (slider) {
  slider.addEventListener('mouseenter', stopAutoplay);
  slider.addEventListener('mouseleave', startAutoplay);
}

// Mulai
document.addEventListener('DOMContentLoaded', startAutoplay);

// // Form basic feedback
// const form = document.querySelector('.contact-form');
// if (form) {
//   form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const nama = form.querySelector('#nama').value.trim();
//     const email = form.querySelector('#email').value.trim();
//     const layanan = form.querySelector('#layananSelect').value;
//     alert(`Terima kasih, ${nama}!\nKami akan menghubungi ${email} untuk layanan: ${layanan}.`);
//     form.reset();
//   });
// }