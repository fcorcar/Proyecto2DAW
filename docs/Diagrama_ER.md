# Estructura de Datos y Diagrama Entidad-Relación

A continuación se define el modelo de datos. Estas estructuras representan tanto las tablas necesarias en la Base de Datos como los objetos JSON que manipulará el navegador.

## 1. Diagrama Entidad-Relación (E/R)

Las tres entidades principales son: **Usuario**, **Conversación** y **Mensaje**.

### Entidad: Usuario (User)
Representa a las personas que acceden a la aplicación (Clientes y Administradores).

* **Estructura de Datos (Campos):**
    - `id` (Entero, Clave Primaria): Identificador único.
    - `email` (Texto): Correo para login.
    - `password_hash` (Texto): Contraseña cifrada.
    - `rol` (Texto): Puede ser "usuario" o "admin".
    - `esta_bloqueado` (Booleano): True/False. Si es True, no puede entrar.

### Entidad: Conversación (Conversation)
Representa una sesión de chat específica. Un usuario puede tener muchas conversaciones.

* **Estructura de Datos (Campos):**
    - `id` (Entero, Clave Primaria): ID del chat.
    - `usuario_id` (Entero, Clave Foránea): Vincula con la tabla Usuario.
    - `titulo` (Texto): Ej. "Problema con la lavadora".
    - `fecha_creacion` (Fecha): Para ordenar el historial.

### Entidad: Mensaje (Message)
Representa cada burbuja de texto dentro de un chat. Una conversación tiene muchos mensajes.

* **Estructura de Datos (Campos):**
    - `id` (Entero, Clave Primaria).
    - `conversacion_id` (Entero, Clave Foránea): Vincula con la tabla Conversación.
    - `remitente` (Texto): Quién lo escribió ("usuario" o "ia").
    - `contenido` (Texto Largo): El texto de la consulta o la solución técnica.
    - `timestamp` (Fecha/Hora): Momento exacto del mensaje.

---

## 2. Relaciones y Cardinalidad

Las relaciones definen cómo se conectan los datos:

1.  **Usuario (1) ---- (N) Conversaciones**
    * **Tipo:** 1:N (Uno a Muchos).
    * **Descripción:** Un solo usuario puede crear infinitas conversaciones. Cada conversación pertenece a un solo usuario.
    * **En el Cliente (JS):** Al hacer login, se carga un Array de objetos `Conversacion` asociados a ese usuario.

2.  **Conversación (1) ---- (N) Mensajes**
    * **Tipo:** 1:N (Uno a Muchos).
    * **Descripción:** Una conversación contiene múltiples mensajes (preguntas y respuestas). Un mensaje pertenece a una sola conversación.
    * **En el Cliente (JS):** Al hacer clic en una conversación del historial, se carga el Array de objetos `Mensaje` asociados a esa ID.