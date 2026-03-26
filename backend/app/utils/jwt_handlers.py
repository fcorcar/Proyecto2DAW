from flask import jsonify

def register_jwt_handlers(jwt):
    """
    Registra los manejadores de errores personalizados para JWT.
    """
    
    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_payload):
        return jsonify({
            "error": "Tu sesión ha caducado. Vuelve a iniciar sesión."
        }), 401

    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        return jsonify({
            "error": "El token proporcionado no es válido."
        }), 401

    @jwt.unauthorized_loader
    def missing_token_callback(error):
        return jsonify({
            "error": "Falta el token de autorización."
        }), 401