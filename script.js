// Custom Cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (cursorDot && cursorOutline) {
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
}

// Mobile Menu
const menuBtn = document.querySelector('.menu-btn');
const navbar = document.querySelector('.navbar');

if (menuBtn && navbar) {
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        navbar.classList.toggle('active');
    });
}

// Active Link State on Scroll and Close menu
let scrollSections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('.navbar a');

window.onscroll = () => {
    if (menuBtn) menuBtn.classList.remove('active');
    if (navbar) navbar.classList.remove('active');

    scrollSections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                const activeLink = document.querySelector('.navbar a[href*=' + id + ']');
                if (activeLink) activeLink.classList.add('active');
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

if (form) {
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const btn = form.querySelector('button');
        const originalText = btn.innerText;

        btn.innerText = 'Enviando...';
        btn.disabled = true;

        // Client-side ReCAPTCHA validation
        const recaptchaResponse = grecaptcha.getResponse();
        if (!recaptchaResponse) {
            alert("Please confirm you are not a robot / Por favor verifica que no eres un robot.");
            btn.innerText = originalText;
            btn.disabled = false;
            return;
        }

        // Determine Environment and Action
        const isLocal = ['localhost', '127.0.0.1'].includes(window.location.hostname);

        // PRODUCTION URL (Render) - You will update this after deployment
        const BACKEND_URL = "https://fhp101ml-github-io.onrender.com/send-email";

        if (isLocal) {
            // --- LOCAL: EmailJS ---
            console.log("Environment: Local (using EmailJS)");
            const serviceID = 'service_7figj0j';
            const templateID = 'template_7k1g6ar';

            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    handleSuccess(btn, form, originalText);
                }, (err) => {
                    handleError(btn, originalText, err);
                });

        } else {
            // --- PRODUCTION: Backend (FastAPI + Mailjet) ---
            console.log("Environment: Production (using Custom Backend)");

            // Convert FormData to JSON
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            fetch(BACKEND_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Network response was not ok.');
                })
                .then(data => {
                    handleSuccess(btn, form, originalText);
                })
                .catch(error => {
                    console.error('Fetch Error:', error);
                    handleError(btn, originalText, error);
                });
        }
    });
}

function handleSuccess(btn, form, originalText) {
    btn.innerText = '¡Mensaje Enviado! / Sent!';
    btn.style.background = '#27c93f'; // Green
    form.reset();
    if (window.grecaptcha) grecaptcha.reset();

    setTimeout(() => {
        btn.innerText = originalText;
        btn.style.background = ''; // Reset CSS
        btn.disabled = false;
    }, 4000);
}

function handleError(btn, originalText, err) {
    btn.innerText = 'Error';
    btn.style.background = '#ff0000';
    console.error('FAILED...', err);
    alert('Failed to send message. Please try again later.');

    setTimeout(() => {
        btn.innerText = originalText;
        btn.style.background = '';
        btn.disabled = false;
    }, 3000);
}


