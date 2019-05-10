import { Stock } from './Stock';
import { Attribute } from './Attribute';

export interface Product {
  sku: string;
}

export interface PartialInfoProduct extends Product {
  category: string;
  name: string;
  price: number;
  stocks: Stock[];
  status: number;
}

export interface FullInfoProduct extends PartialInfoProduct {
  imageUrl: string;
  attributes: Attribute[];
  description: string;
}

export interface ProductWQuantity {
  product: Product;
  quantity: number;
}
