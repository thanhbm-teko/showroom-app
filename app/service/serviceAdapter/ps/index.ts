import { PartialInfoProduct } from '../../../core/model/product';

function convertProduct(product: PartialInfoProduct, psProduct: PS.Product): PartialInfoProduct {
  if (psProduct) {
    let { pv_sku, asia_category_code, name, status, original_price } = psProduct;
    product = product || <PartialInfoProduct>{};
    product = {
      ...product,
      sku: pv_sku,
      name,
      status: String(status),
      category: asia_category_code,
      price: original_price
    };
  }
  return product;
}

export default {
  convertProduct
};
