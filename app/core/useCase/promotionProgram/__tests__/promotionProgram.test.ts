import { PromotionListResult } from '../../../service/promotion/interface';
import ServiceLocator from '../../../service/serviceLocator';
import { ResultCode } from '../../../model/ResultCode';
import { PromotionData, getInitialPromotionData, fetchPromotions, getPromotionsForProduct } from '../promotionProgram';

import PROMOTIONS from './__fixtures__/promotions.json';
import PRODUCT from '../../productDetail/__tests__/__fixtures__/product.json';

let mockApiSuccessWResults = async () => <PromotionListResult>{ code: ResultCode.Success, data: <unknown>PROMOTIONS };
let mockApiSuccessNoResults = async () => <PromotionListResult>{ code: ResultCode.Success, data: [] };
let mockApiFailureNoResults = async () => <PromotionListResult>{ code: ResultCode.Failure, data: [] };
let promotionData: PromotionData = null;

describe('getPromotionList', () => {
  describe('when call success with no results', () => {
    beforeAll(async () => {
      ServiceLocator.getPromotionService().list = jest.fn(mockApiSuccessNoResults);
      promotionData = getInitialPromotionData();
      promotionData = await fetchPromotions(promotionData);
    });

    it('should call PromotionService.list', async () => {
      expect(ServiceLocator.getPromotionService().list).toBeCalled();
    });

    it('should correctly set return value from PromotionService', async () => {
      expect(promotionData.promotions).toEqual([]);
    });
  });

  describe('when call success with results', () => {
    it('should correctly set the return data', async () => {
      ServiceLocator.getPromotionService().list = jest.fn(mockApiSuccessWResults);
      promotionData = getInitialPromotionData();
      promotionData = await fetchPromotions(promotionData);

      expect(promotionData.promotions).toEqual(PROMOTIONS);
    });
  });

  describe('when call failure', () => {
    beforeAll(async () => {
      ServiceLocator.getPromotionService().list = jest.fn(mockApiFailureNoResults);
      promotionData = getInitialPromotionData();
      promotionData = await fetchPromotions(promotionData);
    });

    it('should correctly set return value from ProductService', async () => {
      expect(promotionData.promotions).toEqual([]);
    });
  });
});

describe('getPromotionsForProduct', () => {
  beforeAll(async () => {
    ServiceLocator.getPromotionService().list = jest.fn(mockApiSuccessWResults);
    promotionData = getInitialPromotionData();
    promotionData = await fetchPromotions(promotionData);
  });

  describe('when call', () => {
    it('should return correctly the applicable promotions', () => {
      let promotions = getPromotionsForProduct(promotionData, PRODUCT);
      expect(promotions).toContainEqual(PROMOTIONS[0]);
      expect(promotions).toContainEqual(PROMOTIONS[1]);
      expect(promotions).toContainEqual(PROMOTIONS[2]);
      expect(promotions).not.toContainEqual(PROMOTIONS[3]);
    });
  });
});
