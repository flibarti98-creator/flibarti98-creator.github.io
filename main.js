// main.js — Animacje i interakcje
// commit: feat: typing effect, scroll animations, skill bars

// ===== TYPING EFFECT =====
const phrases = [
  'Student Informatyki @ Akademia Tarnowska',
  'HTML / CSS / JavaScript Developer',
  'C/C++ Enthusiast',
  'AutoCAD Power User',
  'Git & GitHub w akcji',
  'Przyszły Full-Stack Dev 🚀',
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typed');

function type() {
  const current = phrases[phraseIndex];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === current.length) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    speed = 400;
  }

  setTimeout(type, speed);
}
type();

// ===== ASCII ART =====
const asciiFrames = [
`
  ██████╗ ███████╗
  ██╔══██╗██╔════╝
  ██████╔╝█████╗  
  ██╔══██╗██╔══╝  
  ██████╔╝██║     
  ╚═════╝ ╚═╝     
`,
`
  ╔╗ ╔═╗╦═╗╔╦╗╔═╗╔═╗╔═╗
  ╠╩╗╠═╣╠╦╝ ║ ║ ║╚═╗╔═╝
  ╚═╝╩ ╩╩╚═ ╩ ╚═╝╚═╝╚═╝
`,
];

const asciiEl = document.getElementById('ascii-art');
let frame = 0;
asciiEl.textContent = asciiFrames[0];

setInterval(() => {
  frame = (frame + 1) % asciiFrames.length;
  asciiEl.textContent = asciiFrames[frame];
}, 3000);

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== SKILL BAR ANIMATION =====
const skillBars = document.querySelectorAll('.skill-bar');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const width = bar.getAttribute('data-width');
      bar.style.width = width + '%';
    }
  });
}, { threshold: 0.3 });

skillBars.forEach(bar => skillObserver.observe(bar));

// ===== SECTION REVEAL ON SCROLL =====
const sections = document.querySelectorAll('section');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => sectionObserver.observe(section));

// ===== CARD HOVER GLITCH =====
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    card.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${-y}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(600px) rotateY(0) rotateX(0) translateY(0)';
  });
});

// ===== RANDOM GLITCH TRIGGER =====
const glitchEl = document.querySelector('.glitch');
setInterval(() => {
  glitchEl.classList.add('glitching');
  setTimeout(() => glitchEl.classList.remove('glitching'), 200);
}, 4000);

// ===== CURSOR CUSTOM =====
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button, .skill-item, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});