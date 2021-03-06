import axios, { AxiosResponse } from 'axios';
import MagentoService from '../index';
import { ApiResult, ResultCode } from '../../../../core/model/ResultCode';

let mockApiSuccess = async () => <AxiosResponse>(<unknown>{ status: 200, statusText: 'ok', data: { data: [1] } });
let mockApiFailure = async () => <AxiosResponse>(<unknown>{ status: 400, statusText: 'bad request', data: null });
let mockApiException = async () => {
  throw new Error('test exception');
};
let r: ApiResult = null;

describe('getProductDetail', () => {
  describe('when api success', () => {
    beforeAll(async () => {
      axios.get = jest.fn(mockApiSuccess);
      r = await MagentoService.getProductDetail('123456');
    });

    expectCorrectUrlCall();

    it('should return status success and data', () => {
      expect(r.code).toBe(ResultCode.Success);
      expect(r.data).toBe(1);
      expect(r.message).toBe('');
    });
  });

  describe('when api failure', () => {
    beforeAll(async () => {
      axios.get = jest.fn(mockApiFailure);
      r = await MagentoService.getProductDetail('123456');
    });

    expectCorrectUrlCall();

    it('should return status success and data', () => {
      expect(r.code).toBe(ResultCode.Failure);
      expect(r.data).toBeNull();
      expect(r.message).toBe('bad request');
    });
  });

  describe('when api exception', () => {
    beforeAll(async () => {
      axios.get = jest.fn(mockApiException);
      r = await MagentoService.getProductDetail('123456');
    });

    expectCorrectUrlCall();

    it('should return status success and data', () => {
      expect(r.code).toBe(ResultCode.Failure);
      expect(r.data).toBeNull();
      expect(r.message).toBe('test exception');
    });
  });

  function expectCorrectUrlCall() {
    it('should send correct url by axios', () => {
      expect(axios.get).toBeCalledWith('http://phongvu.vn/api-v2/product/list?sku=123456');
    });
  }
});
