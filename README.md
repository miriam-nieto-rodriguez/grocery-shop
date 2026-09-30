# 🥬 Grocery Shop — Del campo a tu mesa

Aplicación web e-commerce completa para la compra y gestión de productos frescos de huerta. Cuenta con arquitectura modular separada en frontend y backend, autenticación de usuarios, catálogo por categorías, carrito de compra interactivo, flujo de checkout y perfil de usuario con historial de pedidos.

## 🛠️ Tecnologías utilizadas

### **Frontend**
* **Framework:** Angular (v21)
* **Estilos:** Bootstrap 5 & CSS3 Responsive
* **Gestión de Estado y Rutas:** RxJS, Angular Router, Auth Guards e Interceptores HTTP

### **Backend**
* **Entorno:** Node.js & Express
* **Base de Datos:** MySQL / Sequelize ORM
* **Autenticación:** JWT (JSON Web Tokens) y Bcrypt
* **Validaciones:** Express-Validator / Schemas

## 📂 Estructura del Proyecto

```text
grocery-shop/
├── backend/    # API REST en Node.js/Express y conexión a base de datos
└── frontend/   # Cliente web en Angular con componentes, servicios y guards
