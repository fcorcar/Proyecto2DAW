from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import Config
from .models import db
from .routes.auth import auth_bp
from .routes.admin import admin_bp
from .utils.jwt_handlers import register_jwt_handlers

jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Inicializar
    # CORS(app, resources={r"/api/*": {"origins": "http://localhost:4200"}})
    CORS(app)
    db.init_app(app)
    jwt.init_app(app)
    register_jwt_handlers(jwt)

    # Crear las tablas de la base de datos si no existen
    with app.app_context():
        db.create_all()

    # Rutas
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(admin_bp, url_prefix='/api/admin')

    return app