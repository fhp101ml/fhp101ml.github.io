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

// Active Link State on Scroll and Close menu
let scrollSections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('.navbar a');

window.onscroll = () => {
    menuBtn.classList.remove('active');
    navbar.classList.remove('active');

    scrollSections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('.navbar a[href*=' + id + ']').classList.add('active');
            });
        }
    });
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

// Language Translation
const translations = {
    en: {
        "nav-home": "Home",
        "nav-about": "About",
        "nav-projects": "Projects",
        "nav-contact": "Contact",
        "hero-greeting": "Hello, I'm",
        "hero-desc": "AI with purpose | Building virtual assistants & data solutions",
        "hero-btn-projects": "View Projects",
        "hero-btn-contact": "Contact Me",
        "about-title-1": "About",
        "about-title-2": " Me",
        "about-desc-1": "Artificial Intelligence Engineer at the International Chair of Artificial Intelligence and Agriculture (CIIAA). Passionate about researching and developing AI solutions that positively impact the world and protect the planet. Previously worked as a Data Analyst and have experience in data mining research and KDD.",
        "about-desc-2": "This repository is an experimentation space created with the help of <strong>Generative AI</strong>. It represents my commitment to continuous learning and critical adaptation to new technologies, combining my engineering experience with the potential of agents and LLMs.",
        "projects-title-1": "My",
        "projects-title-2": " Projects",
        "legend-dev": "In Development",
        "legend-personal": "Personal Roadmap",
        "legend-roadmap": "Roadmap (Ideas)",
        "badge-personal": "Personal Roadmap",
        "badge-roadmap": "Roadmap",
        "badge-dev": "In Development",
        "proj-mcp-desc": "MCP-based agent for end-to-end data analysis with real code execution and LLMs.",
        "proj-chatbot-desc": "FastAPI backend for LLM chatbots. RAG support (Web, PDF), message management, and AI responses.",
        "proj-rag-desc": "Production-oriented RAG system: adaptive chunking, automatic evaluation, and traceability.",
        "proj-multiagent-desc": "Multi-agent system with LangGraph for complex task resolution (Planning, Critique).",
        "proj-mlops-desc": "Complete MLOps pipeline, inspired by my thesis, redesigned with production criteria (End-to-End, Reproducible).",
        "proj-eval-desc": "Framework for automatic evaluation of LLM-based systems. Metrics and Benchmarks.",
        "proj-etl-desc": "Performance comparison in ETL flows, expanded and enhanced with advanced AI techniques.",
        "proj-course-desc": "Practical course on agent design and RAG with LangChain and LangGraph for engineers.",
        "proj-cloud-desc": "Application for management and supervision of AWS services. Decorators, Boto3, Observability.",
        "proj-sec-desc": "Exploration of security in web applications and AI benchmarks. Authentication and Robustness.",
        "contact-title-1": "Contact",
        "contact-title-2": " Me",
        "contact-subtitle": "Let's talk about your next project",
        "contact-desc": "Do you have an idea in mind? I'm available for new challenges and collaborations.",
        "form-name": "Name",
        "form-email": "Email",
        "form-msg": "Message",
        "form-btn": "Send Message",
        "footer-rights": "&copy; 2024 Fernando Herrera. All rights reserved."
    },
    es: {
        "nav-home": "Inicio",
        "nav-about": "Sobre mí",
        "nav-projects": "Proyectos",
        "nav-contact": "Contacto",
        "hero-greeting": "Hola, soy",
        "hero-desc": "IA con propósito | Creando asistentes virtuales y soluciones de datos",
        "hero-btn-projects": "Ver Proyectos",
        "hero-btn-contact": "Contactar",
        "about-title-1": "Sobre",
        "about-title-2": "Mí",
        "about-desc-1": "Ingeniero de Inteligencia Artificial en la Cátedra Internacional de Inteligencia Artificial y Agricultura (CIIAA). Apasionado por investigar y desarrollar soluciones de IA que impacten positivamente en el mundo y protejan el planeta. Anteriormente he trabajado como Analista de Datos y cuento con experiencia en investigación en minería de datos y KDD.",
        "about-desc-2": "Este repositorio es un espacio de experimentación creado con la ayuda de <strong>IA Generativa</strong>. Representa mi compromiso con el aprendizaje continuo y la adaptación crítica a las nuevas tecnologías, combinando mi experiencia en ingeniería con el potencial de los agentes y LLMs.",
        "projects-title-1": "Mis",
        "projects-title-2": "Proyectos",
        "legend-dev": "En Desarrollo",
        "legend-personal": "Personal Roadmap",
        "legend-roadmap": "Roadmap (Ideas)",
        "badge-personal": "Personal Roadmap",
        "badge-roadmap": "Roadmap",
        "badge-dev": "En Desarrollo",
        "proj-mcp-desc": "Agente basado en MCP para análisis de datos end-to-end con ejecución real de código y LLMs.",
        "proj-chatbot-desc": "Backend FastAPI para chatbots LLM. Soporte RAG (Web, PDF), gestión de mensajes y respuestas de IA.",
        "proj-rag-desc": "Sistema RAG orientado a producción: chunking adaptativo, evaluación automática y trazabilidad.",
        "proj-multiagent-desc": "Sistema multi-agente con LangGraph para resolución de tareas complejas (Planificación, Crítica).",
        "proj-mlops-desc": "Pipeline MLOps completo, inspirado en mi TFG, rediseñado con criterios de producción (End-to-End, Reproducible).",
        "proj-eval-desc": "Framework para la evaluación automática de sistemas basados en LLMs. Métricas y Benchmarks.",
        "proj-etl-desc": "Comparativa de rendimiento en flujos ETL, ampliado y mejorado con técnicas avanzadas de IA.",
        "proj-course-desc": "Curso práctico de diseño de agentes y RAG con LangChain y LangGraph para ingenieros.",
        "proj-cloud-desc": "Aplicación para gestión y supervisión de servicios AWS. Decoradores, Boto3, Observabilidad.",
        "proj-sec-desc": "Exploración de seguridad en aplicaciones web y benchmarks de IA. Autenticación y Robustez.",
        "contact-title-1": "Contáctame",
        "contact-title-2": "",
        "contact-subtitle": "Hablemos de tu próximo proyecto",
        "contact-desc": "¿Tienes una idea en mente? Estoy disponible para nuevos retos y colaboraciones.",
        "form-name": "Nombre",
        "form-email": "Email",
        "form-msg": "Mensaje",
        "form-btn": "Enviar Mensaje",
        "footer-rights": "&copy; 2024 Fernando Herrera. Todos los derechos reservados."
    }
};

const langBtns = document.querySelectorAll('.lang-btn');
const htmlTag = document.documentElement;

langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        setLanguage(lang);
    });
});

function setLanguage(lang) {
    // Update active class on buttons
    langBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });

    // Update HTML lang attribute
    htmlTag.setAttribute('lang', lang);

    // Update Text Content
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key] !== undefined) {
            // Check if it contains HTML (like <strong>)
            if (translations[lang][key].includes('<')) {
                el.innerHTML = translations[lang][key];
            } else {
                el.textContent = translations[lang][key];
            }
        }
    });

    // Update Placeholders
    const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
    placeholders.forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });
}
