import { ResultCode } from '../../../model/ResultCode';
import {
  getInitialBuyerInfoData,
  setName,
  setProvince,
  BuyerInfoData,
  setDistrict,
  setCommune,
  setAddress,
  setScope,
  setPhone
} from '../buyerInfo';
import ServiceLocator from '../../../service/serviceLocator';
import { CustomerSearchResult } from '../../../service/customer/interface';
import GeoLocation from '../../geoLocation/geoLocation';

import GEODATA from '../../geoLocation/__tests__/__fixtures__/geodata.json';
import BUYER_SEARCH_RESULTS from './__fixtures__/buyer_search_results.json';

let mockSearchSuccessWResults = async (phone: string) =>
  <CustomerSearchResult>{ code: ResultCode.Success, message: 'ok', data: BUYER_SEARCH_RESULTS };
let mockSearchSuccessW1Result = async (phone: string) =>
  <CustomerSearchResult>{ code: ResultCode.Success, message: 'ok', data: [BUYER_SEARCH_RESULTS[0]] };
let mockSearchSuccessNoResults = async (phone: string) =>
  <CustomerSearchResult>{ code: ResultCode.Success, message: 'ok', data: [] };
let mockSearchFailureNoResults = async (phone: string) =>
  <CustomerSearchResult>{ code: ResultCode.Failure, message: 'error occurs', data: [] };
let buyerData: BuyerInfoData = null;
let newBuyerData: BuyerInfoData = null;

