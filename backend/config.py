import os
from dotenv import load_dotenv

# Cargar variables del .env
load_dotenv()

class Config:
    # Clave secreta para JWT (Tokens)
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "cEnG3kJ5aCCOYON3lw5KX5HtSBgkQrvXoD7jxuIFA78=")
    
    # Configuracion de Base de Datos SQLite
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(BASE_DIR, 'database.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # API Key de Google
    GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")