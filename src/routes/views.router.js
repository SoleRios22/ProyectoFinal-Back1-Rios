import { Router } from "express";
import ProductManager from "../dao/ProductManager.js";
import CartManager from "../dao/CartManager.js";

const router = Router();
const pm = new ProductManager();
const cm = new CartManager();

// Página principal: listado paginado de productos
router.get("/", async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;
    const data = await pm.getProducts({ limit, page, sort, query });

    res.render("products", {
      products: data.docs,
      pagination: {
        totalPages: data.totalPages,
        page: data.page,
        hasPrevPage: data.hasPrevPage,
        hasNextPage: data.hasNextPage,
        prevPage: data.prevPage,
        nextPage: data.nextPage,
        prevLink: data.hasPrevPage
          ? `/?page=${data.prevPage}&limit=${limit}${sort ? `&sort=${sort}` : ""}${query ? `&query=${query}` : ""}`
          : null,
        nextLink: data.hasNextPage
          ? `/?page=${data.nextPage}&limit=${limit}${sort ? `&sort=${sort}` : ""}${query ? `&query=${query}` : ""}`
          : null,
      },
    });
  } catch (err) {
    res.status(500).send("Error cargando productos");
  }
});

// Detalle de producto
router.get("/products/:pid", async (req, res) => {
  try {
    const product = await pm.getProductById(req.params.pid);
    if (!product) return res.status(404).send("Producto no encontrado");

    res.render("productDetail", { product });
  } catch (err) {
    res.status(500).send("Error al cargar el producto");
  }
});

// Vista carrito
router.get("/carts/:cid", async (req, res) => {
  try {
    const cart = await cm.getCartById(req.params.cid);
    if (!cart) return res.status(404).send("Carrito no encontrado");

    res.render("cart", { cart });
  } catch (err) {
    res.status(500).send("Error al cargar el carrito");
  }
});

// Vista tiempo real
router.get("/realtimeproducts", (req, res) => {
  res.render("realtime");
});

export default router;
