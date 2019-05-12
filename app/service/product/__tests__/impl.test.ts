import { ResultCode, ApiResult } from '../../../core/model/ResultCode';
import { ApiFunc } from '../../../core/model/Function';
import { ProductSearchResult, ProductDetailResult } from '../../../core/service/product/interface';
import ProductServiceImpl from '../impl';
import Teko from '../../serviceProvider';

import PS_PRODUCT from '../../serviceProvider/ps/__tests__/__fixtures__/ps_product.json';
import PVIS_PRODUCT from '../../serviceProvider/pvis/__tests__/__fixtures__/pvis_product.json';
import MAGENTO_PRODUCT from '../../serviceProvider/magento/__tests__/__fixtures__/magento_product.json';
import PVIS_PRODUCT_CONVERTED from '../../serviceAdapter/pvis/__tests__/__fixtures__/pvis_product_converted.json';
import MAGENTO_PRODUCT_CONVERTED from '../../serviceAdapter/magento/__tests__/__fixtures__/magento_product_converted.json';

describe('ProductServiceImpl.search', () => {
  let mockSearchFailureNoResults = async () => <ApiResult>{ code: ResultCode.Failure, data: [], message: 'xyz' };
  let mockSearchSuccessWResults = async () =>
    <ApiResult>{ code: ResultCode.Success, data: [PS_PRODUCT, PS_PRODUCT], message: '' };
  let r: ProductSearchResult = null;

  async function searchWithMock(mockFunction: ApiFunc): Promise<ProductSearchResult> {
    Teko.PSService.search = jest.fn(mockFunction);
    let r = await ProductServiceImpl.search('123', null, null, 0, 10);
    return r;
  }

  describe('when PS service fail', () => {
    beforeAll(async () => {
      r = await searchWithMock(mockSearchFailureNoResults);
    });

    it('should call Teko.PSService.search', () => {
      expect(Teko.PSService.search).toBeCalledWith('123', null, null, 0, 10);
    });

    it('should return result according to result of Teko.PSService.search', () => {
      expect(r.code).toBe(ResultCode.Failure);
      expect(r.message).toBe('xyz');
      expect(r.data).toHaveLength(0);
    });
  });

  describe('when PS service success', () => {
    beforeAll(async () => {
      r = await searchWithMock(mockSearchSuccessWResults);
    });

    it('should call Teko.PSService.search', () => {
      expect(Teko.PSService.search).toBeCalledWith('123', null, null, 0, 10);
    });

    it('should return result according to result of Teko.PSService.search', () => {
      expect(r.code).toBe(ResultCode.Success);
      expect(r.message).toBe('');
      expect(r.data).toHaveLength(2);
    });
  });
});

describe('ProductServiceImpl.getDetail', () => {
  let mockPvisFailureNoResults = async () => <ApiResult>{ code: ResultCode.Failure, data: null, message: 'xyz' };
  let mockPvisSuccessWResults = async () => <ApiResult>{ code: ResultCode.Success, data: PVIS_PRODUCT, message: '' };
  let mockMagentoFailureNoResults = async () => <ApiResult>{ code: ResultCode.Failure, data: null, message: 'abc' };
  let mockMagentoSuccessWResults = async () => <ApiResult>{ code: ResultCode.Success, data: MAGENTO_PRODUCT, message: '' };
  let r: ProductDetailResult = null;

  async function getDetailWithMock(pvisMock: ApiFunc, magentoMock: ApiFunc): Promise<ProductDetailResult> {
    Teko.PvisService.getProductDetail = jest.fn(pvisMock);
    Teko.MagentoService.getProductDetail = jest.fn(magentoMock);
    let r = await ProductServiceImpl.getDetail('12345678');
    return r;
  }

  describe('when Pvis and Magento success', () => {
    beforeAll(async () => {
      r = await getDetailWithMock(mockPvisSuccessWResults, mockMagentoSuccessWResults);
    });

    expectBothApiCall();
    expectResultAccordingToPvis(ResultCode.Success, '');

    it('should return combined data from pvis and magento', () => {
      expect(r.data).toEqual({ ...PVIS_PRODUCT_CONVERTED, ...MAGENTO_PRODUCT_CONVERTED });
    });
  });

  describe('when Pvis success and Magento failed', () => {
    beforeAll(async () => {
      r = await getDetailWithMock(mockPvisSuccessWResults, mockMagentoFailureNoResults);
    });

    expectBothApiCall();
    expectResultAccordingToPvis(ResultCode.Success, '');

    it('should return data from pvis only', () => {
      expect(r.data).toEqual(PVIS_PRODUCT_CONVERTED);
    });
  });

  describe('when Pvis fail and Magento success', () => {
    beforeAll(async () => {
      r = await getDetailWithMock(mockPvisFailureNoResults, mockMagentoSuccessWResults);
    });

    expectBothApiCall();
    expectResultAccordingToPvis(ResultCode.Failure, 'xyz');

    it('should return data from pvis only', () => {
      expect(r.data).toBeNull();
    });
  });

  function expectBothApiCall() {
    it('should call Teko.PSService.getProductDetail and Teko.MagentoService.getProductDetail', () => {
      expect(Teko.PvisService.getProductDetail).toBeCalledWith('12345678');
      expect(Teko.MagentoService.getProductDetail).toBeCalledWith('12345678');
    });
  }

  function expectResultAccordingToPvis(code: ResultCode, message: string) {
    it('should return result according to result of Teko.PvisService.getProductDetail', () => {
      expect(r.code).toBe(code);
      expect(r.message).toBe(message);
    });
  }
});