describe('BuyerInformation instance', () => {
  beforeAll(() => {
    GeoLocation.update(GEODATA);
  });

  describe('when call getInitialBuyerInfoData', () => {
    it('should return fields with empty values', () => {
      let buyerData = getInitialBuyerInfoData();
      expect(buyerData).toEqual({
        id: null,
        asiaId: '',
        name: '',
        phone: '',
        address: '',
        commune: '',
        communeCode: '',
        district: '',
        districtCode: '',
        province: '',
        provinceCode: '',
        scope: '',
        scopeCode: null,
        provinces: GEODATA.provinces,
        districts: [],
        communes: []
      });
    });
  });

  describe('when call setName', () => {
    it('should trim the spaces and set the name', () => {
      buyerData = getInitialBuyerInfoData();
      newBuyerData = setName(buyerData, '  Đỗ Nam Trung    ');
      expect(newBuyerData).toEqual({ ...buyerData, name: 'Đỗ Nam Trung' });
    });
  });

  describe('when call setProvince', () => {
    beforeAll(() => {
      buyerData = getInitialBuyerInfoData();
      buyerData = setProvince(buyerData, '01');
    });

    it('should set the province, provinceCode', () => {
      expect(buyerData).toMatchObject({
        province: 'Thành phố Hà Nội',
        provinceCode: '01'
      });
    });

    it('should calculate the districts inside this province', () => {
      expect(buyerData).toMatchObject({
        districts: GEODATA.districts['01']
      });
    });

    it('should set the district as first district inside this province', () => {
      expect(buyerData).toMatchObject({
        district: 'Huyện Ba Vì',
        districtCode: '0119'
      });
    });

    it('should calculate the communes inside this district', () => {
      expect(buyerData).toMatchObject({
        communes: GEODATA.communes['0119']
      });
    });

    it('should set the commune as first commune inside this district', () => {
      expect(buyerData).toMatchObject({
        commune: 'Thị Trấn Tây Đằng',
        communeCode: '011901'
      });
    });
  });

  describe('when call setDistrict', () => {
    beforeAll(() => {
      buyerData = getInitialBuyerInfoData();
      buyerData = setDistrict(buyerData, '0119');
    });

    it('should set the district, districtCode', () => {
      expect(buyerData).toMatchObject({
        district: 'Huyện Ba Vì',
        districtCode: '0119'
      });
    });

    it('should calculate the communes inside this district', () => {
      expect(buyerData).toMatchObject({
        communes: GEODATA.communes['0119']
      });
    });

    it('should set the commune as first commune inside this district', () => {
      expect(buyerData).toMatchObject({
        commune: 'Thị Trấn Tây Đằng',
        communeCode: '011901'
      });
    });
  });

  describe('when call setCommune', () => {
    it('should set the commune, communeCode', () => {
      buyerData = getInitialBuyerInfoData();
      buyerData = setCommune(buyerData, '011930');
      expect(buyerData).toMatchObject({
        commune: 'Xã Yên Bài',
        communeCode: '011930'
      });
    });
  });

  describe('when call setAddress', () => {
    it('should trim the spaces and set the address', () => {
      buyerData = getInitialBuyerInfoData();
      buyerData = setAddress(buyerData, '  54 Nguyễn Chí Thanh, Vincom Center    ');
      expect(buyerData).toMatchObject({
        address: '54 Nguyễn Chí Thanh, Vincom Center'
      });
    });
  });

  describe('when call setAddress', () => {
    it('should trim the spaces and set the address', () => {
      buyerData = getInitialBuyerInfoData();
      buyerData = setAddress(buyerData, '  54 Nguyễn Chí Thanh, Vincom Center    ');
      expect(buyerData).toMatchObject({
        address: '54 Nguyễn Chí Thanh, Vincom Center'
      });
    });
  });

  describe('when call setPurpose', () => {
    it('should set the scope purpose', () => {
      buyerData = getInitialBuyerInfoData();
      buyerData = setScope(buyerData, 1);
      expect(buyerData).toMatchObject({
        scope: 'Công việc',
        scopeCode: 1
      });
    });
  });

  describe('when call setPurpose', () => {
    it('should set the scope purpose', () => {
      buyerData = getInitialBuyerInfoData();
      buyerData = setScope(buyerData, 1);
      expect(buyerData).toMatchObject({
        scope: 'Công việc',
        scopeCode: 1
      });
    });
  });

  describe('when call setPhone', () => {
    describe('when no buyers found', () => {
      let alertNoResults = jest.fn();
      let chooseOneOfResults = jest.fn();
      let alertError = jest.fn();

      beforeAll(async () => {
        ServiceLocator.getCustomerService().search = jest.fn(mockSearchSuccessNoResults);
        buyerData = getInitialBuyerInfoData();
        newBuyerData = await setPhone(buyerData, '  0987654321    ', {
          alertError,
          alertNoResults,
          chooseOneOfResults
        });
      });

      it('should trim the spaces and set the phone', () => {
        expect(newBuyerData.phone).toBe('0987654321');
      });

      it('should call ServiceLocator.search', () => {
        expect(ServiceLocator.getCustomerService().search).toBeCalledWith('0987654321');
      });

      it('should keep the current buyer data and return list results', () => {
        expect(newBuyerData).toEqual({ ...buyerData, phone: '0987654321' });
      });

      it('should only call alertNoResults', () => {
        expect(alertNoResults).toBeCalled();
        expect(chooseOneOfResults).not.toBeCalled();
        expect(alertError).not.toBeCalled();
      });
    });

    describe('when only 1 buyer found', () => {
      let alertNoResults = jest.fn();
      let chooseOneOfResults = jest.fn();
      let alertError = jest.fn();

      beforeAll(async () => {
        ServiceLocator.getCustomerService().search = jest.fn(mockSearchSuccessW1Result);
        buyerData = getInitialBuyerInfoData();
        newBuyerData = await setPhone(buyerData, '  0987654321    ', {
          alertError,
          alertNoResults,
          chooseOneOfResults
        });
      });

      it('should trim the spaces and set the phone', async () => {
        expect(newBuyerData.phone).toBe('0987654321');
      });

      it('should call CustomerService.search', async () => {
        expect(ServiceLocator.getCustomerService().search).toBeCalledWith('0987654321');
      });

      it('should return the found buyer', async () => {
        expect(newBuyerData).toEqual({
          ...BUYER_SEARCH_RESULTS[0],
          province: 'Thành phố Hà Nội',
          provinces: GEODATA.provinces,
          district: 'Huyện Ba Vì',
          districts: GEODATA.districts['01'],
          commune: 'Thị Trấn Tây Đằng',
          communes: GEODATA.communes['0119']
        });
      });

      it('should not call any callbacks', () => {
        expect(alertError).not.toBeCalled();
        expect(alertNoResults).not.toBeCalled();
        expect(chooseOneOfResults).not.toBeCalled();
      });
    });

    describe('when many buyers found', () => {
      let alertNoResults = jest.fn();
      let alertError = jest.fn();
      let chooseOneOfResults = jest.fn(async buyers => buyers[1]);

      beforeAll(async () => {
        ServiceLocator.getCustomerService().search = jest.fn(mockSearchSuccessWResults);
        buyerData = getInitialBuyerInfoData();
        newBuyerData = await setPhone(buyerData, '  0987654321    ', {
          alertError,
          alertNoResults,
          chooseOneOfResults
        });
      });

      it('should trim the spaces and set the phone', async () => {
        expect(newBuyerData.phone).toBe('0987654321');
      });

      it('should call CustomerService.searchCustomer', async () => {
        expect(ServiceLocator.getCustomerService().search).toBeCalledWith('0987654321');
      });

      it('should return buyer 1 among the results', async () => {
        expect(newBuyerData).toEqual({
          ...buyerData,
          ...BUYER_SEARCH_RESULTS[1],
          province: 'Thành phố Đà Nẵng',
          provinces: GEODATA.provinces,
          district: 'Hoàng Sa',
          districts: GEODATA.districts['48'],
          commune: '',
          communes: []
        });
      });

      it('should only call chooseOneOfResults with the results as param', () => {
        expect(chooseOneOfResults).toBeCalledWith(BUYER_SEARCH_RESULTS);
        expect(alertNoResults).not.toBeCalled();
        expect(alertError).not.toBeCalled();
      });
    });

    describe('when api return error', () => {
      let alertNoResults = jest.fn();
      let chooseOneOfResults = jest.fn();
      let alertError = jest.fn();

      beforeAll(async () => {
        ServiceLocator.getCustomerService().search = jest.fn(mockSearchFailureNoResults);
        buyerData = getInitialBuyerInfoData();
        newBuyerData = await setPhone(buyerData, '  0987654321    ', {
          alertError,
          alertNoResults,
          chooseOneOfResults
        });
      });

      it('should trim the spaces and set the phone', () => {
        expect(newBuyerData.phone).toBe('0987654321');
      });

      it('should call ServiceLocator.search', () => {
        expect(ServiceLocator.getCustomerService().search).toBeCalledWith('0987654321');
      });

      it('should keep the current buyer data', () => {
        expect(newBuyerData).toEqual({ ...buyerData, phone: '0987654321' });
      });

      it('should call only alertError', () => {
        expect(alertError).toBeCalledWith('error occurs');
        expect(chooseOneOfResults).not.toBeCalled();
        expect(alertNoResults).not.toBeCalled();
      });
    });
  });
});
