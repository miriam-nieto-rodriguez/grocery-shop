
# Grocery Shop — Frontend

Cliente web construido con Angular, que consume la API de Grocery Shop.

## Requisitos previos

- Node.js (v18 o superior)
- Angular CLI

## Instalación

```
cd frontend
npm install
```

## Configuración

La URL base de la API se define en los distintos `*.service.ts` (`products.service.ts`, `auth.service.ts`, etc.). Antes de arrancar en local, asegúrate de que apunta a tu backend:

``
private apiUrl = 'http://localhost:3000/api/...';
``

## Arranque en desarrollo

`` 
ng serve
``

La aplicación estará disponible en `http://localhost:4200`.

## Estructura del proyecto

```
src/app/
├── pages/          # Componentes de página (home, login, register, cart, checkout, profile...)
├── components/      # Componentes reutilizables
├── services/        # Comunicación con la API
├── interfaces/       # Tipos de datos (IProduct, IUser, IOrder...)
├── interceptors/     # Interceptor que añade el token a las peticiones protegidas
├── guards/           # Protección de rutas que requieren sesión iniciada
└── data/             # Datos estáticos (provincias y ciudades para el registro)
```
