# E-commerce Backend (Express + MongoDB + Handlebars + Socket.IO)

Proyecto final del curso **Programación Backend I - Desarrollo Avanzado de Backend**.  
API para gestión de **productos** y **carritos** con persistencia en **MongoDB**, vistas con **Handlebars** y actualizaciones en **tiempo real** con **Socket.IO**.

---

## 📌 Características principales

- **Productos**: CRUD completo. GET `/api/products` con filtrado (`query`), paginación (`limit`, `page`) y ordenamiento por precio (`sort=asc|desc`).
- **Carritos**: crear, agregar productos, eliminar producto, actualizar cantidades, reemplazar arreglo completo y limpiar carrito.
- **Persistencia**: MongoDB (Mongoose). `Cart.products` guarda referencias (ObjectId) a `Product` y las respuestas usan `populate`.
- **Vistas**: Handlebars para mostrar productos paginados (`/products`), detalle (`/products/:pid`), carrito (`/carts/:cid`) y vista en tiempo real (`/realtime`).
- **Socket.IO**: vista `/realtime` para crear/eliminar productos desde el cliente y actualizar a todos los conectados.
- **Paginación**: respuesta estándar con `status, payload, totalPages, prevPage, nextPage, page, hasPrevPage, hasNextPage, prevLink, nextLink`.

---


---

## 🛠️ Instalación

1. Clonar repo:
```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo
