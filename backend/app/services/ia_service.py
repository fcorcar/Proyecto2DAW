from groq import Groq
from config import Config

class IaService:
    # Inicializamos el cliente
    client = Groq(api_key=Config.GROQ_API_KEY)

    @staticmethod
    def generate_response(user_message, history=None):
        if history is None:
            history = []

        system_prompt = {
            "role": "system",
            "content": (
                "Eres 'Chat Home AI', un asistente experto ÚNICAMENTE en problemas del hogar (fontanería, electricidad, "
                "electrodomésticos, reparaciones). "
                "REGLA ABSOLUTA E INQUEBRANTABLE: Si el usuario te pregunta por cualquier otro tema "
                "(recetas, comida, dulces, matemáticas, programación, historia, etc.), NO DEBES RESPONDER A LA PREGUNTA. "
                "Bajo NINGÚN concepto des ejemplos, listas o intentes relacionarlo con el hogar. "
                "Debes responder EXCLUSIVAMENTE con esta frase exacta: "
                "'Lo siento, no puedo ayudarte con eso. Solo estoy programado para resolver dudas y problemas de mantenimiento del hogar.'"
            )
        }

        # Preparacion
        messages = [system_prompt]
        messages.extend(history)
        messages.append({"role": "user", "content": user_message})

        # Llamada a Groq
        chat_completion = IaService.client.chat.completions.create(
            messages=messages,
            model="llama-3.1-8b-instant",
            max_completion_tokens=1024,
            temperature=0.5,
            stream=False
        )

        # Respuesta
        return chat_completion.choices[0].message.content