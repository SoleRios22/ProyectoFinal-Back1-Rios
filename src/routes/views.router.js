import { Router } from "express";
import ProductManager from "../dao/ProductManager.js";
import CartManager from "../dao/CartManager.js";

const router = Router();
const pm = new ProductManager();
const cm = new CartManager();

// products paginados (server-side render)
router.get("/products", async (req, res) => {
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
      prevLink: data.hasPrevPage ? `/products?page=${data.prevPage}&limit=${limit}` : null,
      nextLink: data.hasNextPage ? `/products?page=${data.nextPage}&limit=${limit}` : null
    }
  });
});

// product detail
router.get("/products/:pid", async (req, res) => {
  const product = await pm.getProductById(req.params.pid);
  if (!product) return res.status(404).send("Producto no encontrado");
  res.render("productDetail", { product });
});

// cart view
router.get("/carts/:cid", async (req, res) => {
  const cart = await cm.getCartById(req.params.cid);
  if (!cart) return res.status(404).send("Carrito no encontrado");
  res.render("cart", { cart });
});

// realtime products view
router.get("/realtime", (req, res) => {
  res.render("realtime");
});

export default router;
