import { FullInfoProduct } from '../../../../core/model/product';
import MagentoAdapter from '../index';

import MAGENTO_PRODUCT from '../../../serviceProvider/magento/__tests__/__fixtures__/magento_product.json';
import MAGENTO_PRODUCT_CONVERTED from './__fixtures__/magento_product_converted.json';

describe('convertProduct', () => {
  it('should convert product from PS format correctly', () => {
    let p = MagentoAdapter.convertProduct(<FullInfoProduct>{}, <Magento.Product>(<unknown>MAGENTO_PRODUCT));
    expect(p).toEqual(MAGENTO_PRODUCT_CONVERTED);
  });

  it('should override existing attributes', () => {
    let p = MagentoAdapter.convertProduct(
      <FullInfoProduct>{
        imageUrl: 'y mết u rờ lờ',
        description: 'đét sờ cờ ríp sừn',
        attributes: []
      },
      <Magento.Product>(<unknown>MAGENTO_PRODUCT)
    );
    expect(p).toEqual(MAGENTO_PRODUCT_CONVERTED);
  });

  it('should keep non overlap existing attributes', () => {
    let initialProduct = {
      category: 'cat',
      name: 'name',
      price: 0,
      sku: 'sku',
      status: 0
    };
    let p = MagentoAdapter.convertProduct(<FullInfoProduct>initialProduct, <Magento.Product>(<unknown>MAGENTO_PRODUCT));
    expect(p).toEqual({ ...MAGENTO_PRODUCT_CONVERTED, ...initialProduct });
  });
});
