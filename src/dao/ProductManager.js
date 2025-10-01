import { ProductModel } from "../models/product.model.js";

export default class ProductManager {
  async getProducts({ limit = 10, page = 1, sort, query } = {}) {
    const options = {
      page: Number(page) || 1,
      limit: Number(limit) || 10,
      lean: true
    };

    if (sort === "asc") options.sort = { price: 1 };
    else if (sort === "desc") options.sort = { price: -1 };

    
    let filter = {};
    if (query) {
    
      if (query.includes(":")) {
        const [field, val] = query.split(":");
        if (field === "status") filter.status = val === "true";
        else filter[field] = val;
      } else {
        filter.category = query;
      }
    }

    const result = await ProductModel.paginate(filter, options);
    return result;
  }

  async getProductById(id) {
    return ProductModel.findById(id).lean();
  }

  async addProduct(productData) {
    const product = new ProductModel(productData);
    return product.save();
  }

  async updateProduct(id, updateData) {

    delete updateData._id;
    return ProductModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).lean();
  }

  async deleteProduct(id) {
    return ProductModel.findByIdAndDelete(id);
  }
}
