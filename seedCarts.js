import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import { CartModel } from "./src/models/cart.model.js";
import { ProductModel } from "./src/models/product.model.js";

const MONGO_URI = process.env.MONGO_URI || "TU_URI_MONGO_AQUI";

async function seedCarts() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Mongo conectado");

    await CartModel.deleteMany({});
    console.log("🗑 Colección de carritos vaciada");

    const products = await ProductModel.find().limit(3).lean();

    if (!products.length) {
      console.log("⚠ No hay productos para añadir al carrito.");
      process.exit();
    }

    const carts = [
      {
        products: [
          { product: products[0]._id, quantity: 2 },
          { product: products[1]._id, quantity: 1 }
        ]
      },
      {
        products: [
          { product: products[2]._id, quantity: 5 }
        ]
      }
    ];

    await CartModel.insertMany(carts);
    console.log("🌱 Carritos insertados correctamente");

    mongoose.disconnect();
    console.log("🛑 Conexión cerrada");
  } catch (error) {
    console.error("❌ Error en seedCarts:", error);
  }
}

seedCarts();