// Glitch Effect Randomizer on Hover
const glitch = document.querySelector('.glitch');
if (glitch) {
    glitch.addEventListener('mouseover', () => {
        glitch.setAttribute('data-text', 'Desarrollador');
    });
}

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
        "about-subtitle": "AI with purpose",
        "about-desc-1": "Artificial Intelligence Engineer at the International Chair of Artificial Intelligence and Agriculture (CIIAA). Passionate about researching and developing AI solutions that positively impact the world and protect the planet. Previously worked as a Data Analyst and have experience in data mining research and KDD.",
        "about-desc-2": "This repository is an experimentation space created with the help of <strong>Generative AI</strong>. It represents my commitment to continuous learning and critical adaptation to new technologies, combining my engineering experience with the potential of agents and LLMs.",
        "projects-title-1": "My",
        "projects-title-2": " Projects",
        "legend-dev": "In Development",
        "legend-personal": "Processing",
        "legend-roadmap": "Next Developments",
        "badge-personal": "Processing",
        "badge-roadmap": "Next Developments",
        "badge-dev": "In Development",
        "proj-arena-desc": "Real-time multiplayer competitive game to test logical reasoning through Boolean gate puzzles.",
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
        "proj-petshop-desc": "Voice-driven web app for inventory management (Multimodal: Voice + Chat + GUI), designed for accessibility.",
        "contact-title-1": "Contact",
        "contact-title-2": " Me",
        "contact-subtitle": "Let's talk about your next project",
        "contact-desc": "Do you have an idea in mind? I'm available for new challenges and collaborations.",
        "form-name": "Name",
        "form-email": "Email",
        "form-msg": "Message",
        "form-btn": "Send Message",
        "footer-rights": "&copy; 2024 Fernando Herrera. All rights reserved.",
        "petshop-title": "Pet Shop Assistant Module",
        "petshop-meta-voice": "Voice Interaction",
        "petshop-meta-access": "Accessibility",
        "petshop-about-title": "About the Project",
        "petshop-about-desc": "This is a standalone module providing a multimodal (Voice + Chat + GUI) interaction template using Python (FastAPI/LangGraph) and React (Vite/Socket.IO). Designed specifically for accessibility, it allows users to manage inventory through natural language.",
        "petshop-features-title": "Key Features",
        "petshop-feat-1": "<strong>Multimodal Interaction:</strong> Seamlessly switch between voice commands, chat, and traditional GUI controls.",
        "petshop-feat-2": "<strong>Real-time Sync:</strong> Updates across all clients instantly using WebSockets.",
        "petshop-feat-3": "<strong>Voice Forms:</strong> Open, fill, and close forms using natural language commands like 'I want to register a new product'.",
        "petshop-feat-4": "<strong>Accessibility Focused:</strong> Empowering users with auditory or visual impairments to manage complex systems effectively.",
        "petshop-stack-title": "Technical Stack",
        "petshop-stack-desc": "Built with a robust modern stack: <strong>Backend</strong> using FastAPI and LangGraph for agentic workflows. <strong>Frontend</strong> using React and Vite. Real-time communication via Socket.IO.",
        "petshop-btn-source": "<i class='fab fa-github'></i> View Source Code",
        "petshop-btn-back": "<i class='fas fa-arrow-left'></i> Back to Projects",
        "mcp-title": "MCP AI Data Agent (Conversational KDD)",
        "mcp-about-title": "About the Project",
        "mcp-about-desc": "A conversational system acting as an analytical copilot that guides the user through the entire Knowledge Discovery in Databases (KDD) process. It operates as a methodological facilitator and workflow orchestrator through natural language, running automated analysis and generating interactive dashboards summarizing insights and machine learning models.",
        "mcp-features-title": "Key Features",
        "mcp-feat-1": "<strong>Multi-Agent Orquestration:</strong> LangGraph-based state machine that conditionally routes conversations between generalist and specialist agents (EDA, Data Prep MLOps, Modeler).",
        "mcp-feat-2": "<strong>MCP Universal Connectivity:</strong> Fully exposed as an MCP (Model Context Protocol) Server, allowing any compatible corporate AI ecosystem (like Claude Desktop or Cursor) to plug into the KDD engine as a delegable specialist tool.",
        "mcp-feat-3": "<strong>Isolated Code Execution:</strong> Agents delegate Python analysis to an ephemeral Docker Sandbox, ensuring perfectly safe, stateless code execution.",
        "mcp-feat-4": "<strong>Data Artifact Lineage:</strong> Persistent storage of datasets, generated charts, and models using MinIO (S3), dynamically linked back to the application state.",
        "mcp-stack-title": "Technical Architecture",
        "mcp-stack-desc": "Powered by a dual-backend architecture: an async <strong>FastAPI</strong> server orchestrating <strong>LangGraph</strong> state and Memory saving, bridged to a <strong>Streamlit</strong> UI for human experts.",
        "mcp-btn-source": "<i class='fab fa-github'></i> View Source Code",
        "mcp-btn-back": "<i class='fas fa-arrow-left'></i> Back to Projects",
        "arena-title": "ArenaLogic - Logic Gates Multiplayer",
        "arena-about-title": "About the Project",
        "arena-about-desc": "A real-time competitive multiplayer game where teams collaborate to solve logic gate challenges. Features full voice accessibility for visually impaired players using AI-powered narration and voice commands.",
        "arena-features-title": "Key Features",
        "arena-feat-1": "<strong>Real-time Multiplayer:</strong> Socket.IO powered synchronization for team-based competition (Alpha/Beta teams).",
        "arena-feat-2": "<strong>Accessibility Innovation:</strong> Complete voice control system for visually impaired players including voice commands and auto-narration.",
        "arena-feat-3": "<strong>AI Assistant:</strong> LangGraph-powered agent with conversation memory that guides players and handles voice-controlled instructions.",
        "arena-feat-4": "<strong>Advanced Game Mechanics:</strong> Multiple game modes (Competitive, Asymmetric, Campaign) and sabotage mechanics with NOT gates.",
        "arena-stack-title": "Technical Stack",
        "arena-stack-desc": "Modern real-time architecture using <strong>FastAPI</strong> and <strong>Socket.IO</strong> for the backend, with <strong>React</strong> and <strong>Framer Motion</strong> for a dynamic frontend. AI capabilities powered by <strong>OpenAI GPT-4o-mini</strong>, <strong>Whisper</strong>, and <strong>Edge-TTS</strong>.",
        "arena-btn-source": "<i class='fab fa-github'></i> View Source Code",
        "arena-btn-back": "<i class='fas fa-arrow-left'></i> Back to Projects"
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
        "about-subtitle": "IA con propósito",
        "about-desc-1": "Ingeniero de Inteligencia Artificial en la Cátedra Internacional de Inteligencia Artificial y Agricultura (CIIAA). Apasionado por investigar y desarrollar soluciones de IA que impacten positivamente en el mundo y protejan el planeta. Anteriormente he trabajado como Analista de Datos y cuento con experiencia en investigación en minería de datos y KDD.",
        "about-desc-2": "Este repositorio es un espacio de experimentación creado con la ayuda de <strong>IA Generativa</strong>. Representa mi compromiso con el aprendizaje continuo y la adaptación crítica a las nuevas tecnologías, combinando mi experiencia en ingeniería con el potencial de los agentes y LLMs.",
        "projects-title-1": "Mis",
        "projects-title-2": "Proyectos",
        "legend-dev": "En Desarrollo",
        "legend-personal": "En Proceso",
        "legend-roadmap": "Próximos Desarrollos",
        "badge-personal": "En Proceso",
        "badge-roadmap": "Próximos Desarrollos",
        "badge-dev": "En Desarrollo",
        "proj-arena-desc": "Juego competitivo multijugador en tiempo real para poner a prueba el razonamiento lógico mediante puzles de puertas booleanas.",
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
        "proj-petshop-desc": "App web dirigida por voz para gestión de inventario (Multimodal: Voz + Chat + GUI), diseñada para la accesibilidad.",
        "contact-title-2": "",
        "contact-subtitle": "Hablemos de tu próximo proyecto",
        "contact-desc": "¿Tienes una idea en mente? Estoy disponible para nuevos retos y colaboraciones.",
        "form-name": "Nombre",
        "form-email": "Email",
        "form-msg": "Mensaje",
        "form-btn": "Enviar Mensaje",
        "footer-rights": "&copy; 2024 Fernando Herrera. Todos los derechos reservados.",
        "petshop-title": "Módulo Asistente Pet Shop",
        "petshop-meta-voice": "Interacción por Voz",
        "petshop-meta-access": "Accesibilidad",
        "petshop-about-title": "Sobre el Proyecto",
        "petshop-about-desc": "Este es un módulo independiente que proporciona una plantilla de interacción multimodal (Voz + Chat + GUI) usando Python (FastAPI/LangGraph) y React (Vite/Socket.IO). Diseñado específicamente para accesibilidad, permite a los usuarios gestionar el inventario mediante lenguaje natural.",
        "petshop-features-title": "Características Clave",
        "petshop-feat-1": "<strong>Interacción Multimodal:</strong> Cambia sin problemas entre comandos de voz, chat y controles GUI tradicionales.",
        "petshop-feat-2": "<strong>Sincronización en Tiempo Real:</strong> Actualizaciones en todos los clientes al instante usando WebSockets.",
        "petshop-feat-3": "<strong>Formularios por Voz:</strong> Abre, rellena y cierra formularios usando comandos de lenguaje natural como 'Quiero registrar un nuevo producto'.",
        "petshop-feat-4": "<strong>Enfoque en Accesibilidad:</strong> Empoderando a usuarios con discapacidades auditivas o visuales para gestionar sistemas complejos de manera efectiva.",
        "petshop-stack-title": "Stack Técnico",
        "petshop-stack-desc": "Construido con un stack moderno y robusto: <strong>Backend</strong> usando FastAPI y LangGraph para flujos agénticos. <strong>Frontend</strong> usando React y Vite. Comunicación en tiempo real vía Socket.IO.",
        "petshop-btn-source": "<i class='fab fa-github'></i> Ver Código Fuente",
        "petshop-btn-back": "<i class='fas fa-arrow-left'></i> Volver a Proyectos",
        "mcp-title": "Motor KDD Conversacional",
        "mcp-about-title": "Sobre el Proyecto",
        "mcp-about-desc": "Sistema conversacional que acompaña al usuario durante el proceso de Descubrimiento de Conocimiento en Datos (KDD). Funciona como un copiloto analítico, facilitador metodológico y orquestador del workflow que guía al usuario mediante lenguaje natural, ejecuta análisis de forma automática y culmina con un dashboard interactivo.",
        "mcp-features-title": "Características Clave",
        "mcp-feat-1": "<strong>Orquestación Multi-Agente:</strong> Máquina de estados con LangGraph que enruta dinámicamente conversaciones a la función óptima (EDA, MLOps, Modeler).",
        "mcp-feat-2": "<strong>Conectividad Universal MCP:</strong> Expuesto completamente como servidor MCP (Model Context Protocol), ofreciendo sus análisis como tools estandarizados conectables a LLMs como Claude.",
        "mcp-feat-3": "<strong>Ejecución Aislada de Código:</strong> Los agentes delegan el código Python generado a un contenedor local Sandbox con persistencia Docker, asegurando ejecución atómica y segura.",
        "mcp-feat-4": "<strong>Linaje de Artefactos (S3):</strong> Almacenamiento perenne de artefactos como datasets y binarios mediante S3 enlazado localmente con el estado del workflow.",
        "mcp-stack-title": "Arquitectura Técnica",
        "mcp-stack-desc": "Desplegada desde Docker y coordinada por FastAPI al vuelo asíncrono para inyectar su estado sobre los endpoints que la UI modular Streamlit asume, sin bloqueo de estado o contención.",
        "mcp-btn-source": "<i class='fab fa-github'></i> Ver Código Fuente",
        "mcp-btn-back": "<i class='fas fa-arrow-left'></i> Volver a Proyectos",
        "arena-title": "ArenaLogic - Juego de Puertas Lógicas",
        "arena-about-title": "Sobre el Proyecto",
        "arena-about-desc": "Un juego competitivo multijugador en tiempo real donde los equipos colaboran para resolver desafíos de puertas lógicas. Cuenta con accesibilidad por voz completa para jugadores con discapacidad visual mediante narración impulsada por IA y comandos de voz.",
        "arena-features-title": "Características Clave",
        "arena-feat-1": "<strong>Multijugador en Tiempo Real:</strong> Sincronización mediante Socket.IO para competición por equipos (Alpha/Beta).",
        "arena-feat-2": "<strong>Innovación en Accesibilidad:</strong> Sistema completo de control por voz para jugadores con discapacidad visual, incluyendo comandos de voz y auto-narración.",
        "arena-feat-3": "<strong>Asistente de IA:</strong> Agente basado en LangGraph con memoria de conversación que guía a los jugadores y gestiona instrucciones por voz.",
        "arena-feat-4": "<strong>Mecánicas Avanzadas:</strong> Múltiples modos de juego (Competitivo, Asimétrico, Campaña) y mecánicas de sabotaje con puertas NOT.",
        "arena-stack-title": "Stack Técnico",
        "arena-stack-desc": "Arquitectura moderna en tiempo real usando <strong>FastAPI</strong> y <strong>Socket.IO</strong> en el backend, con <strong>React</strong> y <strong>Framer Motion</strong> para un frontend dinámico. Capacidades de IA potenciadas por <strong>OpenAI GPT-4o-mini</strong>, <strong>Whisper</strong> y <strong>Edge-TTS</strong>.",
        "arena-btn-source": "<i class='fab fa-github'></i> Ver Código Fuente",
        "arena-btn-back": "<i class='fas fa-arrow-left'></i> Volver a Proyectos"
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

