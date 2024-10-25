import { ProductEntity } from "../entities/Product";
import Product from "../infrastructure/models/Product.model";
import { iProductRepository } from "../interfaces/IProductRepository";

export class ProductRepository implements iProductRepository {
  private product: typeof Product;
  constructor() {
    this.product = Product;
  }
  async create(data: ProductEntity): Promise<ProductEntity> {
    const product = new Product(data);

    return await product.save();
  }
  update(id: number, stock: number): Promise<ProductEntity> {
    throw new Error("Method not implemented.");
  }
  async find(limit: number, offset: number): Promise<ProductEntity[]> {
    const products = await Product.find().skip(offset).limit(limit);

    return products;
  }
}
