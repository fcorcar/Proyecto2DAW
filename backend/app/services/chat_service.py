from app.models import db, Conversacion, Mensaje
from app.services.ia_service import IaService

class ChatService:
    @staticmethod
    def process_message(user_id, content, conversation_id=None):
        try:
            # 1. Gestiona conversacion
            if not conversation_id:
                titulo = content[:30] + "..." if len(content) > 30 else content
                conversacion = Conversacion(usuario_id=user_id, titulo=titulo)
                db.session.add(conversacion)
                db.session.flush() 
                conversation_id = conversacion.id
            else:
                conversacion = Conversacion.query.filter_by(id=conversation_id, usuario_id=user_id).first()
                if not conversacion:
                    return None, "Conversación no encontrada o no autorizada"

            # 2. Recupera historial bd
            historial_bd = Mensaje.query.filter_by(conversacion_id=conversation_id).order_by(Mensaje.id.desc()).limit(6).all()
            historial_bd.reverse()
            
            history_for_ia = []
            for msg in historial_bd: 
                role = "user" if msg.remitente == "usuario" else "assistant"
                history_for_ia.append({"role": role, "content": msg.contenido})

            # 3. Llama a groq
            ia_response = IaService.generate_response(content, history=history_for_ia)

            # 4. Si groq responde, se guarda en bd el par
            user_msg = Mensaje(conversacion_id=conversation_id, remitente='usuario', contenido=content)
            ia_msg = Mensaje(conversacion_id=conversation_id, remitente='ia', contenido=ia_response)
            db.session.add(user_msg)
            db.session.add(ia_msg)
            db.session.commit()

            return {
                "conversationId": conversation_id,
                "response": ia_response
            }, None

        except Exception as e:
            db.session.rollback()
            return None, f"Error en el proceso: {str(e)}"
    
    @staticmethod
    def get_user_conversations(user_id):
        return Conversacion.query.filter_by(usuario_id=user_id).order_by(Conversacion.id.desc()).all()

    @staticmethod
    def get_conversation_messages(user_id, conversation_id):
        conversacion = Conversacion.query.filter_by(id=conversation_id, usuario_id=user_id).first()
        if not conversacion:
            return None
        return Mensaje.query.filter_by(conversacion_id=conversation_id).all()

    @staticmethod
    def rename_conversation(user_id, conversation_id, new_title):
        conversacion = Conversacion.query.filter_by(id=conversation_id, usuario_id=user_id).first()
        if not conversacion:
            return False
        conversacion.titulo = new_title
        db.session.commit()
        return True

    @staticmethod
    def delete_conversation(user_id, conversation_id):
        conversacion = Conversacion.query.filter_by(id=conversation_id, usuario_id=user_id).first()
        if not conversacion:
            return False
        db.session.delete(conversacion)
        db.session.commit()
        return True