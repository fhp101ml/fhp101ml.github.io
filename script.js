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
// EmailJS Form Submission
const form = document.getElementById('contact-form');

form.addEventListener('submit', function (event) {
    event.preventDefault();
    const btn = form.querySelector('button');
    const originalText = btn.innerText;

    btn.innerText = 'Enviando...';
    btn.disabled = true;

    // Replace these with your actual Service ID and Template ID
    const serviceID = 'service_7figj0j';
    const templateID = 'template_7k1g6ar';

    // Client-side ReCAPTCHA validation
    const recaptchaResponse = grecaptcha.getResponse();
    if (!recaptchaResponse) {
        alert("Por favor, verifica que no eres un robot.");
        btn.innerText = originalText;
        btn.disabled = false;
        return;
    }

    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            btn.innerText = '¡Mensaje Enviado!';
            btn.style.background = '#27c93f'; // Green
            form.reset();

            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);
        }, (err) => {
            btn.innerText = 'Error al enviar';
            btn.style.background = '#ff3e3e'; // Red
            console.error('FAILED...', err);
            alert(JSON.stringify(err));

            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);
        });
});

// Glitch Effect Randomizer on Hover
const glitch = document.querySelector('.glitch');
glitch.addEventListener('mouseover', () => {
    glitch.setAttribute('data-text', 'Desarrollador');
});

glitch.addEventListener('mouseout', () => {
    glitch.setAttribute('data-text', 'fhp101ml');
});
