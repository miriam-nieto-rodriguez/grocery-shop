# 🥬 Grocery Shop — Del campo a tu mesa

Aplicación web e-commerce completa para la compra y gestión de productos frescos de huerta. Cuenta con arquitectura modular separada en frontend y backend, autenticación de usuarios con JWT, catálogo de productos con categorías y filtros, carrito de compra interactivo, flujo de checkout con transacciones seguras, y perfil de usuario con historial de pedidos.

🔗https://huerto-vivo.netlify.app

## 🛠️ Tecnologías utilizadas

### **Frontend**
* **Framework:** Angular (v21)
* **Estilos:** Bootstrap 5 & CSS3 Responsive
* **Gestión de Estado y Rutas:**Signals, Angular Router, Reactive Forms
* **Seguridad:** Auth Guards e Interceptores HTTP para la gestión automática del token

### **Backend**
* **Entorno:** Node.js & Express
* **Base de Datos:** MySQL / Sequelize ORM
* **Autenticación:** JWT (JSON Web Tokens) y Bcrypt
* **Validaciones:** Yup (esquemas) con middleware de validación personalizado
* **Integridad de datos:** transacciones de Sequelize en la creación de pedidos

### **Despliegue**
* **Backend:** Render
* **Frontend:** Netlify
* **Base de datos:** TiDB Cloud

### **✨ Funcionalidades destacadas**
* Catálogo de productos con paginación y filtrado por categoría y búsqueda por texto
* Relación muchos-a-muchos entre productos y categorías
* Cálculo del total del pedido en el servidor (nunca confiando en el precio enviado por el cliente)
* Sesión persistente con renovación automática de cabeceras y gestión de token caducado


## 📂 Estructura del Proyecto

```text
grocery-shop/
├── backend/    # API REST en Node.js/Express y conexión a base de datos
└── frontend/   # Cliente web en Angular con componentes, servicios y guards
