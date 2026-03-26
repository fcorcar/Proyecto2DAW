from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token
from app.services.user_service import UserService

class AuthService:
    @staticmethod
    def _generar_datos_sesion(usuario):
        """Método privado para la creación de tokens y formato de respuesta."""
        token = create_access_token(identity=str(usuario.id))
        return {
            "token": token,
            "usuario": {
                "id": usuario.id,
                "name": usuario.name,
                "email": usuario.email,
                "rol": usuario.rol
            }
        }

    @staticmethod
    def login(email, password):
        """Lógica de inicio de sesión."""
        # Obtener usuario por email
        usuario = UserService.get_by_email(email)
        
        # Comprobar credenciales
        if not usuario or not check_password_hash(usuario.password_hash, password):
            return None, "Email o contraseña incorrectos"

        # Comprobar bloqueos
        if usuario.esta_bloqueado:
            return None, "Esta cuenta ha sido bloqueada por un administrador"

        # Retornamos los datos de sesion
        datos_sesion = AuthService._generar_datos_sesion(usuario)
        return datos_sesion, None

    @staticmethod
    def registrar(name, email, password):
        """Lógica de registro."""
        # Comprobar si ya existe el usuario
        if UserService.get_by_email(email):
            return None, "El email ya está registrado"

        # Crear el usuario
        nuevo_usuario = UserService.create_user(name, email, password)

        # Retornamos los datos de sesion
        datos_sesion = AuthService._generar_datos_sesion(nuevo_usuario)
        return datos_sesion, None
    
    @staticmethod
    def check_status(usuario_id):
        """Lógica de comprobación de sesión."""
        # Obtener usuario por id
        usuario = UserService.get_by_id(usuario_id)
        
        # Comprobar usuario
        if not usuario:
            return None, "Usuario no válido"

        # Comprobar bloqueos
        if usuario.esta_bloqueado:
            return None, "Esta cuenta ha sido bloqueada por un administrador"

        # Retornamos los datos de sesion
        datos_sesion = AuthService._generar_datos_sesion(usuario)
        return datos_sesion, None