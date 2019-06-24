import { PartialInfoProduct } from '../../../../core/model/product';
import PLAdapter from '../index';

import PL_PRODUCT from '../../../serviceProvider/pl/__tests__/__fixtures__/pl_product.json';
import PL_CONVERTED from './__fixtures__/pl_converted_product.json';

describe('convertProduct', () => {
  it('should convert product from PS format correctly', () => {
    let p = PLAdapter.convertProduct(<PartialInfoProduct>{}, <PL.Product>(<unknown>PL_PRODUCT));
    expect(p).toEqual(PL_CONVERTED);
  });

  it('should override existing attributes', () => {
    let p = PLAdapter.convertProduct(
      <PartialInfoProduct>{
        category: '',
        name: 'name',
        price: 0,
        sku: 'sku',
        status: '0',
        stocks: []
      },
      <PL.Product>(<unknown>PL_PRODUCT)
    );
    expect(p).toEqual(PL_CONVERTED);
  });
});
