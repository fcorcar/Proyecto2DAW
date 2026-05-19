# Chat Home IA - Guía de Despliegue con Docker V2

![Configuración Nginx](./docs/imgs/ChatHomeIA.png)

Chat Home IA es una aplicación web diseñada como un asistente virtual inteligente especializado en la resolución de tareas y gestión de incidencias del hogar. El ecosistema está compuesto por una interfaz desarrollada en Angular 19, un backend robusto en Flask (Python) encargado de conectar con los modelos de lenguaje mediante la API de Groq, y un almacenamiento relacional con MariaDB/MySQL. La infraestructura completa se encuentra contenedorizada mediante Docker y unificada tras un proxy inverso con Nginx.



<br>



## Requisitos previos
Antes de comenzar con la instalación, es necesario asegurarse de tener instalados estos dos programas en el equipo:

1. Git (para poder clonar y descargar el código fuente).
* Linux: `sudo apt install git -y`
* Windows: Descargar desde la web oficial. https://git-scm.com/install/windows

2. Docker V2 (el motor que ejecutará la aplicación).
* Linux: 
    ```bash
    # 1. Actualizar los paquetes e instalar dependencias necesarias
    sudo apt update
    sudo apt install ca-certificates curl -y

    # 2. Añadir la clave GPG oficial de Docker
    sudo install -m 0755 -d /etc/apt/keyrings
    sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
    sudo chmod a+r /etc/apt/keyrings/docker.asc

    # 3. Añadir el repositorio oficial a las fuentes de apt
    echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
    $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
    sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

    # 4. Instalar Docker Engine y el plugin moderno de Compose
    sudo apt update
    sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y
    ```
* Windows: Descargar desde la web oficial. https://docs.docker.com/desktop/setup/install/windows-install/



<br>



## Guía paso a paso para Linux (Ubuntu)

### 1. Descargar el repositorio y entrar a la carpeta del proyecto

```bash
git clone https://github.com/fcorcar/Proyecto2DAW.git
cd Proyecto2DAW
```

### 2. Configurar el direccionamiento del dominio local
Para que el proxy de Nginx intercepte correctamente las llamadas de la aplicación, añadimos el dominio local:

```bash
echo "127.0.0.1   cortes-carmona-francisco.proyecto-daw.iesabdera.local" | sudo tee -a /etc/hosts > /dev/null
```

### 3. Configurar las variables de entorno
Crea tu archivo de configuración personal a partir de la plantilla del proyecto:

```bash
cp .env.example .env
```

Abre el archivo `.env` y rellena los campos con tus credenciales reales.


### 4. Construir y levantar la aplicación completa
```bash
sudo docker compose up -d --build
```


<br>



## Guía paso a paso para Windows
### 1. Descargar el repositorio y entrar a la carpeta del proyecto
```bash
git clone https://github.com/fcorcar/Proyecto2DAW.git
cd Proyecto2DAW
```

### 2. Configurar el direccionamiento del dominio local
1. Abre el Bloc de notas como administrador.
2. Ve a `C:\Windows\System32\drivers\etc\hosts`.
3. Añade esta línea:

```bash
127.0.0.1   cortes-carmona-francisco.proyecto-daw.iesabdera.local
```

### 3. Configurar las variables de entorno
```bash
copy .env.example .env
```

Edita el archivo `.env` con tus datos.


### 4. Construir y levantar la aplicación completa
```bash
docker compose up -d --build
```


<br>



## Acceso a Chat Home IA
Accede desde el navegador mediante:

http://cortes-carmona-francisco.proyecto-daw.iesabdera.local



<br>



## Comandos útiles para la gestión del entorno
Ver estado de los contenedores:

```bash
sudo docker compose ps
```

Detener la aplicación:

```bash
sudo docker compose stop
```

Arrancar servicios:

```bash
sudo docker compose start
```

Eliminar contenedores:

```bash
sudo docker compose down
```

Ver logs en tiempo real:

```bash
sudo docker compose logs -f
```



<br>



## Posibles errores o conflictos
A la hora de instalar Docker V2 en Ubuntu puede haber algunos conflictos o errores debido a paquetes antiguos u obsoletos.

### Conflicto de versiones
Si cuentas con la V1 y quieres realizar una actualización a la V2 debes ejecutar lo siguiente:
```bash
# ELIMINACION V1
#1. Detener y borrar los contenedores y volúmenes actuales
sudo docker-compose down -v

#2. Desinstalar los paquetes antiguos de Ubuntu
sudo apt-get remove docker docker-engine docker.io containerd runc docker-compose -y
sudo apt-get autoremove -y

#3. Borrar el rastro
sudo rm -rf /var/lib/docker
sudo rm -rf /var/lib/containerd

#4. Limpieza profunda
sudo apt-get purge docker.io docker-compose python3-compose python3-docker python3-dockerpty -y
sudo apt-get autoremove --purge -y

#5. Limpiar la memoria de la terminal
hash -r

# INSTALACION V2
# 1. Actualizar los paquetes e instalar dependencias necesarias
sudo apt update
sudo apt install ca-certificates curl -y

# 2. Añadir la clave GPG oficial de Docker
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# 3. Añadir el repositorio oficial a las fuentes de apt
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 4. Instalar Docker Engine y el plugin moderno de Compose
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y

```

### Error "Cannot connect to the Docker daemon"
El problema surge porque el servicio de Docker está apagado, solo hay que levantarlo con el siguiente comando:

```bash
sudo systemctl enable --now docker
```