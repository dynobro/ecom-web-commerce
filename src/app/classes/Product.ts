export class Product {
  id?: string;
  sku: string;
  name: string;
  brand: string;
  summary: string;
  price: number;
  images?: string[];
  thumbnail?: string;
  url?: string;
  configs?: any[];
}

export class ProductAggregate {
  id: string;
  data: Product;
}
// TODO: check all the fields that should be a obligatory
