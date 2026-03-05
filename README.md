# Asistente del Hogar con IA - Proyecto 2DAW

Proyecto web Full-Stack (Angular + Flask + IA) desarrollado como Proyecto Final para 2º DAW. Consiste en un asistente inteligente basado en Google Gemini diseñado para ayudar a los usuarios a resolver problemas cotidianos del hogar.

---

## Como levantar el proyecto en local

Para ejecutar este proyecto, necesitas tener instalados Node.js y Python 3. Debes abrir dos terminales distintas (una para el servidor y otra para la web).

### PASO 1: Levantar el Backend (API)

1. Abre una terminal y entra en la carpeta del backend:

cd backend


2. Crea y activa el entorno virtual:

- En Windows:
python -m venv .venv
.venv\Scripts\activate

- En Mac/Linux:
python3 -m venv .venv
source .venv/bin/activate


3. Instala las dependencias necesarias:

pip install -r requirements.txt


4. Configura las claves de seguridad:

Copia el archivo .env.example, renombralo a .env y rellena tu GOOGLE_API_KEY y una JWT_SECRET_KEY segura de al menos 32 caracteres.


5. Arranca el servidor:

python run.py

(El backend quedara escuchando peticiones en http://localhost:5000)


### PASO 2: Levantar el Frontend (Angular)

1. Abre una NUEVA terminal (dejando la del backend encendida) y entra en la carpeta del frontend:

cd frontend


2. Instala los paquetes de Node:

npm install


3. Arranca el servidor de desarrollo de Angular:

ng serve


4. Visualizar la web:

Una vez termine de compilar, abre tu navegador web y entra en: http://localhost:4200