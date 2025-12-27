from fastapi import FastAPI, HTTPException, BackgroundTasks
from pydantic import BaseModel, EmailStr
from fastapi.middleware.cors import CORSMiddleware
import os
import requests
from dotenv import load_dotenv

# Cargar variables de entorno (para desarrollo local, en Render se inyectan automáticamente)
load_dotenv()

app = FastAPI()

# Configuración CORS y Entorno
ALLOWED_ORIGINS = os.getenv("CORS_ORIGINS", "*").split(",")
MAILJET_API_KEY = os.getenv("MAILJET_API_KEY")
MAILJET_SECRET_KEY = os.getenv("MAILJET_SECRET_KEY")
SENDER_EMAIL = os.getenv("SENDER_EMAIL")
RECIPIENT_EMAIL = os.getenv("RECIPIENT_EMAIL")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelo de datos para validación
class ContactForm(BaseModel):
    user_name: str
    user_email: EmailStr
    message: str

def send_mailjet_email(form_data: ContactForm):
    """
    Función auxiliar para enviar email usando la API de Mailjet.
    No bloquea el hilo principal si se usa con BackgroundTasks.
    """
    if not MAILJET_API_KEY or not MAILJET_SECRET_KEY or not SENDER_EMAIL or not RECIPIENT_EMAIL:
        print("Error: Faltan variables de entorno de Mailjet.")
        return

    url = "https://api.mailjet.com/v3.1/send"
    auth = (MAILJET_API_KEY, MAILJET_SECRET_KEY)
    
    data = {
        "Messages": [
            {
                "From": {
                    "Email": SENDER_EMAIL,
                    "Name": "Portfolio Contact Form"
                },
                "To": [
                    {
                        "Email": RECIPIENT_EMAIL,
                        "Name": "Fernando Herrera"
                    }
                ],
                "Subject": f"Nuevo mensaje de {form_data.user_name} desde tu Portfolio",
                "TextPart": f"Nombre: {form_data.user_name}\nEmail: {form_data.user_email}\n\nMensaje:\n{form_data.message}",
                "HTMLPart": f"""
                <h3>Nuevo mensaje de contacto</h3>
                <p><strong>Nombre:</strong> {form_data.user_name}</p>
                <p><strong>Email:</strong> {form_data.user_email}</p>
                <br/>
                <p><strong>Mensaje:</strong></p>
                <p>{form_data.message}</p>
                """,
                "ReplyTo": {
                    "Email": form_data.user_email,
                    "Name": form_data.user_name
                }
            }
        ]
    }

    try:
        response = requests.post(url, auth=auth, json=data)
        response.raise_for_status()
        print(f"Email enviado correctamente. Status: {response.status_code}")
    except requests.exceptions.RequestException as e:
        print(f"Error enviando email a Mailjet: {e}")
        # En un entorno real, aquí podrías loguear el error a un servicio externo

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Portfolio Backend is running"}

@app.post("/send-email")
async def send_email(form_data: ContactForm, background_tasks: BackgroundTasks):
    """
    Endpoint para recibir el formulario.
    Usa 'BackgroundTasks' para devolver la respuesta 'OK' al usuario inmediatamente
    mientras el envío del correo se procesa en segundo plano (mejora la UX).
    """
    # Encolar la tarea de envío
    background_tasks.add_task(send_mailjet_email, form_data)
    
    return {"status": "success", "message": "Message received and processing in background."}
