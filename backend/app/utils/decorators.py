from functools import wraps
from flask import jsonify
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity
from app.services.user_service import UserService

def admin_required():
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            verify_jwt_in_request()
            identidad = get_jwt_identity()
            
            # Buscamos el usuario por id
            usuario = UserService.get_by_id(identidad) 
            
            # Comprobamos si el usuario existe y si su rol es 'admin'
            if not usuario or usuario.rol != 'admin':
                return jsonify({"error": "Acceso denegado. Se requieren permisos de administrador."}), 403
                
            # Si todo esta bien, ejecuta la funcion
            return fn(*args, **kwargs)
            
        return decorator
    return wrapper