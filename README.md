# Setup EMITTO with Docker

[![Screenshot-2025-05-13-16-13-10-2726x768.png](https://i.postimg.cc/gJC6rgdG/Screenshot-2025-05-13-16-13-10-2726x768.png)](https://postimg.cc/LYVsbBnW)

## Create the Network

```bash
docker network create emitto-net
```

To set up a PostgreSQL database using Docker, run the following command:

```bash
docker run -d \
  --name postgres-alvanra \
  --network emitto-net \
  -e POSTGRES_USER=user_db_emitto \
  -e POSTGRES_PASSWORD=pass_db_emitto \
  -e POSTGRES_DB=db_emitto \
  -p 5434:5432 \
  -v postgres_data:/var/lib/postgresql/data \
  postgres:latest
```

### Notes

- The `-v postgres_data:/var/lib/postgresql/data` flag ensures that your database data persists even if the container is stopped or removed.
- Make sure Docker is installed and running on your system before executing the command.

---

## Redis

```bash
docker run -d \
  --name emitto-redis \
  --network emitto-net \
  -p 127.0.0.1:6379:6379 \
  redis:latest \
  redis-server --requirepass e58bf010c77fcd16d54babcbdb19811d
```

## Crear instancia de api

```bash
docker run -d \
  --name api_emitto \
  --env-file /root/.env.production \
  -p 4000:4000 \
  --network emitto-net \
  anhell0s/api_emitto:latest
```

## Crear instancia del client

```bash
docker run -d \
  --name client_emitto \
  -p 3000:3000 \
  --network emitto-net \
  anhell0s/client_emitto:latest
```

## Generar SSL

```bash
sudo certbot --nginx -d emitto.softecsa.com
```

## Configurar nginx

- Dentro de site-avalibel/emitto-api

```bash
upstream emitto_server {
    least_conn;
    server 172.18.0.4:4000;
}

server {
    listen 80;
    listen [::]:80;
    server_name emitto.softecsa.com;

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name emitto.softecsa.com;

    ssl_certificate /etc/letsencrypt/live/emitto.softecsa.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/emitto.softecsa.com/privkey.pem;

    # Configuración de SSL para protocolos fuertes
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers off;
    ssl_ciphers "EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH";

    location / {
        proxy_pass http://emitto_server;  # Nombre del upstream definido arriba
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_cache_bypass $http_upgrade;
    }
}
```

- Crear enlace simbolico

```bash
sudo ln -s /etc/nginx/sites-available/emitto-api /etc/nginx/sites-enabled/
```

- por ultimo elinmar la conf por defecto de nginx:

```bash
  sudo rm /etc/nginx/sites-enabled/default
```

## Docker hub

-- Crear una imagen de la api

```bash
docker build -t anhell0s/api_emitto:latest .
```

-- Subir la imagen a docker hub
-- Nota: debes de logearte

```bash
docker push anhell0s/api_emitto:latest
```

sudo nginx -t
sudo systemctl reload nginx
