# Usa la imagen oficial de Node.js como base
FROM node:22.14.0

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos del proyecto al contenedor
COPY package*.json ./
RUN npm install

# Copia el archivo de entorno de producción al contenedor
COPY .env.production .env.production

# Copia el resto del código fuente
COPY . .

# Construye la aplicación NestJS
RUN npm run build

# Exponer el puerto que usa la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación en producción
CMD ["npm", "run", "start:prod"]
