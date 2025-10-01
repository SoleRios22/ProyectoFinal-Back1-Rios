
import { CartModel } from "../models/cart.model.js";

export default class CartManager {
  async createCart() {
    const cart = new CartModel({ products: [] });
    return cart.save();
  }

  async getCartById(cid) {
    return CartModel.findById(cid).populate("products.product").lean();
  }

  async addProductToCart(cid, pid) {
    const cart = await CartModel.findById(cid);
    if (!cart) return null;

    const idx = cart.products.findIndex(p => p.product.toString() === pid.toString());
    if (idx !== -1) {
      cart.products[idx].quantity += 1;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }
    await cart.save();
    return this.getCartById(cid);
  }

  async removeProductFromCart(cid, pid) {
    const cart = await CartModel.findById(cid);
    if (!cart) return null;
    cart.products = cart.products.filter(p => p.product.toString() !== pid.toString());
    await cart.save();
    return this.getCartById(cid);
  }

  async updateProductsArray(cid, productsArray) {
    // productsArray = [{product: productId, quantity: N}, ...]
    const cart = await CartModel.findById(cid);
    if (!cart) return null;
    cart.products = productsArray.map(p => ({ product: p.product, quantity: p.quantity }));
    await cart.save();
    return this.getCartById(cid);
  }

  async updateProductQuantity(cid, pid, quantity) {
    const cart = await CartModel.findById(cid);
    if (!cart) return null;
    const idx = cart.products.findIndex(p => p.product.toString() === pid.toString());
    if (idx === -1) return null;
    cart.products[idx].quantity = quantity;
    await cart.save();
    return this.getCartById(cid);
  }

  async clearCart(cid) {
    const cart = await CartModel.findById(cid);
    if (!cart) return null;
    cart.products = [];
    await cart.save();
    return this.getCartById(cid);
  }
}
