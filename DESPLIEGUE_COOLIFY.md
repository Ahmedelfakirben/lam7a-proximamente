# 🚀 Guía de Despliegue en Coolify — Lamha Próximamente

Esta carpeta (`lamha-proximamente`) contiene la página de landing estática premium **Próximamente / Coming Soon** de **Lamha Studios**, 100% optimizada para ser desplegada en **Coolify**.

---

## 📁 Estructura de la Carpeta

```text
lamha-proximamente/
├── index.html               # Página web principal (Multilingüe, Responsive, Formulario de Correo)
├── Dockerfile               # Configuración de Docker con Nginx
├── docker-compose.yml       # Configuración para despliegue por Docker Compose
├── nixpacks.toml            # Configuración para despliegue por Nixpacks / Static Build
├── .dockerignore            # Exclusiones de Docker
├── assets/
│   ├── lamha-coming-soon-bg.jpg
│   └── logo/                # Logos vectoriales y PNG de la marca
└── DESPLIEGUE_COOLIFY.md    # Esta guía
```

---

## 🛠️ Opciones de Despliegue en Coolify

### Opción 1: Mediante repositorio Git (Recomendada)
1. Sube esta carpeta a tu repositorio de Git (GitHub, GitLab, Gitea, etc.).
2. En tu panel de **Coolify**, haz clic en **+ New Resource** -> **Public/Private Repository**.
3. Selecciona tu repositorio.
4. En **Base Directory** o **Root Directory**, escribe:
   `/lamha-proximamente` (o deja `/` si subes solo el contenido de esta carpeta).
5. En **Build Pack**, selecciona **Dockerfile** o **Static Site (Nixpacks)**.
6. Asigna tu dominio en **Domains** (ej. `https://lamhastudios.com`).
7. Haz clic en **Deploy**.

---

### Opción 2: Mediante Docker Compose en Coolify
1. En el panel de **Coolify**, crea un nuevo recurso de tipo **Docker Compose**.
2. Copia el contenido del archivo `docker-compose.yml` o conéctalo directamente desde tu repositorio Git.
3. Haz clic en **Deploy**.

---

## ✨ Características de la Página

- 🌍 **Multilingüe Automático y Manual**: Soporta **Español**, **Inglés**, **Francés** y **Árabe** (con soporte RTL completo para árabe). Detecta automáticamente el idioma del navegador del visitante.
- 🎨 **Diseño Luxury Glassmorphic**: Interfaz ultra elegante basada en la identidad corporativa de Lamha Studios (negro profundo, dorado satinado `#C69F68`, tipografía editorial Serif y fuentes Google).
- 📧 **Formulario de Suscripción**: Los visitantes pueden ingresar su correo para ser notificados en el lanzamiento.
- 📱 **Totalmente Responsive**: Optimizado para cualquier tamaño de pantalla (Móvil, Tablet y Escritorio).
- 🚀 **Carga Ultra Rápida**: Servido directamente vía Nginx Alpine (consumo < 15MB RAM).
