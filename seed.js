import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import { ProductModel } from "./src/models/product.model.js";

const MONGO_URI = process.env.MONGO_URI || "TU_URI_MONGO_AQUI";

const products = [
  {
    title: "Producto 1",
    description: "Descripción del producto 1",
    price: 100,
    thumbnail: ["https://via.placeholder.com/150"],
    code: "P001",
    status: true,
    stock: 50,
    category: "categoría1"
  },
  {
    title: "Producto 2",
    description: "Descripción del producto 2",
    price: 200,
    thumbnail: ["https://via.placeholder.com/150"],
    code: "P002",
    status: true,
    stock: 30,
    category: "categoría2"
  },
  {
    title: "Producto 3",
    description: "Descripción del producto 3",
    price: 150,
    thumbnail: ["https://via.placeholder.com/150"],
    code: "P003",
    status: true,
    stock: 20,
    category: "categoría1"
  }
];

async function seedDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Mongo conectado");

    await ProductModel.deleteMany({});
    console.log("🗑 Colección de productos vaciada");

    await ProductModel.insertMany(products);
    console.log("🌱 Productos insertados correctamente");

    mongoose.disconnect();
    console.log("🛑 Conexión cerrada");
  } catch (error) {
    console.error("❌ Error en seed:", error);
  }
}

seedDB();
