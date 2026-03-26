from flask import Blueprint, request, jsonify
from app.utils.validators import is_valid_email, is_valid_password
from app.services.auth_service import AuthService
from flask_jwt_extended import jwt_required, get_jwt_identity

auth_bp = Blueprint('auth', __name__)

############# RUTA REGISTRO (POST) #############
@auth_bp.route('/registro', methods=['POST'])
def registro():
    datos = request.get_json()
    email = datos.get('email')
    password = datos.get('password')
    name = datos.get('name')

    # 1. Validaciones basicas
    if not email or not password or not name:
        return jsonify({"error": "Faltan datos"}), 400
    if not is_valid_email(email):
        return jsonify({"error": "El formato del correo electrónico no es válido"}), 400
    if not is_valid_password(password):
        return jsonify({"error": "La contraseña debe tener mínimo 6 caracteres, una mayúscula, una minúscula y un número"}), 400

    # 2. Crear usuario y devolver datos de sesion
    datos_sesion, error = AuthService.registrar(name, email, password)
    
    if error:
        return jsonify({"error": error}), 409

    # 3. Respuesta JSON
    respuesta = {"mensaje": "Usuario registrado y logueado correctamente"}
    respuesta.update(datos_sesion)
    return jsonify(respuesta), 201


############# RUTA LOGIN (POST) #############
@auth_bp.route('/login', methods=['POST'])
def login():
    datos = request.get_json()
    email = datos.get('email')
    password = datos.get('password')

    # 1. Validaciones basicas
    if not is_valid_email(email) or not is_valid_password(password):
        return jsonify({"error": "Email o contraseña incorrectos"}), 401

    # 2. Comprobar si el usuario es valido para iniciar sesion y devolver datos de sesion
    datos_sesion, error = AuthService.login(email, password)

    if error:
        return jsonify({"error": error}), 401 

    # 3. Respuesta JSON
    respuesta = {"mensaje": "Login exitoso"}
    respuesta.update(datos_sesion)
    return jsonify(respuesta), 200


############# RUTA CHECK STATUS (GET) #############
@auth_bp.route('/check-status', methods=['GET'])
@jwt_required()
def check_status():
    # 1. Obtener el ID del usuario del token validado
    usuario_id = get_jwt_identity()

    # 2. Comprobar si el usuario es valido para seguir logueado y devolver datos de sesion
    datos_sesion, error = AuthService.check_status(usuario_id)

    if error:
        return jsonify({"error": error}), 401 
    
    # 3. Respuesta JSON
    respuesta = {"mensaje": "Sesión válida"}
    respuesta.update(datos_sesion)
    return jsonify(respuesta), 200


############# RUTA CHECK EMAIL (POST) #############
@auth_bp.route('/check-email', methods=['POST'])
def check_email():
    datos = request.get_json()
    email = datos.get('email')

    # 1. Validaciones basicas
    if not email:
        return jsonify({"error": "Email no proporcionado"}), 400

    # 2. Comprobar si el email esta registrado y devolver boolean
    esta_en_uso = AuthService.check_email_exists(email)

    # 3. Respuesta JSON
    return jsonify({"isTaken": esta_en_uso}), 200

