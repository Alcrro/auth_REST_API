export interface iProductSchema {
  name: string;
  description: string;
  image: string;
  countInStock: number;
  brand: string;
  price: number;
  richDescription: string;
  images: string[];
  category: object;
  rating: number;
  numbReviews: number;
  isFeatured: boolean;
  dateCrated: Date;
}

export class ProductEntity implements iProductSchema {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly image: string,
    public readonly countInStock: number,
    public readonly brand: string,
    public readonly price: number,
    public readonly richDescription: string,
    public readonly images: string[],
    public readonly category: object,
    public readonly rating: number,
    public readonly numbReviews: number,
    public readonly isFeatured: boolean,
    public readonly dateCrated: Date
  ) {}
}
