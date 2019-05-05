import { Stock } from './Stock';

export interface Product {
  sku: string;
}

export interface PartialInfoProduct extends Product {
  category: string;
  name: string;
  price: number;
  stocks: Array<Stock>;
  status: number;
}

export interface FullInfoProduct extends PartialInfoProduct {
  imageUrl: string;
}

export interface ProductWQuantity {
  product: Product;
  quantity: number;
}
