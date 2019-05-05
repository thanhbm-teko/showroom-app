import { ResultCode } from '../../../model/ResultCode';
import { ProductDetailsData, getInitialDetailData, getProductDetail } from '../productDetail';
import ServiceLocator from '../../../service/serviceLocator';
import { ProductDetailResult } from '../../../service/product/interface';

import PRODUCT from './__fixtures__/product.json';

let mockGetDetailSuccessWResult = async () => <ProductDetailResult>{ code: ResultCode.Success, data: PRODUCT };
let mockGetDetailFailureNoResult = async () => <ProductDetailResult>{ code: ResultCode.Failure, data: null };
let detailData: ProductDetailsData = null;
let newDetailData: ProductDetailsData = null;

describe('getProductDetail', () => {
  describe('when call success with result', () => {
    beforeAll(async () => {
      Date.now = jest.fn(() => 123456789);
      ServiceLocator.getProductService().getDetail = jest.fn(mockGetDetailSuccessWResult);
      detailData = getInitialDetailData();
      newDetailData = await getProductDetail(detailData, '1204495');
    });

    it('should call ProductService.getDetail', () => {
      expect(ServiceLocator.getProductService().getDetail).toBeCalledWith('1204495');
    });

    it('should update the result data', () => {
      expect(newDetailData.lastResultCode).toBe(ResultCode.Success);
      expect(newDetailData.skus['1204495'].detail).toBe(PRODUCT);
      expect(newDetailData.skus['1204495'].updatedAt).toBe(123456789);
    });

    describe('when next call fail', () => {
      it('should keep the existing data', async () => {
        Date.now = jest.fn(() => 987654321);
        ServiceLocator.getProductService().getDetail = jest.fn(mockGetDetailFailureNoResult);
        newDetailData = await getProductDetail(newDetailData, '1204495');

        expect(ServiceLocator.getProductService().getDetail).toBeCalledWith('1204495');
        expect(newDetailData.lastResultCode).toBe(ResultCode.Failure);
        expect(newDetailData.skus['1204495'].detail).toBe(PRODUCT);
        expect(newDetailData.skus['1204495'].updatedAt).toBe(123456789);
      });
    });
  });

  describe('when call fail', () => {
    beforeAll(async () => {
      Date.now = jest.fn(() => 123456789);
      ServiceLocator.getProductService().getDetail = jest.fn(mockGetDetailFailureNoResult);
      detailData = getInitialDetailData();
      newDetailData = await getProductDetail(detailData, '1204495');
    });

    it('should call ProductService.getDetail', () => {
      expect(ServiceLocator.getProductService().getDetail).toBeCalledWith('1204495');
    });

    it('should update the result data', () => {
      expect(newDetailData.lastResultCode).toBe(ResultCode.Failure);
      expect(newDetailData.skus['1204495']).toBe(undefined);
    });
  });
});
