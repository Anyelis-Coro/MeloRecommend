------Sistema de Recomendación Musical - Backend--------
El backend está construido con Python 2.7, Cassandra 3.11.10 y JDK 8 para impulsar el sistema de recomendación musical.

---Requisitos Previos----
Python 2.7
Cassandra 3.11.10
JDK 8

---Instrucciones de Configuración---

1. Instalar Dependencias
   pip install -r requirements.txt

2. Configurar Cassandra
   Tener Cassandra 3.11.10 instalado y en ejecución.

3. Ejecutar la Aplicación
   python app.py

La API estará disponible en http://localhost:5000.

---Endpoints de la API---
-->Autenticación
POST /api/register - Registrar un nuevo usuario
POST /api/login - Iniciar sesión de usuario

--->Canciones
GET /api/popular_songs - Obtener canciones populares
GET /api/recommendations - Obtener recomendaciones personalizadas (requiere autenticación)
GET /api/search?q={query} - Buscar canciones

--->Preferencias de Usuario
GET /api/user/preferences - Obtener preferencias del usuario (requiere autenticación)
PUT /api/user/preferences - Actualizar preferencias del usuario (requiere autenticación)

--->Favoritos
GET /api/favorites - Obtener canciones favoritas del usuario (requiere autenticación)
POST /api/favorites - Añadir canción a favoritos (requiere autenticación)
DELETE /api/favorites - Eliminar canción de favoritos (requiere autenticación)

--->Modelo de Datos

El esquema de Cassandra incluye las siguiente tablas

# users - Información de usuarios

# songs - Metadatos de canciones

# user_preferences - Preferencias de géneros del usuario

# favorites - Canciones favoritas del usuario

# listening_history - Historial de escucha del usuario

# playlists - Listas de reproducción del usuario
