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

############# RUTA OBTENER ESTADISTICAS (GET) #############
@admin_bp.route('/stats', methods=['GET'])
@admin_required()
def get_stats():
    stats = UserService.get_admin_stats()
    return jsonify(stats), 200

############# RUTA PARA CAMBIAR ESTADO DE BLOQUEO (PATCH) #############
@admin_bp.route('/usuarios/<int:id>/toggle-block', methods=['PATCH'])
@admin_required()
def toggle_user_block(id):
    usuario, error = UserService.toggle_user_block(id)
    
    if error:
        return jsonify({"error": error}), 400
    
    return jsonify({
        "mensaje": "Estado de usuario actualizado",
        "esta_bloqueado": usuario.esta_bloqueado
    }), 200