// Lightbox Logic
function openLightbox(element) {
    const lightbox = document.getElementById('lightbox');

    // Clear previous content
    lightbox.innerHTML = '<i class="fas fa-times close-lightbox" onclick="closeLightbox()"></i>';

    const imgElement = element.querySelector('img');
    const videoElement = element.querySelector('video');

    if (imgElement) {
        const newImg = document.createElement('img');
        newImg.src = imgElement.src;
        newImg.alt = imgElement.alt || 'Full screen view';
        newImg.id = 'lightbox-media';
        lightbox.appendChild(newImg);
    } else if (videoElement) {
        const newVideo = document.createElement('video');
        newVideo.src = videoElement.src;
        newVideo.controls = true;
        newVideo.autoplay = true;
        newVideo.id = 'lightbox-media';
        newVideo.style.maxWidth = '90%';
        newVideo.style.maxHeight = '85vh';
        newVideo.style.borderRadius = '10px';
        newVideo.style.boxShadow = '0 0 50px rgba(0, 0, 0, 0.5)';
        newVideo.style.transform = 'scale(0.9)';
        newVideo.style.transition = 'transform 0.3s ease';
        lightbox.appendChild(newVideo);

        // Ensure animation happens
        setTimeout(() => {
            newVideo.style.transform = 'scale(1)';
        }, 50);
    }

    lightbox.classList.add('active');
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const video = lightbox.querySelector('video');
    if (video) {
        video.pause(); // Stop video playing when closing
    }
    lightbox.classList.remove('active');
}

// Close lightbox on clicking outside media
document.addEventListener('click', function (e) {
    const lightbox = document.getElementById('lightbox');
    if (e.target === lightbox) {
        closeLightbox();
    }
});
