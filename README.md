<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="https://i.postimg.cc/V5PvZqwT/Screenshot-2025-05-15-15-58-34-2726x768.png" alt="Logo" >
  </a>

<h3 align="center">Emitto</h3>
  <p align="center">
  API de envíos de correos electrónicos masivos. Permite enviar notificaciones, boletines u otras comunicaciones de forma sencilla a múltiples destinatarios.
</div>

<!-- ABOUT THE PROJECT -->

## Acerca del proyecto

[![Screenshot-2025-05-13-16-13-10-2726x768.png](https://i.postimg.cc/gJC6rgdG/Screenshot-2025-05-13-16-13-10-2726x768.png)](https://postimg.cc/LYVsbBnW)

Este proyecto es una API RESTful para el envío de correos electrónicos masivos, diseñada para facilitar la comunicación eficiente y automatizada con múltiples usuarios o clientes. Es ideal para organizaciones, instituciones educativas, sistemas administrativos y aplicaciones web que requieren funcionalidades de notificación o difusión por correo electrónico.

### 🚀 Funcionalidades Principales

Este servicio API está diseñado para gestionar el envío automatizado de correos masivos y validaciones seguras mediante claves secretas. Las funcionalidades disponibles actualmente son:

#### 🔐 Autenticación

- Login de usuarios (admin) con JWT.
- Soporte para estrategias de autenticación con `passport-local` y `passport-jwt`.
- Generación y verificación de tokens seguros.

#### ✉️ Envío de Correos

- Envío de correos individuales o masivos utilizando `nodemailer` y `@nestjs-modules/mailer`.
- Integración con colas `Bull` para envío asíncrono y controlado.
- Visualización del estado de las tareas de envío mediante Bull Board - QueueDash.

#### 🔑 Gestión de Secret Keys

- CRUD completo de claves (crear, obtener, actualizar y eliminar).
- Uso de claves secretas en cabeceras HTTP (`x-key-emitto`) para validar el origen autorizado de las solicitudes de envío de correos.

#### 🛠️ Otras funcionalidades

- Documentación interactiva-moderna generada con openapi (`/openapi`).
- Monitor de colas (`/queuedash`) para visualizar trabajos activos, pendientes y fallidos.
- Manejo de errores estructurado y validación de datos con `class-validator`.

### 🛠️ Tecnologías

Este proyecto utiliza un stack moderno basado en **Node.js** y **NestJS**, junto con herramientas para colas, correos, autenticación y documentación.

#### 📦 Backend Principal

- [![Express](https://img.shields.io/badge/-Express-000000?logo=express&logoColor=white)](https://expressjs.com/es/) Adaptador HTTP para NestJS.
- [![NestJS](https://img.shields.io/badge/-NestJS-E0234E?logo=nestjs&logoColor=white)](https://nestjs.com/) Framework progresivo para construir APIs escalables en Node.js.
- [![Sequelize](https://img.shields.io/badge/-Sequelize-52B0E7?logo=sequelize&logoColor=white)](https://sequelize.org/) ORM para PostgreSQL.
- [![Sequelize-TypeScript](https://img.shields.io/badge/-Sequelize--TypeScript-3178C6?logo=typescript&logoColor=white)](https://sequelize.org/docs/v6/other-topics/typescript/) Integración de Sequelize con TypeScript.
- [![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-336791?logo=postgresql&logoColor=white)](https://www.postgresql.org/) Sistema de base de datos relacional.

#### ✉️ Envío de Correos

- [![NestJS Mailer](https://img.shields.io/badge/-NestJS--Mailer-E0234E?logo=nestjs&logoColor=white)](https://www.npmjs.com/package/@nestjs-modules/mailer)
  Módulo de NestJS para enviar correos electrónicos.
- [![Nodemailer](https://img.shields.io/badge/-Nodemailer-00965E?logo=gmail&logoColor=white)](https://nodemailer.com/) Biblioteca para el envío de correos a través de SMTP.

#### 🧵 Tareas y Procesamiento Asíncrono

- [![Bull](https://img.shields.io/badge/-Bull-FF0000?logo=bullhorn&logoColor=white)](https://github.com/OptimalBits/bull) Sistema de colas basado en Redis.
- [![Bull Board](https://img.shields.io/badge/-Bull_Board-FF4500?logo=react&logoColor=white)](https://github.com/vcapretz/bull-board) Panel visual para monitorear colas Bull.
- [![QueueDash](https://img.shields.io/badge/-QueueDash-0078D7?logo=queue&logoColor=white)](https://queuedash.io/) Panel visual para monitorear colas Bull.
- [![Redis](https://img.shields.io/badge/-Redis-DC382D?logo=redis&logoColor=white)](https://redis.io/) Almacenamiento clave-valor para procesamiento asíncrono.

#### 🔐 Autenticación y Seguridad

- [![Passport](https://img.shields.io/badge/-Passport-34495E?logo=passport&logoColor=white)](http://www.passportjs.org/) Middleware de autenticación.
- [![NestJS Passport](https://img.shields.io/badge/-NestJS--Passport-E0234E?logo=nestjs&logoColor=white)](https://www.npmjs.com/package/@nestjs/passport) Integración de Passport con NestJS.
- [![NestJS JWT](https://img.shields.io/badge/-NestJS--JWT-E0234E?logo=nestjs&logoColor=white)](https://www.npmjs.com/package/@nestjs/jwt) JWT con soporte para NestJS.
- [![bcrypt](https://img.shields.io/badge/-bcrypt-6DB33F?logo=bcrypt&logoColor=white)](https://www.npmjs.com/package/bcrypt) [![bcryptjs](https://img.shields.io/badge/-bcryptjs-F7DF1E?logo=javascript&logoColor=black)](https://www.npmjs.com/package/bcryptjs) Encriptación de contraseñas.

#### 📑 Validación y Transformación

- [![class-validator](https://img.shields.io/badge/-class--validator-6F42C1?logo=typescript&logoColor=white)](https://github.com/typestack/class-validator) Validación de DTOs y clases.
- [![class-transformer](https://img.shields.io/badge/-class--transformer-6F42C1?logo=typescript&logoColor=white)](https://github.com/typestack/class-transformer) Transformación de objetos y clases.

#### 📘 Documentación

- [![NestJS Swagger](https://img.shields.io/badge/-NestJS--Swagger-E0234E?logo=nestjs&logoColor=white)](https://www.npmjs.com/package/@nestjs/swagger) Generador Swagger para NestJS.
- [![OpenAPI Client](https://img.shields.io/badge/-OpenAPI--Client-6BA539?logo=openapi&logoColor=white)](https://www.openapis.org/) Cliente generado para APIs OpenAPI.
- [![swagger-ui-express](https://img.shields.io/badge/-swagger--ui--express-85EA2D?logo=swagger&logoColor=white)](https://www.npmjs.com/package/swagger-ui-express) UI para documentación de APIs Swagger.

#### ⚙️ Utilidades y Desarrollo

- [![dotenv](https://img.shields.io/badge/-dotenv-464646?logo=dotenv&logoColor=white)](https://www.npmjs.com/package/dotenv) Manejo de variables de entorno.
- [![morgan](https://img.shields.io/badge/-morgan-0F83AD?logo=node.js&logoColor=white)](https://www.npmjs.com/package/morgan) Logger HTTP.
- [![uuid](https://img.shields.io/badge/-uuid-4EAA25?logo=uuid&logoColor=white)](https://www.npmjs.com/package/uuid) Generador de identificadores únicos.
- [![moment](https://img.shields.io/badge/-moment-F39C12?logo=moment&logoColor=white)](https://www.npmjs.com/package/moment) Manipulación de fechas y horas.
- [![cookie-parser](https://img.shields.io/badge/-cookie--parser-339933?logo=cookiecutter&logoColor=white)](https://www.npmjs.com/package/cookie-parser) Middleware para parsear cookies.
- [![reflect-metadata](https://img.shields.io/badge/-reflect--metadata-62277B?logo=typescript&logoColor=white)](https://www.npmjs.com/package/reflect-metadata) Decoradores y metadatos requeridos por TypeScript/NestJS.
- [![rxjs](https://img.shields.io/badge/-rxjs-CC3D3D?logo=rxjs&logoColor=white)](https://rxjs.dev/) Librería reactiva para manejo de flujos asíncronos.

<!-- GETTING STARTED -->

# 🚀 API de Envío de Correos Electrónicos

## 📋 Requisitos Previos

- [Node.js](https://nodejs.org/) (v22.14.0 recomendado)
- [npm](https://www.npmjs.com/) (10.9.2 viene con Node.js)
- [Gmail](https://workspace.google.com/intl/es-419/gmail) Cuenta de servicio de correo

### Instalación

1. Clona el repositorio
   ```sh
   git clone https://github.com/ANHELL0S/api-emitto.git
   ```
2. Install NPM packages

   ```sh
   npm i
   ```

3. Configura tus .env `.development` `.production`

   ```dosini
   NODE_ENV=   # development or production

   # DATA BASE

   DB_PORT=5432
   DB_HOST=127.0.0.1
   DB_NAME=
   DB_USER=
   DB_PASSWORD=
   DB_SSL=false

   # SERVER

   PORT=4000

   # SMTP GOOGLE

   MAIL_HOST=smtp.gmail.com
   MAIL_PORT=587
   MAIL_FROM=
   MAIL_USER=
   MAIL_PASS=

   # FACTORY INFO

   EMITTO_URL= # url client
   EMITTO_EMAIL= # info support


   # JSON WEB TOKEN

   JWT_TIME=	# 60s, 30m, 30d
   JWT_SECRET= # secret key

   # REDIS

   REDIS_HOST=localhost
   REDIS_PORT=6379
   REDIS_PASSWORD=
   WORKER_CONCURRENCY=5 # Jobs concurrentes por worker
   MAX_WORKERS=8 # Máximo número de workers

   # ORIGINS DOMAINS

   CORS_ORIGIN=
   ```

4. Base datos Postgres - Redis

   ```bash
   docker run -d \
   --name postgres-alvanra \
   -e POSTGRES_USER={tu_user} \
   -e POSTGRES_PASSWORD={tu_pass} \
   -e POSTGRES_DB={tu_db_name} \
   -p 5432:5432 \
   -v postgres_data:/var/lib/postgresql/data \
   postgres:latest
   ```

   ```bash
   docker run -d \
   --name emitto-redis \
   -p 127.0.0.1:6379:6379 \
   redis:latest \
   redis-server --requirepass your_pass
   ```

5. Ejecutar server - local

   ```sh
   npm run start:dev
   ```

<!-- USAGE EXAMPLES -->

## 🚀 Despliegue en Producción

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![NGINX](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)
![PM2](https://img.shields.io/badge/PM2-2B037A?style=for-the-badge&logo=pm2&logoColor=white)
![Certbot](https://img.shields.io/badge/Certbot-003A70?style=for-the-badge&logo=letsencrypt&logoColor=white)

## Arquitectura de Despliegue

El despliegue de la aplicación se realiza sobre una **VPS** bajo una arquitectura basada en contenedores, lo que facilita la escalabilidad, el aislamiento y la portabilidad de los servicios.

### 🔧 Tecnologías empleadas

- **Docker**: Contenerización de los servicios (frontend, backend, base de datos, etc.).
- **NGINX**: Actúa como **proxy inverso**, redirigiendo el tráfico HTTP/HTTPS a los contenedores adecuados.
- **Certbot + Let's Encrypt**: Para la emisión y renovación automática de certificados SSL, garantizando una conexión segura mediante HTTPS.
- **PM2**: Utilizado para la gestión de procesos Node.js fuera de los contenedores (si aplica), proporcionando reinicio automático, monitoreo y administración de logs.

### ⚙️ Flujo general

1. El dominio apunta a la IP pública de la VPS.
2. **NGINX** escucha en los puertos 80 (HTTP) y 443 (HTTPS).
3. Las solicitudes entrantes son redirigidas hacia los contenedores Docker correspondientes (por ejemplo: `/api` al backend, `/` al frontend).
4. **Certbot** genera y renueva los certificados SSL automáticamente.
5. Si se ejecutan servicios auxiliares fuera de Docker, **PM2** los gestiona como demonios.

### 🛡️ Ventajas

- Seguridad mediante HTTPS (SSL/TLS).
- Alta disponibilidad gracias a la gestión de procesos con PM2.
- Separación de responsabilidades mediante Docker.
- Fácil mantenimiento y escalabilidad.

---

### 1. Crer red de docker

Crea una red de Docker para que todos los contenedores se comuniquen entre sí de forma eficiente y segura. Esto facilita la conexión entre servicios como la base de datos, backend y frontend, sin necesidad de exponer todos los puertos al host.

```bash
docker network create emitto-net
```

### 2. Crear contenedore de Postgres

```bash
docker run -d \
  --name postgres-alvanra \
  --network emitto-net \
  -e POSTGRES_USER={tu_user} \
  -e POSTGRES_PASSWORD={tu_pass} \
  -e POSTGRES_DB={tu_db_name} \
  -p 5434:5432 \
  -v postgres_data:/var/lib/postgresql/data \
  postgres:latest
```

> **_NOTA:_** La bandera `-v postgres_data:/var/lib/postgresql/data` asegura que los datos de su base de datos persistan incluso si el contenedor se detiene o se elimina.

### 3. Crear contenedore de Redis

```bash
docker run -d \
  --name emitto-redis \
  --network emitto-net \
  -p 127.0.0.1:6379:6379 \
  redis:latest \
  redis-server --requirepass your_pass
```

### 3. Leventar API Emitto

#### 1. Clona el repositorio

```sh
git clone https://github.com/ANHELL0S/api-emitto.git
```

#### 2. Ejecuta la API NestJS con PM2 y compila para producción

- Paso 1: Compila el proyecto NestJS

  ```sh
  npm run build
  ```

- Paso 2: Ejecuta la API con PM2

  ```sh
   pm2 start dist/main.js --name api-emitto
  ```

- Paso 3: Reinicia la API con entorno de producción

  ```sh
   NODE_ENV=production pm2 restart api-emitto --update-env
  ```

### 4. Configuración de NGINX y Certbot para despliegue seguro

#### 1. Instalar NGINX

- Instalar NGINX:

  ```sh
  sudo apt-get install nginx
  ```

- Iniciar el servicio NGINX:

  ```sh
  sudo systemctl start nginx
  ```

- Verificar el estado del servicio NGINX:

  ```sh
  sudo systemctl status nginx
  ```

- Habilitar el inicio automático (opcional):

  ```sh
  sudo systemctl enable nginx
  ```

#### 2. Instalar Certbot

```sh
sudo apt update
sudo apt install certbot python3-certbot-nginx -y
```

#### 3. Crear certidicado SSL - Certbot

```sh
sudo certbot --nginx -d tudominio.com -d www.tudominio.com
```

#### 4. Configurar NGINX como Proxy Inverso

Ejemplo básico de configuración de NGINX para redirigir tráfico backend (NestJS API):

Primero crea un archivo (ej. emitto-api) en la ruta /etc/nginx/sites-available/

```nginx
upstream emitto_server {
    least_conn;
    server localhost:4000; // donde corre la api
    keepalive 32; # Conexiones persistentes para mejor performance
}

server {
    if ($host = tu_dominio.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    listen 80;
    listen [::]:80;
    server_name tu_dominio.com;

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name tu_dominio.com;

    # Límites para archivos grandes (agregar esto)
    client_max_body_size 20M;  # Permite archivos hasta 20MB
    client_body_buffer_size 128k;
    client_body_timeout 300s;
    proxy_request_buffering off; # Importante para archivos grandes

    ssl_certificate /etc/letsencrypt/live/tu_dominio.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/tu_dominio.com/privkey.pem; # managed by Certbot

    # Configuración de SSL
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers off;
    ssl_ciphers "EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH";

    location / {
        proxy_pass http://emitto_server;

        # Timeouts extendidos (agregar esto)
        proxy_connect_timeout 600s;
        proxy_send_timeout 600s;
        proxy_read_timeout 600s;
        send_timeout 600s;

        # Headers existentes
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_cache_bypass $http_upgrade;

        # Buffer settings (agregar esto)
        proxy_buffers 8 16k;
        proxy_buffer_size 32k;
    }
}
```

#### 5. Crear certificados TSL

#### 6. Crear enlace simbolico

Para habilitar la configuración del sitio emitto-api en NGINX, se debe crear un enlace simbólico desde el archivo de configuración ubicado en sites-available hacia sites-enabled. Esto permite que NGINX reconozca y cargue dicha configuración.

Ejecuta el siguiente comando con permisos de administrador:

```bash
sudo ln -s /etc/nginx/sites-available/emitto-api /etc/nginx/sites-enabled/
```

#### 7. Recargar NGINX para aplicar los cambios

```bash
sudo systemctl reload nginx
```

#### 8. Fix redirecionar tráfico a API

- Si tienes problemas con nginx no redirige el tráfico elimina la conf por defecto de nginx:

```bash
  sudo rm /etc/nginx/sites-enabled/default
  sudo systemctl reload nginx
```

## Contribución

Las contribuciones son lo que hace de la comunidad de código abierto un lugar increíble para aprender, inspirarse y crear. Cualquier contribución que hagas es **muy apreciada**.

Si tienes alguna sugerencia para mejorar esto, por favor, bifurca el repositorio y crea una solicitud de incorporación de cambios. También puedes abrir una incidencia con la etiqueta "mejora".
¡No olvides darle una estrella al proyecto! ¡Gracias de nuevo!

1. Fork el proyecto
2. Crea tu rama de funciones (`git checkout -b feature/AmazingFeature`)
3. Confirma tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push la rama (`git push origin feature/AmazingFeature`)
5. Abrir una PR

<!-- LICENSE -->

## License

Distribuido bajo la licencia del proyecto. Ver `LICENSE.txt` para más información.
