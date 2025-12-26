// Custom Cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Mobile Menu
const menuBtn = document.querySelector('.menu-btn');
const navbar = document.querySelector('.navbar');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    navbar.classList.toggle('active');
});

// Close menu on scroll
window.onscroll = () => {
    menuBtn.classList.remove('active');
    navbar.classList.remove('active');
};

// Scroll Reveal
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, observerOptions);

const sections = document.querySelectorAll('section');
sections.forEach(section => {
    section.classList.add('hidden');
    observer.observe(section);
});

// Form Submission (Prevent Default for Demo)
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button');
    const originalText = btn.innerText;

    btn.innerText = 'Enviando...';

    setTimeout(() => {
        btn.innerText = '¡Mensaje Enviado!';
        btn.style.background = '#27c93f'; // Green
        form.reset();

        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.background = '';
        }, 3000);
    }, 1500);
});

// Glitch Effect Randomizer on Hover
const glitch = document.querySelector('.glitch');
glitch.addEventListener('mouseover', () => {
    glitch.setAttribute('data-text', 'Desarrollador');
});

glitch.addEventListener('mouseout', () => {
    glitch.setAttribute('data-text', 'fhp101ml');
});
