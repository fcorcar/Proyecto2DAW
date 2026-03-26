from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timezone

db = SQLAlchemy()

class Usuario(db.Model):
    __tablename__ = 'usuarios'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    name = db.Column(db.String(90), nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    rol = db.Column(db.String(20), default='usuario') # 'usuario' o 'admin'
    esta_bloqueado = db.Column(db.Boolean, default=False)

    # Relacion 1:N con Conversacion
    conversaciones = db.relationship('Conversacion', backref='usuario', lazy=True)

class Conversacion(db.Model):
    __tablename__ = 'conversaciones'

    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False)
    titulo = db.Column(db.String(150), nullable=False, default="Nueva Conversación")
    fecha_creacion = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    # Relacion 1:N con Mensaje
    mensajes = db.relationship('Mensaje', backref='conversacion', lazy=True, cascade="all, delete-orphan")

class Mensaje(db.Model):
    __tablename__ = 'mensajes'

    id = db.Column(db.Integer, primary_key=True)
    conversacion_id = db.Column(db.Integer, db.ForeignKey('conversaciones.id'), nullable=False)
    remitente = db.Column(db.String(20), nullable=False) # 'usuario' o 'ia'
    contenido = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))