# Plan de Implementación: Backend para Formulario de Contacto

Este documento detalla el plan para implementar una arquitectura híbrida de envío de correos:
- **Local**: EmailJS (SDK Cliente).
- **Producción**: Backend propio (FastAPI + Mailjet) desplegado en la nube.

## 1. Comparativa de Plataformas de Despliegue (Gratuitas)

Para desplegar el backend (FastAPI), estas son las mejores opciones gratuitas:

| Plataforma | Ventajas | Desventajas | Recomendación |
|------------|----------|-------------|---------------|
| **Render** | Muy fácil de usar, soporta Docker/Python nativo, capa gratuita indefinida. | **"Cold Start"**: Si nadie usa la app en 15 min, se duerme. La primera petición tarda ~50s en arrancar. | ⭐ **Opción Principal** (Por simplicidad y soporte Docker). |
| **Vercel** | Rapidísimo, ideal para "Serverless Functions" (sin servidores), integración con Git. | Pensado más para Next.js/Node, aunque soporta Python. Estructura de proyecto específica. | Buena alternativa si quieres velocidad máxima. |
| **Railway** | Excelente experiencia de desarrollador. | **Ya no tiene capa gratuita indefinida** (solo créditos de prueba). | Descartado para "coste cero" a largo plazo. |
| **Fly.io** | Muy rápido, despliegue global. | Configuración algo más compleja (CLI), requiere tarjeta de crédito para validar (aunque no cobre). | Segunda opción. |

**Conclusión**: Usaremos **Render** por su equilibrio entre facilidad de uso y gratuidad, ideal para un portfolio personal.

---

## 2. Arquitectura de la Solución

### Estructura de Carpetas Sugerida
Crearemos una carpeta `backend/` dentro de tu repositorio actual (o uno nuevo si prefieres separarlo) con:
```
backend/
├── main.py           # Aplicación FastAPI
├── requirements.txt  # Dependencias (fastapi, uvicorn, requests, python-dotenv)
└── .env              # Variables de entorno (API Key de Mailjet) - NO SUBIR A GIT
```

### Lógica del Frontend (script.js)
Detectaremos el entorno en tiempo de ejecución:
1. Comprobar `window.location.hostname`.
2. Si es `localhost` o `127.0.0.1` -> Ejecutar lógica **EmailJS**.
3. Si es `fhp101ml.github.io` (Producción) -> Hacer `fetch(POST)` a la URL de Render (`https://tu-backend.onrender.com/send-email`).

## 3. Pasos de Implementación

### Fase 1: Creación del Backend (Local)
1.  Crear carpeta `backend`.
2.  Desarrollar API en FastAPI con un endpoint `/contact`.
3.  Integrar lógica de **Mailjet** para enviar el correo.
4.  Probar localmente con Swagger UI (`http://localhost:8000/docs`).

### Fase 2: Configuración de Dependencias
1.  Obtener API Key y Secret Key de **Mailjet** (necesitas cuenta gratuita).
2.  Configurar variables de entorno.

### Fase 3: Despliegue en Render
1.  Subir el código a GitHub (el backend vivirá en tu repo actual).
2.  Crear "Web Service" en Render conectado a tu repo.
3.  Configurar "Root Directory" como `backend`.
4.  Configurar variables de entorno en el panel de Render (MAILJET_API_KEY, etc.).

### Fase 4: Conexión Frontend
1.  Modificar `script.js` para incluir la lógica condicional (Local vs Prod).
2.  Actualizar la UI para manejar el estado de "Cargando" (especialmente importante en Render por el "Cold Start").

---

¿Te parece bien este plan? Si estás de acuerdo, puedo empezar preparando la estructura de la carpeta `backend` y el código de FastAPI.
