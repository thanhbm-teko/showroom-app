import GeoLocation, { GeoLocationData } from '../geoLocation';
import GEODATA from './__fixtures__/geodata.json';

describe('GeoLocation class', () => {
  beforeAll(() => {
    GeoLocation.update(<GeoLocationData>GEODATA);
  });

  describe('when call getGeoCodes()', () => {
    it('should return province code when param is 2-length code', () => {
      let code = GeoLocation.getGeoCodes('01');
      expect(code).toEqual({ province: '01' });
    });

    it('should return province & district code when param is 4-length code', () => {
      let code = GeoLocation.getGeoCodes('0119');
      expect(code).toEqual({ province: '01', district: '0119' });
    });

    it('should return province & district & commune code when param is 6-length code', () => {
      let code = GeoLocation.getGeoCodes('011901');
      expect(code).toEqual({ province: '01', district: '0119', commune: '011901' });
    });
  });

  describe('when call getProvinces()', () => {
    it('should return array of 63 provinces', () => {
      let provinces = GeoLocation.getProvinces();
      expect(provinces).toHaveLength(63);
    });
  });

  describe('when call getProvince()', () => {
    it('should return Thành phố Hà Nội when param is {code: 01}', () => {
      let province = GeoLocation.getProvince({ code: '01' });
      expect(province).toEqual({ code: '01', name: 'Thành phố Hà Nội', regionCode: '1' });
    });

    it('should return code 01 when param is {name: Thành phố Hà Nội}', () => {
      let province = GeoLocation.getProvince({ name: 'Thành phố Hà Nội' });
      expect(province).toEqual({ code: '01', name: 'Thành phố Hà Nội', regionCode: '1' });
    });
  });

  describe('when call getDistrictsOfProvince()', () => {
    it('should return array of 30 districts when param is province 01', () => {
      let provinces = GeoLocation.getDistrictsOfProvince('01');
      expect(provinces).toHaveLength(30);
    });
  });

  describe('when call getDistrict()', () => {
    it('should return Huyện Ba Vì when param is {code: 0119}', () => {
      let province = GeoLocation.getDistrict({ code: '0119' });
      expect(province).toEqual({
        code: '0119',
        name: 'Huyện Ba Vì',
        province: { code: '01', name: 'Thành phố Hà Nội', regionCode: '1' }
      });
    });

    it('should return code 0119 when param is {name: Thành phố Hà Nội}', () => {
      let province = GeoLocation.getDistrict({ name: 'Huyện Ba Vì' });
      expect(province).toEqual({
        code: '0119',
        name: 'Huyện Ba Vì',
        province: { code: '01', name: 'Thành phố Hà Nội', regionCode: '1' }
      });
    });
  });

  describe('when call getCommunesOfDistrict()', () => {
    it('should return array of 31 communes when param is district 0119', () => {
      let provinces = GeoLocation.getCommunesOfDistrict('0119');
      expect(provinces).toHaveLength(31);
    });
  });

  describe('when call getCommune()', () => {
    it('should return Thị trấn Tây Đằng when param is {code: 011901}', () => {
      let province = GeoLocation.getCommune({ code: '011901' });
      expect(province).toEqual({
        code: '011901',
        name: 'Thị Trấn Tây Đằng',
        district: { code: '0119', name: 'Huyện Ba Vì', province: { code: '01', name: 'Thành phố Hà Nội', regionCode: '1' } }
      });
    });

    it('should return code 011901 when param is {name: Thị Trấn Tây Đằng}', () => {
      let province = GeoLocation.getCommune({ name: 'Thị Trấn Tây Đằng' });
      expect(province).toEqual({
        code: '011901',
        name: 'Thị Trấn Tây Đằng',
        district: { code: '0119', name: 'Huyện Ba Vì', province: { code: '01', name: 'Thành phố Hà Nội', regionCode: '1' } }
      });
    });
  });

  describe('when call makeFullAddress()', () => {
    it('should return only address when provinceCode, districtCode and communeCode params not given', () => {
      let address = GeoLocation.makeFullAddress({ address: '123 ABC' });
      expect(address).toBe('123 ABC');
    });

    it('should return full address when only commune_id param given', () => {
      let address = GeoLocation.makeFullAddress({ address: '123 ABC', communeCode: '011901' });
      expect(address).toBe('123 ABC, Thị Trấn Tây Đằng, Huyện Ba Vì, Thành phố Hà Nội');
    });

    it('should return address with province, district when only districtCode param given', () => {
      let address = GeoLocation.makeFullAddress({ address: '123 ABC', districtCode: '0119' });
      expect(address).toBe('123 ABC, Huyện Ba Vì, Thành phố Hà Nội');
    });

    it('should return address with province when only provinceCode param given', () => {
      let address = GeoLocation.makeFullAddress({ address: '123 ABC', provinceCode: '01' });
      expect(address).toBe('123 ABC, Thành phố Hà Nội');
    });
  });
});
