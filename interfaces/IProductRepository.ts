import { iProductSchema, ProductEntity } from "../entities/Product";

export interface iProductRepository {
  create(data: ProductEntity): Promise<ProductEntity>;
  update(id: number, stock: number): Promise<ProductEntity>;
  find(limit: number, offset: number): Promise<ProductEntity[]>;
}
