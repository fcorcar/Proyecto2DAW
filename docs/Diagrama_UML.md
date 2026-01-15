# Diagrama de Clases UML (Arquitectura Cliente)

Diseño de las clases JavaScript (Frontend) para organizar el código sin "spaghetti code", cumpliendo el RA8.

## Definición de Clases

### 1. Clase: ServicioAPI (APIService)
**Responsabilidad:** Se encarga de hablar con el servidor (Backend Flask). Nadie más hace peticiones fetch.
* **Propiedades:**
    - `url_base`: Texto (La dirección del servidor).
* **Métodos:**
    - `post(endpoint, datos)`: Envía datos (ej. enviar mensaje, login).
    - `get(endpoint)`: Obtiene datos (ej. cargar historial).
    - `manejarError(error)`: Muestra alertas si falla la conexión.

### 2. Clase: InterfazChat (ChatInterface)
**Responsabilidad:** Controla todo lo visual de la pantalla principal del chat.
* **Propiedades:**
    - `elementosDOM`: Objeto (Guarda referencias a los botones, inputs y divs).
    - `servicioApi`: Instancia de ServicioAPI.
* **Métodos:**
    - `constructor()`: Inicia los "listeners" (detectar clics y teclas).
    - `renderizarMensaje(remitente, texto)`: Crea el HTML de la burbuja y lo pone en pantalla.
    - `mostrarCargando(estado)`: Activa o desactiva el spinner de la IA pensando.
    - `hacerScrollAbajo()`: Baja la pantalla al último mensaje.
    - `procesarEnvio()`: Coge el texto del input, lo valida y llama a la API.

### 3. Clase: GestorHistorial (HistoryManager)
**Responsabilidad:** Controla la barra lateral con la lista de chats antiguos.
* **Propiedades:**
    - `listaConversaciones`: Array (Lista de objetos conversación).
* **Métodos:**
    - `cargarHistorial()`: Pide las conversaciones a la API y las dibuja.
    - `seleccionarChat(id)`: Marca el chat activo y pide sus mensajes.
    - `editarTitulo(id, nuevoTitulo)`: Gestiona el cambio de nombre del chat.

### 4. Clase: PanelAdmin (Solo para Administradores)
**Responsabilidad:** Funciones exclusivas del administrador.
* **Propiedades:**
    - `tablaUsuarios`: Referencia a la tabla HTML.
* **Métodos:**
    - `cargarUsuarios()`: Obtiene la lista de todos los usuarios registrados.
    - `dibujarFilaUsuario(usuario)`: Crea el HTML de cada fila de la tabla.
    - `alternarBloqueo(idUsuario)`: Envía la orden de bloquear/desbloquear al servidor.

## Relaciones entre Clases

1.  **Composición:** La clase `InterfazChat` contiene una instancia de `ServicioAPI`. Necesita la API para funcionar.
2.  **Uso:** La clase `InterfazChat` utiliza la clase `GestorHistorial` para saber qué conversación cargar cuando el usuario hace clic en la barra lateral.