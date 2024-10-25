import { IProductInteractor } from "../interfaces/IProductInteractor";
import { iProductRepository } from "../interfaces/IProductRepository";

export class ProductInteractor implements IProductInteractor {
  private repository: iProductRepository;

  constructor(repository: iProductRepository) {
    this.repository = repository;
  }
  async createProduct(input: any) {
    return this.repository.create(input);
  }
  async updateStuck(id: number, stock: number) {
    return this.repository.update(id, stock);
  }

  async getProduct(limit: number, offset: number) {
    return this.repository.find(limit, offset);
  }
}
