/**
 * Roy Wang Portfolio — Interactions
 * Cursor glow, scroll animations, navbar effects
 */

// ── Cursor Glow ────────────────────────────────────────
const cursorGlow = document.getElementById('cursor-glow');
let mouseX = 0, mouseY = 0;
let glowX = 0, glowY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function updateGlow() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';
    requestAnimationFrame(updateGlow);
}
updateGlow();

// ── Scroll Reveal ──────────────────────────────────────
const fadeTargets = document.querySelectorAll(
    '.project-featured, .project-card, .skill-group, .about-content, .contact-card, .section-header'
);

fadeTargets.forEach(el => el.classList.add('fade-up'));

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

fadeTargets.forEach(el => observer.observe(el));

// ── Navbar shrink on scroll ────────────────────────────
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    if (scrollY > 80) {
        navbar.style.padding = '12px 48px';
        navbar.style.background = 'rgba(10, 10, 15, 0.9)';
    } else {
        navbar.style.padding = '20px 48px';
        navbar.style.background = 'rgba(10, 10, 15, 0.7)';
    }
    
    lastScroll = scrollY;
}, { passive: true });

// ── Smooth scroll for nav links ────────────────────────
document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ── Stagger animation for project cards ────────────────
const cards = document.querySelectorAll('.project-card');
const cardObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, i * 100);
            }
        });
    },
    { threshold: 0.05 }
);
cards.forEach(card => cardObserver.observe(card));
