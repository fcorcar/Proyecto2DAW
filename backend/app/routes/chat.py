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

@chat_bp.route('/conversations', methods=['GET'])
@jwt_required()
def get_conversations():
    user_id = get_jwt_identity()
    conversations = ChatService.get_user_conversations(user_id)
    return jsonify([{"id": c.id, "title": c.titulo} for c in conversations]), 200

@chat_bp.route('/conversations/<int:id>/messages', methods=['GET'])
@jwt_required()
def get_messages(id):
    user_id = get_jwt_identity()
    messages = ChatService.get_conversation_messages(user_id, id)
    if messages is None:
        return jsonify({"error": "No encontrado"}), 404
    
    return jsonify([{"text": m.contenido, "sender": m.remitente} for m in messages]), 200

@chat_bp.route('/conversations/<int:id>', methods=['PATCH'])
@jwt_required()
def rename_conversation(id):
    user_id = get_jwt_identity()
    new_title = request.get_json().get('title')
    if ChatService.rename_conversation(user_id, id, new_title):
        return jsonify({"success": True}), 200
    return jsonify({"error": "No autorizado o no encontrado"}), 403

@chat_bp.route('/conversations/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_conversation(id):
    user_id = get_jwt_identity()
    if ChatService.delete_conversation(user_id, id):
        return jsonify({"success": True}), 200
    return jsonify({"error": "No autorizado o no encontrado"}), 403