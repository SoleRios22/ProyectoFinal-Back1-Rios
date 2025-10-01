import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  thumbnails: { type: [String], default: [] },
  code: { type: String, required: true, unique: true },
  status: { type: Boolean, default: true },
  stock: { type: Number, default: 0 },
  category: { type: String, default: "general" }
}, { timestamps: true });

productSchema.plugin(mongoosePaginate);

export const ProductModel = mongoose.model("Product", productSchema);
