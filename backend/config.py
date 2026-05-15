import os
from dotenv import load_dotenv
from datetime import timedelta

# Cargar variables del .env
load_dotenv()

class Config:
    # Clave secreta para JWT (Tokens)
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=60)
    
    # Configuracion de Base de Datos
    DB_USER = os.environ.get('DB_USER')
    DB_PASSWORD = os.environ.get('DB_PASSWORD')
    DB_HOST = os.environ.get('DB_HOST')
    DB_NAME = os.environ.get('DB_NAME')
    SQLALCHEMY_DATABASE_URI = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # API Key de Groq
    GROQ_API_KEY = os.getenv("GROQ_API_KEY")

    # Credenciales Admin
    ADMIN_NAME = os.getenv("ADMIN_NAME")
    ADMIN_EMAIL = os.getenv("ADMIN_EMAIL")
    ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")