import { FullInfoProduct } from '../../../../core/model/product';
import PvisAdapter from '../index';

import PVIS_PRODUCT from '../../../serviceProvider/pvis/__tests__/__fixtures__/pvis_product.json';
import PVIS_PRODUCT_CONVERTED from './__fixtures__/pvis_product_converted.json';

describe('convertProduct', () => {
  it('should convert product from PS format correctly', () => {
    let p = PvisAdapter.convertProduct(<FullInfoProduct>{}, <Pvis.Product>(<unknown>PVIS_PRODUCT));
    expect(p).toEqual(PVIS_PRODUCT_CONVERTED);
  });

  it('should override existing attributes', () => {
    let p = PvisAdapter.convertProduct(
      <FullInfoProduct>{
        category: 'cat',
        name: 'name',
        price: 0,
        sku: 'sku',
        status: '0',
        stocks: []
      },
      <Pvis.Product>(<unknown>PVIS_PRODUCT)
    );
    expect(p).toEqual(PVIS_PRODUCT_CONVERTED);
  });

  it('should keep non overlap existing attributes', () => {
    let initialProduct = {
      imageUrl: 'y mết u rờ lờ',
      description: 'đét sờ cờ ríp sừn'
    };
    let p = PvisAdapter.convertProduct(<FullInfoProduct>initialProduct, <Pvis.Product>(<unknown>PVIS_PRODUCT));
    expect(p).toEqual({ ...PVIS_PRODUCT_CONVERTED, ...initialProduct });
  });
});
