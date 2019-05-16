import dbApi from '../dbApi';
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

describe('getProductDetail', () => {
  describe('when api success', () => {
    beforeAll(async () => {
      axios.get = jest.fn(mockApiSuccess);
      r = await PSService.search('abc', null, null, 0, 10);
    });

    expectCorrectUrlCall();

    it('should return status success and data', () => {
      expect(r.code).toBe(ResultCode.Success);
      expect(r.data).toEqual([1, 2, 3]);
      expect(r.message).toBe('');
    });
  });

  describe('when api failure', () => {
    beforeAll(async () => {
      axios.get = jest.fn(mockApiFailure);
      r = await PSService.search('abc', null, null, 0, 10);
    });

    expectCorrectUrlCall();

    it('should return status success and data', () => {
      expect(r.code).toBe(ResultCode.Failure);
      expect(r.data).toEqual([]);
      expect(r.message).toBe('bad request');
    });
  });

  describe('when api exception', () => {
    beforeAll(async () => {
      axios.get = jest.fn(mockApiException);
      r = await PSService.search('abc', null, null, 0, 10);
    });

    expectCorrectUrlCall();

    it('should return status success and data', () => {
      expect(r.code).toBe(ResultCode.Failure);
      expect(r.data).toEqual([]);
      expect(r.message).toBe('test exception');
    });
  });

  function expectCorrectUrlCall() {
    it('should send correct url by axios', () => {
      expect(axios.get).toBeCalledWith(
        'http://search.phongvu.vn/api?query=abc&page=0&mode=operator&channelId=offline&userId=test-test-test-test'
      );
    });
  }
});
