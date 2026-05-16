# Manual Técnico
A continuación detallo la arquitectura, configuración y funcionamiento interno del proyecto.

## 1. Conexión a la API de la IA
El motor de inteligencia artificial de Chat Home IA no se ejecuta en local, sino que hace uso del modelo **Llama 3.1** mediante la API de **Groq**. Se ha elegido Groq por su altísima velocidad de respuesta y por la cantidad de tokens gratuitos en su versión free.

El flujo es el siguiente:
1. El usuario envía un mensaje desde el frontend (Angular).
2. El backend en Python (Flask) recibe el texto.
3. El servicio `ia_service.py` construye el *prompt* inyectando el contexto necesario (indicando al modelo que actúe como un asistente del hogar).
4. Se realiza una petición POST autenticada a la API de Groq usando la clave de API configurada en las variables de entorno (`.env`).
5. Groq procesa la solicitud con Llama 3.1 y devuelve la respuesta al backend, que a su vez se la envía al frontend para ser renderizada.

## 2. Manejo de Peticiones HTTP
Toda la comunicación entre el cliente (Angular) y el servidor (Python) se realiza mediante peticiones HTTP RESTful en formato JSON.

* **En el Frontend (Angular):** Se utiliza `HttpClient` para gestionar las peticiones.
* **En el Backend (Python):** Se utilizan las rutas de Flask. Cada *endpoint* valida los datos de entrada recibidos en el cuerpo de la petición (JSON). Si falta algún dato o el formato es incorrecto, el backend responde con códigos de error HTTP estándar (400 Bad Request, 401 Unauthorized, etc.) y un mensaje descriptivo para que el frontend pueda mostrar la alerta correspondiente.

## 3. Base de Datos y Sistema de Roles
Utilizo el ORM SQLAlchemy. La base de datos es MySQL 8.0 y está estructurada en 3 tablas principales bastante claras (`models.py`):

* **`usuarios`**: Guarda los datos del registro (id, nombre, email, contraseña hasheada, rol y un booleano `esta_bloqueado`). Aquí está la clave del control de acceso con el campo `rol`.
    * Si el rol es `'usuario'`: Tienes permisos estándar. Entras al chat normal y corriente, y solo puedes acceder a tus propias conversaciones.
    * Si el rol es `'admin'`: El frontend te abre las rutas de administración (protegidas por *Guards* como `isAdminAuthenticated.guard.ts`). En el backend, las funciones del panel están protegidas con un decorador `@admin_required` que lee tu token JWT. Como admin, accedes al panel de control para ver estadísticas globales y gestionar/bloquear al resto de usuarios.
* **`conversaciones`**: Relacionada 1:N con los usuarios. Cada vez que inicias un chat nuevo, se crea un registro con su título y su marca de tiempo.
* **`mensajes`**: Relacionada 1:N con la conversación (con borrado en cascada). Guarda el `remitente` (para saber si el mensaje lo escribió el 'usuario' o la 'ia') y el texto del mensaje.


## 4. Arquitectura y Despliegue con Docker
La aplicación se despliega usando Docker. He metido toda la infraestructura en contenedores usando `docker-compose.yml`. El ecosistema se levanta con 4 servicios simultáneos:

1. **Frontend (`frontend`)**: El contenedor que sirve la aplicación cliente en Angular.
2. **Backend (`backend`)**: La API en Python construida con Flask.
3. **Base de Datos (`db`)**: Una imagen oficial de MySQL 8.0. Le he configurado un volumen (`db_data`) mapeado a `/var/lib/mysql` para que los datos sean persistentes y no se borren cada vez que apagas el contenedor.
4. **Proxy Inverso (`proxy`)**: Un servidor Nginx ligero escuchando en el puerto 80. Su trabajo es hacer de "portero" y redirigir el tráfico a Angular o a Flask dependiendo de la ruta que pida el usuario.


