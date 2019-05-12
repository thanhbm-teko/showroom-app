import axios, { AxiosResponse } from 'axios';
import PSService from '../index';
import { ApiResult, ResultCode } from '../../../../core/model/ResultCode';

let mockApiSuccess = async () =>
  <AxiosResponse>(<unknown>{ status: 200, statusText: 'ok', data: { data: { data: { products: [1, 2, 3] } } } });
let mockApiFailure = async () => <AxiosResponse>(<unknown>{ status: 400, statusText: 'bad request', data: null });
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
