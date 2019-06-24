import { FullInfoProduct } from '../../../core/model/product';
import { Stock } from '../../../core/model/Stock';

function convertProduct(product: FullInfoProduct, pvisProduct: Pvis.Product): FullInfoProduct {
  if (pvisProduct) {
    let { sku, category, name, status, original_price, store_in_stock } = pvisProduct;
    product = product || <FullInfoProduct>{};
    product = {
      ...product,
      sku,
      name,
      status: String(status),
      category,
      price: original_price,
      stocks: Object.keys(store_in_stock).map(k => convertStock(k, store_in_stock[k]))
    };
  }
  return product;
}

function convertStock(pvisStoreId: string, pvisStoreInStock: Pvis.StoreInStock): Stock {
  return {
    code: pvisStoreId,
    name: pvisStoreInStock.store_name,
    quantity: pvisStoreInStock.quantity
  };
}

export default {
  convertProduct,
  convertStock
};
