# Historias de Usuario Técnicas

A continuación se detallan las interacciones del usuario (frontend), especificando los eventos que disparan la acción y la respuesta visual esperada.

## HU-01: Enviar consulta al Chat IA
* **ID:** HU-01
* **Como:** Usuario registrado.
* **Quiero:** Enviar un problema técnico al chat.
* **Para:** Recibir una solución paso a paso de la IA.

**Detalle Técnico (DWEC):**
* **Evento disparador:** Evento 'submit' en el formulario de chat o tecla 'Enter' en el input de texto.
* **Objetos involucrados:** - Clase `InterfazChat`.
    - Método `enviarMensajeUsuario()`.
* **Resultado en el DOM (Visual):**
    1. Se bloquea el botón de enviar y aparece una animación de carga (spinner).
    2. Se añade inmediatamente un bloque visual (div) con el mensaje del usuario en el historial.
    3. Cuando llega la respuesta, se añade otro bloque (div) con la respuesta de la IA y la pantalla hace scroll hacia abajo automáticamente.

---

## HU-02: Crear, Eliminar, Guardar y Renombrar Conversación
* **ID:** HU-02
* **Como:** Usuario registrado.
* **Quiero:** Que mis conversaciones se guarden y poder cambiarles el título o eliminarlas.
* **Para:** Organizarlas y encontrarlas luego en el historial.

**Detalle Técnico (DWEC):**
* **Evento disparador:** Evento 'blur' (perder foco) al editar el título del chat o clic en botón "Guardar Título".
* **Objetos involucrados:**
    - Clase `ListaConversaciones`.
    - Método `actualizarTitulo(id, nuevoTitulo)`.
* **Resultado en el DOM (Visual):**
    1. El borde del título parpadea en verde para confirmar el guardado.
    2. El texto correspondiente en la barra lateral izquierda se actualiza instantáneamente sin recargar la página.

---

## HU-03: Panel de Administración (Bloquear Usuario)
* **ID:** HU-03
* **Como:** Administrador.
* **Quiero:** Bloquear el acceso a un usuario.
* **Para:** Evitar que usuarios malintencionados usen el sistema.

**Detalle Técnico (DWEC):**
* **Evento disparador:** Clic en el botón "Bloquear" dentro de la tabla de usuarios.
* **Objetos involucrados:**
    - Clase `PanelAdmin`.
    - Método `cambiarEstadoUsuario(idUsuario)`.
* **Resultado en el DOM (Visual):**
    1. Se pide confirmación (alert/modal).
    2. La fila de la tabla cambia de color (rojo) y el estado cambia a "Bloqueado".
    3. El botón cambia su texto a "Desbloquear".