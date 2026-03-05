from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import Config
from .models import db

jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Inicializar
    # CORS(app, resources={r"/api/*": {"origins": "http://localhost:4200"}})
    CORS(app)
    db.init_app(app)
    jwt.init_app(app)

    # Crear las tablas de la base de datos si no existen
    with app.app_context():
        db.create_all()

    # TODO: Controladores

    return app