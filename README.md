# Portfolio - Fernando Herrera (fhp101ml)

Bienvenido al repositorio de mi portfolio personal, desplegado en [fhp101ml.github.io](https://fhp101ml.github.io).  
Este proyecto sirve como carta de presentación profesional y demostración técnica de mis habilidades en **Inteligencia Artificial**, **Desarrollo de Agentes** y **Ingeniería de Software**.

---

## 🚀 Tecnologías y Arquitectura

El sitio utiliza una arquitectura híbrida moderna, optimizada para rendimiento y seguridad:

*   **Frontend**:
    *   HTML5 semántico y CSS3 moderno (Glassmorphism, Grid/Flexbox).
    *   JavaScript Vanilla (ES6+) para lógica interactiva y animaciones.
    *   **Google ReCAPTCHA v2** para protección contra spam.
    *   **ScrollReveal & ScrollSpy** para una experiencia de navegación fluida.

*   **Backend (Híbrido)**:
    *   **Entorno Local (Dev)**: Integración directa con **EmailJS** (SDK Cliente) para envío rápido sin servidor.
    *   **Producción (Prod)**: Backend personalizado desplegado en **Render.com**.
        *   **Framework**: FastAPI (Python).
        *   **Servicio de Email**: Mailjet API.
        *   **Seguridad**: Validación de datos con Pydantic y gestión de CORS.

---

## 🔒 Seguridad y Configuraciones Críticas

Este proyecto implementa varias capas de seguridad que deben mantenerse al realizar cambios:

### 1. Content Security Policy (CSP)
En `index.html`, la etiqueta `<meta http-equiv="Content-Security-Policy">` define estrictamente qué dominios pueden ejecutar scripts o recibir conexiones.
**IMPORTANTE**: Si cambias el backend o añades servicios externos, debes actualizar esta política.
*   `connect-src`: Permite conexiones a `api.emailjs.com` y a nuestro backend en `*.onrender.com`.
*   `script-src`: Restringido a scripts propios, Google Recaptcha y EmailJS.

### 2. Variables de Entorno (.env)
*   Las claves sensibles (API Keys de Mailjet, claves secretas) **NUNCA** se suben al repositorio.
*   Están incluidas en `.gitignore`.
*   Para despliegue, se configuran directamente en el panel de control de Render.

---

## 📂 Estructura del Proyecto

*   `index.html`: Estructura principal y contenido.
*   `style.css`: Estilos globales, variables CSS y diseño responsive.
*   `script.js`:
    *   Lógica de traducción (i18n) Inglés/Español.
    *   Detección de entorno (Local vs Producción) para el envío de formularios.
    *   Manejo de UI (glitch effect, scroll animations).
*   `backend/`: Código fuente del servicio FastAPI.
    *   `main.py`: Endpoints y lógica de negocio.
    *   `requirements.txt`: Dependencias de Python.
    *   `README_RENDER.md`: Guía específica para desplegar el backend.

---

## 🛠️ Desarrollo Local

1.  **Clonar el repositorio**:
    ```bash
    git clone https://github.com/fhp101ml/fhp101ml.github.io.git
    cd fhp101ml.github.io
    ```

2.  **Ejecutar Frontend**:
    Simplemente abre `index.html` en tu navegador o usa una extensión como "Live Server" en VS Code.
    *   *Nota*: Estando en `localhost`, el formulario usará automáticamente EmailJS.

3.  **Ejecutar Backend (Opcional)**:
    Si deseas probar la API de Python localmente:
    ```bash
    cd backend
    pip install -r requirements.txt
    uvicorn main:app --reload
    ```
    (Requiere configurar un archivo `.env` en la carpeta `backend/` con las credenciales de Mailjet).

---

## 🌐 Proyectos Destacados (Roadmap)
El portfolio incluye una sección de proyectos categorizados por estado:
*   🟣 **Personal Roadmap**: Proyectos clave en desarrollo activo.
*   ⚪ **Roadmap (Ideas)**: Conceptos y arquitecturas futuras (ej. *LLM Chatbot API*, *Multi-Agent Systems*).
*   **Destacados**:
    *   **MCP AI Data Agent**: Análisis de datos end-to-end con ejecución de código.
    *   **RAG Production Stack**: Arquitectura RAG robusta y observable.

---

© 2024 Fernando Herrera.
