# Technical Manual
Now, I am going to explain the architecture, configuration and internal functioning of the project.

## 1. Connection to the AI API
The Artificial Intelligence engine of Chat Home IA is not local. I use the Llama 3.1 model with the Groq API. I chose Groq because it is very fast and it has got many free tokens.

The flow is:
1. The user sends a message from the frontend (Angular).
2. The Python backend (Flask) receives the text.
3. The `ia_service.py` service builds the prompt with the context (it tells the model to be a home assistant).
4. I make an authenticated POST request to the Groq API. I use the API key in the environment variables (`.env`).
5. Groq processes the request with Llama 3.1. It returns the answer to the backend, and the backend sends it to the frontend to render.

## 2. HTTP Requests Management
All the communication between the client (Angular) and the server (Python) is with RESTful HTTP requests in JSON format.

* **In the Frontend (Angular):** I use `HttpClient` to manage the requests.
* **In the Backend (Python):** I use Flask routes. Every endpoint validates the input data in the request body (JSON). If there is missing data or a bad format, the backend answers with standard HTTP errors (400 Bad Request, 401 Unauthorized, etc.) and a descriptive message. Then, the frontend will show the alert.

## 3. Database and Role System
I use the SQLAlchemy ORM. The database is MySQL 8.0 and there are 3 main tables (`models.py`):

* **`usuarios`**: It saves the registration data (id, name, email, hashed password, role and a boolean `esta_bloqueado`). The `rol` field is the key for the access control.
    * If the role is `'usuario'`: You have got standard permissions. You enter the normal chat and you only see your conversations.
    * If the role is `'admin'`: The frontend opens the administration routes (protected by Guards like `isAdminAuthenticated.guard.ts`). In the backend, the panel functions have got an `@admin_required` decorator. It reads your JWT token. As an admin, you access the control panel to see global statistics and you can manage or block users.
* **`conversaciones`**: It has a 1:N relationship with users. When you start a new chat, the system creates a record with the title and the time.
* **`mensajes`**: It has a 1:N relationship with the conversation (with cascade delete). It saves the `remitente` (to know if the message is from the 'usuario' or the 'ia') and the message text.

## 4. Architecture and Deployment with Docker
I deploy the application with Docker. I put all the infrastructure in containers with `docker-compose.yml`. There are 4 simultaneous services:

1. **Frontend (`frontend`)**: The container with the Angular client application.
2. **Backend (`backend`)**: The Python API with Flask.
3. **Database (`db`)**: An official MySQL 8.0 image. I configured a volume (`db_data`) mapped to `/var/lib/mysql`. The data is persistent and it will not disappear when you stop the container.
4. **Reverse Proxy (`proxy`)**: A light Nginx server on port 80. It works like a "doorman". It redirects the traffic to Angular or Flask depending on the user route.