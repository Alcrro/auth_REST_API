import { iProductSchema, ProductEntity } from "../entities/Product";

export interface IAuthInteractor {
  login(input: any): Promise<iProductSchema>;
  register(id: number, stock: number): Promise<iProductSchema>;
}
