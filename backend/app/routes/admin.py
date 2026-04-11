from flask import Blueprint, jsonify
from app.utils.decorators import admin_required
from app.services.user_service import UserService

admin_bp = Blueprint('admin', __name__)

############# RUTA OBTENER TODOS LOS USUARIOS (GET) #############
@admin_bp.route('/usuarios', methods=['GET'])
@admin_required()
def get_all_users():
    usuarios = UserService.get_all_users()
    
    lista_usuarios = [{
        "id": u.id,
        "name": u.name,
        "email": u.email,
        "rol": u.rol,
        "esta_bloqueado": u.esta_bloqueado
    } for u in usuarios]
    
    return jsonify(lista_usuarios), 200