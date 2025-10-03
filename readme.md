# 🛒 E-commerce Backend (Express + MongoDB + Handlebars + Socket.IO)

Proyecto final del curso **Programación Backend I - Desarrollo Avanzado de Backend**.  
API para gestión de **productos** y **carritos** con persistencia en **MongoDB**, vistas con **Handlebars** y actualizaciones en **tiempo real** con **Socket.IO**.

---

## 🛠️ Instalación

1. **Clonar repo:**
```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo
```

2. **Instalar dependencias:**
```bash
npm install
```



4. **Levantar servidor:**
```bash
npm run dev
# o
node src/server.js
```

📌 Servidor corriendo en: [http://localhost:8080](http://localhost:8080)

---

## 🔎 Endpoints importantes

### Productos

- `GET /api/products?limit=10&page=1&sort=asc&query=category:electronics`
- `GET /api/products/:pid`
- `POST /api/products`
- `PUT /api/products/:pid`
- `DELETE /api/products/:pid`

**Formato de respuesta (GET /api/products):**
```json
{
  "status":"success",
  "payload": [...],
  "totalPages": 5,
  "prevPage": 1,
  "nextPage": 3,
  "page": 2,
  "hasPrevPage": true,
  "hasNextPage": true,
  "prevLink": "...",
  "nextLink": "..."
}
```

---

### Carritos

- `POST /api/carts` → crea carrito  
- `GET /api/carts/:cid` → trae carrito (con productos populate)  
- `POST /api/carts/:cid/product/:pid` → agrega 1 unidad  
- `DELETE /api/carts/:cid/products/:pid` → elimina producto del carrito  
- `PUT /api/carts/:cid` → reemplaza arreglo de productos (body: `{ products: [{product, quantity}] }`)  
- `PUT /api/carts/:cid/products/:pid` → actualiza cantidad (body: `{ quantity: n }`)  
- `DELETE /api/carts/:cid` → vacía carrito  

---

## 🖼️ Vistas (navegador)

- `GET /products` → lista paginada (server-side)  
- `GET /products/:pid` → detalle del producto (botón agregar al carrito)  
- `GET /carts/:cid` → ver carrito (populate)  
- `GET /realtimeproducts` → vista que usa **Socket.IO** para agregar/eliminar productos en tiempo real  



---

## 👤 Autor

**María Soledad Ríos** – Curso: *Programación Backend I - Desarrollo Avanzado de Backend*
