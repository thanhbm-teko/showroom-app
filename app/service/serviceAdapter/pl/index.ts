import { PartialInfoProduct } from '../../../core/model/product';
import { Stock } from '../../../core/model/Stock';

function convertProduct(product: PartialInfoProduct, plProduct: PL.Product): PartialInfoProduct {
  if (plProduct) {
    let { sku, name, status, prices, stocks } = plProduct;
    product = product || <PartialInfoProduct>{};
    product = {
      sku,
      name,
      status: status.sale,
      category: '',
      price: prices.sellPrice,
      stocks: stocks.map(convertStock)
    };
  }
  return product;
}

function convertStock(plProductStock: PL.Stock): Stock {
  let { location, locationName, available } = plProductStock;
  return {
    code: location,
    name: locationName,
    quantity: available
  };
}

export default {
  convertProduct
};
