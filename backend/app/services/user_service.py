from app.models import db, Usuario, Conversacion, Mensaje
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
    
    @staticmethod
    def get_admin_stats():
        """Obtiene el conteo total de las tablas principales."""
        return {
            "totalUsuarios": Usuario.query.count(),
            "totalConversaciones": Conversacion.query.count(),
            "totalMensajes": Mensaje.query.count()
        }
    
    @staticmethod
    def toggle_user_block(usuario_id):
        usuario = Usuario.query.get(usuario_id)
        
        if not usuario:
            return None, "Usuario no encontrado"
        
        if usuario.rol == 'admin':
            return None, "No se puede bloquear a un administrador"

        usuario.esta_bloqueado = not usuario.esta_bloqueado
        db.session.commit()
        
        return usuario, None