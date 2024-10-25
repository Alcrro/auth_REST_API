import { ProductEntity } from "../entities/Product";

export interface IProductInteractor {
  createProduct(input: any): Promise<ProductEntity>;
  updateStuck(id: number, stock: number): Promise<ProductEntity>;
  getProduct(limit: number, offset: number): Promise<ProductEntity[]>;
}
