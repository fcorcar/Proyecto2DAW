from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from app.models import db, Usuario
from app.utils.validators import is_valid_email, is_valid_password

# Creamos el Blueprint
auth_bp = Blueprint('auth', __name__)

############# RUTA REGISTRO (POST) #############
@auth_bp.route('/registro', methods=['POST'])
def registro():
    # 1. Recoger los datos JSON que envia Angular
    datos = request.get_json()
    email = datos.get('email')
    password = datos.get('password')
    name = datos.get('name')

    # Validar que nos envia todo
    if not email or not password or not name:
        return jsonify({"error": "Faltan datos"}), 400
    
    # Validar el email
    if not is_valid_email(email):
        return jsonify({"error": "El formato del correo electrónico no es válido"}), 400

    # Validar contraseña  
    if not is_valid_password(password):
        return jsonify({"error": "La contraseña debe tener mínimo 6 caracteres, una mayúscula, una minúscula y un número"}), 400

    # 2. Comprobar si el usuario ya existe en la bd
    usuario_existente = Usuario.query.filter_by(email=email).first()
    if usuario_existente:
        return jsonify({"error": "El email ya está registrado"}), 409

    # 3. Encriptar la contraseña
    password_encriptada = generate_password_hash(password)

    # 4. Crear el nuevo usuario
    nuevo_usuario = Usuario(
        name=name,
        email=email, 
        password_hash=password_encriptada,
        rol='usuario' 
    )

    # 5. Guardar en la bd
    db.session.add(nuevo_usuario)
    db.session.commit()

    # 6. Devolvemos un mensaje de exito a Angular
    return jsonify({"mensaje": "Usuario registrado correctamente"}), 201


############# RUTA LOGIN (POST) #############
@auth_bp.route('/login', methods=['POST'])
def login():
    # 1. Recoger los datos JSON que envia Angular
    datos = request.get_json()
    email = datos.get('email')
    password = datos.get('password')

    # Valida el email y la contraseña
    if not is_valid_email(email) or not is_valid_password(password):
        return jsonify({"error": "Email o contraseña incorrectos"}), 401

    # 2. Comprobar si el usuario existe y si la contraseña coincide con el hash
    usuario = Usuario.query.filter_by(email=email).first()
    if not usuario or not check_password_hash(usuario.password_hash, password):
        return jsonify({"error": "Email o contraseña incorrectos"}), 401

    # 3. Comprobar si esta bloqueado
    if usuario.esta_bloqueado:
        return jsonify({"error": "Esta cuenta ha sido bloqueada por un administrador"}), 403

    # 4. Generar el Token
    access_token = create_access_token(identity=str(usuario.id))

    # 5. Devolver el Token y los datos del usuario a Angular
    return jsonify({
        "mensaje": "Login exitoso",
        "token": access_token,
        "usuario": {
            "id": usuario.id,
            "name": usuario.name,
            "email": usuario.email,
            "rol": usuario.rol
        }
    }), 200