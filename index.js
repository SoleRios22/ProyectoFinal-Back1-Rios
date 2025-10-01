import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./src/app.js";
import { setSocketServer } from "./src/routes/product.router.js";
import ProductManager from "./src/dao/ProductManager.js";

dotenv.config();
const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;

const server = http.createServer(app);
const io = new Server(server);

setSocketServer(io); // pasar io al router para emitir en endpoints HTTP

const productManager = new ProductManager();

io.on("connection", async (socket) => {
  console.log("Cliente conectado (socket.id):", socket.id);

  // emitir lista inicial
  const list = await productManager.getProducts({ limit: 1000, page: 1 });
  socket.emit("updateProducts", list.docs);

  // recibir add desde cliente realtime
  socket.on("addProduct", async (data) => {
    try {
      await productManager.addProduct(data);
      const updated = await productManager.getProducts({ limit: 1000, page: 1 });
      io.emit("updateProducts", updated.docs);
    } catch (err) {
      socket.emit("error", err.message);
    }
  });

  socket.on("deleteProduct", async (id) => {
    try {
      await productManager.deleteProduct(id);
      const updated = await productManager.getProducts({ limit: 1000, page: 1 });
      io.emit("updateProducts", updated.docs);
    } catch (err) {
      socket.emit("error", err.message);
    }
  });
});

async function start() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Mongo connected");
    server.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
  } catch (err) {
    console.error("Error connecting to Mongo:", err);
  }
}

start();
