# GetHelp

GetHelp es una aplicación web que permite a los usuarios crear y visualizar solicitudes de ayuda. La aplicación está construida con una arquitectura moderna de tres capas: frontend en React, backend en Node.js/Express y una base de datos MongoDB.

## Estructura del Proyecto

```
gethelp3/
├── backend/             # Servidor API REST
│   ├── Dockerfile       # Configuración para contenedor Docker del backend
│   ├── package.json     # Dependencias del backend
│   ├── server.js        # Punto de entrada del servidor
│   └── uploads/         # Carpeta para almacenar imágenes subidas
├── docker-compose.yml   # Configuración de Docker Compose
├── frontend/            # Aplicación React
│   ├── Dockerfile       # Configuración para contenedor Docker del frontend
│   ├── package.json     # Dependencias del frontend
│   ├── public/          # Archivos estáticos
│   └── src/             # Código fuente de React
└── README.md            # Este archivo
```

## Tecnologías Utilizadas

### Frontend
- **React 18**: Biblioteca para construir interfaces de usuario
- **Material UI**: Framework de componentes para un diseño moderno
- **Axios**: Cliente HTTP para realizar peticiones al backend
- **React Infinite Scroll Component**: Para cargar contenido dinámicamente

### Backend
- **Node.js**: Entorno de ejecución para JavaScript
- **Express**: Framework web para Node.js
- **Mongoose**: ODM para MongoDB
- **Multer**: Middleware para gestionar la subida de archivos
- **CORS**: Middleware para permitir peticiones cross-origin

### Base de Datos
- **MongoDB**: Base de datos NoSQL orientada a documentos

### Infraestructura
- **Docker**: Contenedores para cada componente de la aplicación
- **Docker Compose**: Orquestación de contenedores

## Funcionalidades

### Creación de Solicitudes
Los usuarios pueden crear solicitudes de ayuda que incluyen:
- Un título
- Una descripción detallada
- Una imagen opcional (almacenada en el servidor)

### Visualización de Solicitudes
- Listado de solicitudes ordenadas por fecha (las más recientes primero)
- Visualización de imágenes adjuntas
- Interfaz con scroll infinito para cargar más solicitudes

## Modelo de Datos

### Colección `requests`
- `title`: Título de la solicitud
- `body`: Descripción detallada
- `imageUrl`: URL de la imagen adjunta (opcional)
- `createdAt`: Fecha de creación (automática)

## Configuración y Despliegue

### Requisitos Previos
- Docker y Docker Compose instalados en el sistema

### Iniciar la Aplicación
Para levantar todos los servicios:

```bash
docker-compose up -d
```

Este comando iniciará:
- Frontend en http://localhost:3000
- Backend en http://localhost:5000
- MongoDB en el puerto 27017

### Detener la Aplicación
Para detener todos los servicios:

```bash
docker-compose down
```

### Reconstruir los Contenedores
Si se realizan cambios en el código o las dependencias:

```bash
docker-compose build
docker-compose up -d
```

## Endpoints de la API

### GET /api/requests
Obtiene todas las solicitudes ordenadas por fecha (más recientes primero).

**Respuesta**: Array de objetos con las solicitudes.

### POST /api/requests
Crea una nueva solicitud.

**Cuerpo de la Petición**:
- `title`: Título de la solicitud (requerido)
- `body`: Descripción de la solicitud (requerido)
- `image`: Archivo de imagen (opcional, multipart/form-data)

**Respuesta**: Objeto con la solicitud creada.

## Desarrollo

### Estructura del Frontend
- `src/index.js`: Punto de entrada de la aplicación React
- `src/App.js`: Componente principal que contiene la lógica de la aplicación

### Estructura del Backend
- `server.js`: Configuración del servidor Express, conexión a MongoDB y definición de rutas
- `uploads/`: Directorio donde se almacenan las imágenes subidas

## Persistencia de Datos
Los datos persisten entre reinicios gracias a los volúmenes de Docker:
- `mongodb_data`: Almacena los datos de MongoDB
- El directorio `uploads` está montado como volumen para conservar las imágenes

## Solución de Problemas

### Problemas de Conexión con MongoDB
Si el backend no puede conectarse a MongoDB, asegúrate de que:
1. El contenedor de MongoDB está en ejecución
2. La URL de conexión es correcta (`mongodb://mongodb:27017/gethelp`)

### Problemas con las Imágenes
Si las imágenes no se muestran:
1. Verifica que el directorio `uploads` existe en el backend
2. Asegúrate de que el backend está sirviendo archivos estáticos desde `/uploads`

### Logs de los Contenedores
Para ver los logs de un servicio específico:

```bash
docker-compose logs frontend
docker-compose logs backend
docker-compose logs mongodb
```

## Licencia
Este proyecto está licenciado bajo los términos de la licencia MIT.
