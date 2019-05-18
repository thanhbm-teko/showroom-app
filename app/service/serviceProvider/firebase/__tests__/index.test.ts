import DbApi from '../dbApi';
import FirebaseService from '../index';
import { ApiResult, ResultCode } from '../../../../core/model/ResultCode';

import LegacyPromotion = Firebase.LegacyPromotion;
import LEGACY_PROMOTIONS from './__fixtures__/legacy_promotions.json';
import LEGACY_PROMOTIONS_DETAIL from './__fixtures__/legacy_promotions_detail.json';

let mockApiListSuccess = async () => <{ [key: string]: LegacyPromotion.Condition }>LEGACY_PROMOTIONS;
let mockApiListFail = async () => <{ [key: string]: LegacyPromotion.Condition }>{};
let mockApiDetailSuccess = async (key: string) =>
  <LegacyPromotion.Detail>(<{ [key: string]: LegacyPromotion.Condition }>LEGACY_PROMOTIONS_DETAIL)[key];
let mockApiDetailFail = async (key: string) => <LegacyPromotion.Detail>null;

let mockApiException = async () => {
  throw new Error('test exception');
};
let r: ApiResult = null;

describe('FirebaseService.getLegacyPromotions', () => {
  beforeAll(() => {
    Date.now = jest.fn(() => 2000);
  });

  describe('when call api success', () => {
    beforeAll(async () => {
      DbApi.getLegacyPromotions = jest.fn(mockApiListSuccess);
      DbApi.getLegacyPromotionDetail = jest.fn(mockApiDetailSuccess);
      r = await FirebaseService.getLegacyPromotions();
    });

    it('should return status success and data', () => {
      expect(r.code).toBe(ResultCode.Success);
      expect(r.data).toEqual([LEGACY_PROMOTIONS_DETAIL.Xa_hang_NVL_102018]);
      expect(r.message).toBe('');
    });
  });

  describe('when call api getLegacyPromotions fail', () => {
    beforeAll(async () => {
      DbApi.getLegacyPromotions = jest.fn(mockApiListFail);
      DbApi.getLegacyPromotionDetail = jest.fn(mockApiDetailSuccess);
      r = await FirebaseService.getLegacyPromotions();
    });

    it('should return status success and data empty array', () => {
      expect(r.code).toBe(ResultCode.Success);
      expect(r.data).toEqual([]);
      expect(r.message).toBe('');
    });
  });

  describe('when call api getLegacyPromotionDetail fail', () => {
    beforeAll(async () => {
      DbApi.getLegacyPromotions = jest.fn(mockApiListSuccess);
      DbApi.getLegacyPromotionDetail = jest.fn(mockApiDetailFail);
      r = await FirebaseService.getLegacyPromotions();
    });

    it('should return status success and data empty array', () => {
      expect(r.code).toBe(ResultCode.Success);
      expect(r.data).toEqual([]);
      expect(r.message).toBe('');
    });
  });

  describe('when call api exception', () => {
    it('should return status failure and data empty array when api detail exception', async () => {
      DbApi.getLegacyPromotions = jest.fn(mockApiListSuccess);
      DbApi.getLegacyPromotionDetail = jest.fn(mockApiException);
      r = await FirebaseService.getLegacyPromotions();
      expect(r.code).toBe(ResultCode.Failure);
      expect(r.data).toEqual([]);
      expect(r.message).toBe('test exception');
    });

    it('should return status failure and data empty array when api list exception', async () => {
      DbApi.getLegacyPromotions = jest.fn(mockApiException);
      DbApi.getLegacyPromotionDetail = jest.fn(mockApiDetailSuccess);
      r = await FirebaseService.getLegacyPromotions();
      expect(r.code).toBe(ResultCode.Failure);
      expect(r.data).toEqual([]);
      expect(r.message).toBe('test exception');
    });
  });
});
