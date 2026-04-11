from app.models import db, Usuario
from werkzeug.security import generate_password_hash

class UserService:
    @staticmethod
    def get_by_email(email):
        """Busca y devuelve un usuario por su email."""
        return Usuario.query.filter_by(email=email).first()

    @staticmethod
    def create_user(name, email, password):
        """Crea un nuevo usuario, hashea la contraseña y lo guarda en la BD."""
        password_encriptada = generate_password_hash(password)
        
        nuevo_usuario = Usuario(
            name=name,
            email=email, 
            password_hash=password_encriptada
        )
        db.session.add(nuevo_usuario)
        db.session.commit()
        
        return nuevo_usuario
    
    @staticmethod
    def get_by_id(usuario_id):
        """Busca y devuelve un usuario por su id."""
        return Usuario.query.get(usuario_id)
    
    @staticmethod
    def get_all_users():
        """Devuelve todos los usuarios."""
        return Usuario.query.all()