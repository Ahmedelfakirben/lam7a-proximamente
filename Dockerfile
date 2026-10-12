# Dockerfile para despliegue de página estática en Coolify
FROM nginx:alpine

# Configuración personalizada para URLs limpias (/portal)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar todo el contenido al directorio servido por Nginx
COPY . /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Iniciar servidor Nginx
CMD ["nginx", "-g", "daemon off;"]
