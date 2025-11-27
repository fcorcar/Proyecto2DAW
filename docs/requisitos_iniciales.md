# Requisitos Iniciales del Proyecto
**Proyecto:** Agente de IA especializado en problemas del hogar  
**Autor:** Francisco José Cortés Carmona – 2º DAW  

---

## 1. Introducción
Este documento describe los **requisitos iniciales** del proyecto, con el fin de establecer las funcionalidades, condiciones y restricciones necesarias para el desarrollo de una aplicación web que integre un agente de IA (Gemini) capaz de ayudar a los usuarios en tareas y problemas del hogar.

---

## 2. Requisitos Funcionales
1. **Interacción con el usuario**
   - El sistema debe permitir que el usuario haga preguntas o consulte dudas sobre el hogar mediante un chat.  
   - El agente debe responder con claridad, precisión y de manera contextualizada.

2. **Conexión con la IA**
   - El backend debe comunicarse con la API de Gemini para generar respuestas.  
   - El sistema debe manejar errores de conexión o respuesta de la API.

3. **Gestión de datos**
   - Posibilidad de guardar historiales de conversación opcionalmente.  
   - Posibilidad de registrar preferencias o configuraciones del usuario.

4. **Interfaz de usuario**
   - Debe ser clara, intuitiva y responsiva.  
   - Compatible con dispositivos móviles y escritorio.

---

## 3. Requisitos No Funcionales
1. **Rendimiento**
   - Respuesta del agente en menos de 3 segundos.  
   - Sistema estable durante uso normal.

2. **Seguridad**
   - Protección básica de datos y comunicación segura con la API.  
   - Cumplimiento de normas de privacidad (RGPD).

3. **Mantenibilidad**
   - Código organizado y documentado.  
   - Posibilidad de ampliar funcionalidades futuras.

---

## 4. Requisitos Técnicos
- **Backend:** Flask o FastAPI (Python).  
- **Frontend:** Angular o HTML, CSS y JavaScript puro.  
- **Framework de estilos:** Bootstrap o Tailwind CSS.  
- **Inteligencia Artificial:** API de Gemini.  
- **Base de datos:** MySQL/MariaDB (opcional).  
- **Control de versiones:** Git y GitHub.  
- **Hosting:** Servidor sencillo o local para desarrollo.

---

## 5. Restricciones
- No realizar diagnósticos profesionales que requieran técnicos especializados (electricidad, gas, fontanería compleja).  
- Las respuestas del agente deben incluir disclaimers cuando sean instrucciones que puedan implicar riesgos.  
- Dependencia de la API de Gemini, por lo que se requiere conexión a Internet.

---

## 6. Priorización
| Requisito | Prioridad |
|-----------|-----------|
| Interacción con el usuario | Alta |
| Conexión con Gemini | Alta |
| Interfaz responsiva | Media |
| Gestión de datos | Media |
| Seguridad básica | Alta |
| Historial de conversaciones | Baja |
| Futuras ampliaciones | Baja |

---

## 7. Conclusión
Estos requisitos iniciales definen las bases para el desarrollo del proyecto y permiten planificar las fases de implementación, priorizando funcionalidades esenciales para que el agente de IA sea útil, seguro y funcional dentro del marco de 2DAW.
