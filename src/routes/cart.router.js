
import { Router } from "express";
import CartManager from "../dao/CartManager.js";

const router = Router();
const cartManager = new CartManager();

// POST /api/carts  -> crear carrito
router.post("/", async (req, res) => {
  const cart = await cartManager.createCart();
  res.status(201).json(cart);
});

// GET /api/carts/:cid -> traer carrito (populate)
router.get("/:cid", async (req, res) => {
  const cart = await cartManager.getCartById(req.params.cid);
  if (!cart) return res.status(404).json({ error: "Cart not found" });
  res.json(cart);
});

// POST /api/carts/:cid/product/:pid -> agregar 1 unidad (si existe suma)
router.post("/:cid/product/:pid", async (req, res) => {
  const cart = await cartManager.addProductToCart(req.params.cid, req.params.pid);
  if (!cart) return res.status(404).json({ error: "Cart not found" });
  res.json(cart);
});

// DELETE /api/carts/:cid/products/:pid -> eliminar producto del carrito
router.delete("/:cid/products/:pid", async (req, res) => {
  const cart = await cartManager.removeProductFromCart(req.params.cid, req.params.pid);
  if (!cart) return res.status(404).json({ error: "Cart not found or product not in cart" });
  res.json(cart);
});

// PUT /api/carts/:cid -> reemplazar arreglo completo de productos
router.put("/:cid", async (req, res) => {
  const productsArray = req.body.products; // esperar [{product: id, quantity: N}, ...]
  const cart = await cartManager.updateProductsArray(req.params.cid, productsArray);
  if (!cart) return res.status(404).json({ error: "Cart not found" });
  res.json(cart);
});

// PUT /api/carts/:cid/products/:pid -> actualizar cantidad del producto
router.put("/:cid/products/:pid", async (req, res) => {
  const { quantity } = req.body;
  const cart = await cartManager.updateProductQuantity(req.params.cid, req.params.pid, Number(quantity));
  if (!cart) return res.status(404).json({ error: "Cart or product not found" });
  res.json(cart);
});

// DELETE /api/carts/:cid -> eliminar todos los productos del carrito
router.delete("/:cid", async (req, res) => {
  const cart = await cartManager.clearCart(req.params.cid);
  if (!cart) return res.status(404).json({ error: "Cart not found" });
  res.json(cart);
});

export default router;
