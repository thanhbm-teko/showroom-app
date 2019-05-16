import { PartialInfoProduct } from '../../../../core/model/product';
import PSAdapter from '../index';

import PS_PRODUCT from '../../../serviceProvider/ps/__tests__/__fixtures__/ps_product.json';
import PS_CONVERTED from './__fixtures__/ps_converted_product.json';

describe('convertProduct', () => {
  it('should convert product from PS format correctly', () => {
    let p = PSAdapter.convertProduct(<PartialInfoProduct>{}, <PS.Product>(<unknown>PS_PRODUCT));
    expect(p).toEqual(PS_CONVERTED);
  });

  it('should override existing attributes', () => {
    let p = PSAdapter.convertProduct(
      <PartialInfoProduct>{
        category: 'cat',
        name: 'name',
        price: 0,
        sku: 'sku',
        status: 0
      },
      <PS.Product>(<unknown>PS_PRODUCT)
    );
    expect(p).toEqual(PS_CONVERTED);
  });
});
