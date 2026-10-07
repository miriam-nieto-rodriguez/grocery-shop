# Grocery Shop — Backend

API REST construida con Node.js, Express y Sequelize (MySQL), que da servicio a la aplicación Grocery Shop.

## Requisitos previos

- Node.js (v24)
- MySQL instalado y corriendo localmente (o acceso a una instancia remota)

## Instalación

```
cd backend
npm install
```

## Configuración

Crea un archivo `.env` en la raíz de `backend/` con las siguientes variables: (puedes usar `.env.example` como plantilla)

```
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=3306
DB_USER=
DB_PASSWORD=
DB_NAME=grocery_shop

JWT_SECRET=
```

## Arranque en desarrollo

`` 
npm run dev
``

El servidor arranca en `http://localhost:3000` y sincroniza automáticamente los modelos con la base de datos al iniciar.

## Estructura del proyecto

```
src/
├── config/ # Conexión a la base de datos
├── models/ # Modelos de Sequelize y sus asociaciones
├── routes/ # Definición de rutas de la API
├── controllers/ # Reciben la petición y devuelven la respuesta
├── services/ # Lógica de negocio
├── middlewares/ # Autenticación (JWT) y validación de esquemas (Yup)
└── schemas/ # Esquemas de validación de datos de entrada
```


## Endpoints principales

| Recurso | Endpoints |
|---|---|
| Auth | `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me` |
| Productos | `GET /api/products`, `GET /api/products/:id`, `POST /api/products`, `PUT /api/products/:id`, `DELETE /api/products/:id` |
| Categorías | `GET /api/categories`, `POST /api/categories`, `PUT /api/categories/:id`, `DELETE /api/categories/:id` |
| Pedidos | `POST /api/orders`, `GET /api/orders`, `GET /api/orders/:id` |

Las rutas de creación/edición/borrado (excepto registro y login) requieren un token JWT válido en la cabecera `Authorization: Bearer <token>`.