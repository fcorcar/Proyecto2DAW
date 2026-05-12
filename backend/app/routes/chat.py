from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.services.chat_service import ChatService

chat_bp = Blueprint('chat', __name__)

@chat_bp.route('/message', methods=['POST'])
@jwt_required()
def send_message():
    datos = request.get_json()
    content = datos.get('message')
    conversation_id = datos.get('conversationId')

    if not content:
        return jsonify({"error": "El mensaje no puede estar vacío"}), 400

    user_id = get_jwt_identity()

    # Servicio chat BD
    result, error = ChatService.process_message(user_id, content, conversation_id)

    if error:
        return jsonify({"error": error}), 500

    return jsonify(result), 200