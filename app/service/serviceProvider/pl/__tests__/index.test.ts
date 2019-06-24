import axios, { AxiosResponse } from 'axios';
import PLService from '../index';
import { ApiResult, ResultCode } from '../../../../core/model/ResultCode';

let mockApiSuccess = async () =>
  <AxiosResponse>(<unknown>{ status: 200, statusText: 'ok', data: { code: 200, result: { products: [1, 2, 3] } } });
let mockApiFailure = async () => <AxiosResponse>(<unknown>{ status: 400, statusText: 'bad request', data: null });
let mockApiException = async () => {
  throw new Error('test exception');
};
let r: ApiResult = null;

describe('PLService.search', () => {
  describe('when api success', () => {
    beforeAll(async () => {
      axios.get = jest.fn(mockApiSuccess);
      r = await PLService.search('abc', null, null, 0, 10);
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
      r = await PLService.search('abc', null, null, 0, 10);
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
      r = await PLService.search('abc', null, null, 0, 10);
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
        'http://listing.teko.com/api/search?q=abc&_page=0&channel=pv_showroom&visitorId=test-test-test-test'
      );
    });
  }
});
