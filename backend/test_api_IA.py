from dotenv import load_dotenv
from google import genai
import os

# Cargar variables de entorno
load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")

# Crear cliente con la API Key
client = genai.Client(api_key=api_key)

# Modelo gratuito recomendado
model_name = "gemini-2.0-flash"

response = client.models.generate_content(
    model=model_name,
    contents="Dime los componentes principales de un ordenador, muy resumido"
)

print(response.text)
