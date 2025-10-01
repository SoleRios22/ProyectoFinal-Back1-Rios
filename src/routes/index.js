import express from "express";
import cartRouter from "./cart.router.js";
import productRouter, {setSocketServer} from "./product.router.js";
import viewRouter from "./views.router.js";

const router = express.Router();


router.use("/products", productRouter);
router.use("/carts", cartRouter);
router.use("/", viewRouter);

export {router as default, setSocketServer};