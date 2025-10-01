
import { Router } from "express";
import ProductManager from "../dao/ProductManager.js";

const router = Router();
const productManager = new ProductManager();

let io = null;
export const setSocketServer = (server) => { io = server; };

// GET /api/products?limit=&page=&sort=&query=
router.get("/", async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;
    const result = await productManager.getProducts({ limit, page, sort, query });

    // Build links
    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}${req.path}`;
    const prevLink = result.hasPrevPage ? `${baseUrl}?page=${result.prevPage}&limit=${limit}${sort ? `&sort=${sort}` : ''}${query ? `&query=${query}` : ''}` : null;
    const nextLink = result.hasNextPage ? `${baseUrl}?page=${result.nextPage}&limit=${limit}${sort ? `&sort=${sort}` : ''}${query ? `&query=${query}` : ''}` : null;

    res.json({
      status: "success",
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage || null,
      nextPage: result.nextPage || null,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink,
      nextLink
    });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
});

// GET /api/products/:pid
router.get("/:pid", async (req, res) => {
  const product = await productManager.getProductById(req.params.pid);
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
});

// POST /api/products
router.post("/", async (req, res) => {
  try {
    const newP = await productManager.addProduct(req.body);
    // Emit update
    if (io) {
      const list = await productManager.getProducts({ limit: 1000, page: 1 });
      io.emit("updateProducts", list.docs);
    }
    res.status(201).json(newP);
  } catch (err) {
    res.status(400).json({ status: "error", error: err.message });
  }
});

// PUT /api/products/:pid
router.put("/:pid", async (req, res) => {
  try {
    const updated = await productManager.updateProduct(req.params.pid, req.body);
    if (!updated) return res.status(404).json({ error: "Product not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/products/:pid
router.delete("/:pid", async (req, res) => {
  try {
    const deleted = await productManager.deleteProduct(req.params.pid);
    if (!deleted) return res.status(404).json({ error: "Product not found" });

    if (io) {
      const list = await productManager.getProducts({ limit: 1000, page: 1 });
      io.emit("updateProducts", list.docs);
    }

    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
