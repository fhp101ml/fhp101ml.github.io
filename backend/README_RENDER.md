# Guía de Despliegue en Render para FastAPI

Este documento explica paso a paso cómo configurar y desplegar el backend de FastAPI en Render.com para gestionar el envío de correos.

## Pasos Previos
1.  Asegúrate de que la carpeta `backend/` contenga:
    *   `main.py`: Tu código de la API.
    *   `requirements.txt`: Lista de dependencias (`fastapi`, `uvicorn`, `gunicorn`, `httpx`, etc.).
2.  Ten a mano tus credenciales de **Mailjet** (API Key y Secret Key).

## 1. Crear Servicio en Render
1.  Inicia sesión en [Render.com](https://render.com/).
2.  Haz clic en **"New +"** y selecciona **"Web Service"**.
3.  Conecta tu repositorio de GitHub (`fhp101ml/fhp101ml.github.io`).

## 2. Configurar el Web Service
Rellena los campos con la siguiente configuración:

*   **Name**: Un nombre identificativo (ej: `portfolio-backend`).
*   **Region**: `Frankfurt` (o la más cercana a tu público, para Europa suele ser Frankfurt).
*   **Branch**: `main` (o la rama donde esté tu código final).
*   **Root Directory**: `backend` (IMPORTANTE: Esto le dice a Render que el proyecto Python está dentro de esta subcarpeta).
*   **Runtime**: `Python 3`.
*   **Build Command**: `pip install -r requirements.txt` (Render instalará las dependencias).
*   **Start Command**: `gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app`
    *   *Nota*: Usamos `gunicorn` con workers `uvicorn` para producción. Asegúrate de que `gunicorn` esté en tu `requirements.txt`.
*   **Instance Type**: `Free` (o el plan que prefieras).

## 3. Variables de Entorno (Environment Variables)
Esta es la parte crucial. Haz clic en la sección **"Environment Variables"** y añade las siguientes claves (cuyos valores obtendrás de Mailjet):

| Key | Value | Descripción |
|-----|-------|-------------|
| `MAILJET_API_KEY` | `descifrado_de_tu_cuenta` | Tu API Key pública de Mailjet. |
| `MAILJET_SECRET_KEY` | `descifrado_de_tu_cuenta` | Tu Secret Key privada de Mailjet. |
| `SENDER_EMAIL` | `tu_email_verificado@mailjet.com` | El email que registraste en Mailjet como remitente (DEBE estar validado allí). |
| `RECIPIENT_EMAIL` | `fhp101ml@gmail.com` | El correo donde quieres RECIBIR los mensajes del formulario. |
| `CORS_ORIGINS` | `https://fhp101ml.github.io` | Dominios permitidos para llamar a tu API. Puedes poner `*` para pruebas, pero mejor restringir. |

## 4. Desplegar
Haz clic en **"Create Web Service"**.

*   Render comenzará a construir tu aplicación.
*   En los **Logs**, verás el proceso de instalación de `pip` y finalmente "Build successful".
*   Cuando termine, verás un estado verde de **"Live"** y una URL arriba a la izquierda tipo `https://portfolio-backend-xyz.onrender.com`.

## 5. Pruebas y Uso
Copia esa URL generada por Render. Esa será la que usarás en tu frontend (`script.js`) para hacer las peticiones `POST`.

Ejemplo de endpoint:
`https://portfolio-backend-xyz.onrender.com/send-email`

---
**Nota sobre el "Cold Start"**: En el plan gratuito, si la API no recibe tráfico en 15 minutos, se "duerme". La siguiente petición tardará unos 50-60 segundos en despertar el servicio. Ten esto en cuenta para mostrar un mensaje de "Enviando..." en tu frontend.
