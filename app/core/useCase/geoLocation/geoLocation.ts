export interface Location {
  code: string;
  name: string;
}

export interface Province extends Location {
  region: string;
}

export interface District extends Location {
  province: Province;
}

export interface Commune extends Location {
  district: District;
}

export interface LocationQuery {
  name?: string;
  code?: string;
}

export interface LocationCodes {
  province?: string;
  district?: string;
  commune?: string;
}

export interface GeoLocationData {
  provinces: Province[];
  districts: { [provinceCode: string]: Location[] };
  communes: { [districtCode: string]: Location[] };
}

class GeoLocation {
  data: GeoLocationData = {
    provinces: [],
    districts: {},
    communes: {}
  };

  update(geoData: GeoLocationData) {
    this.data = geoData;
  }

  getProvinces(): Province[] {
    return this.data.provinces;
  }

  getDistrictsOfProvince(provinceCode: string): Location[] {
    return this.data.districts[provinceCode] ? this.data.districts[provinceCode] : [];
  }

  getCommunesOfDistrict(districtCode: string): Location[] {
    return this.data.communes[districtCode] ? this.data.communes[districtCode] : [];
  }

  getProvince(query: LocationQuery): Province {
    let { key, value } = this.parseQuery(query);
    return key && value ? this.data.provinces.find(d => d[key] === value) : null;
  }

  getDistrict(query: LocationQuery): District {
    let district = this.queryLocation(query, this.data.districts);
    if (district) {
      let code = this.getGeoCodes(district.code);
      let province = this.getProvince({ code: code.province });
      return {
        ...district,
        province
      };
    }

    return null;
  }

  getCommune(query: LocationQuery): Commune {
    let commune = this.queryLocation(query, this.data.communes);
    if (commune) {
      let code = this.getGeoCodes(commune.code);
      let district = this.getDistrict({ code: code.district });
      return {
        ...commune,
        district
      };
    }

    return null;
  }

  parseQuery(query: LocationQuery): { key: keyof Location; value: string } {
    let key: keyof Location = null;
    let value: string = null;
    if ('name' in query) {
      key = 'name';
      value = query.name;
    }
    if ('code' in query) {
      key = 'code';
      value = query.code;
    }

    return { key, value };
  }

  queryLocation(query: LocationQuery, locationMap: { [code: string]: Location[] }): Location {
    let { key, value } = this.parseQuery(query);
    for (let code in locationMap) {
      let location = locationMap[code].find(d => d[key] === value);
      if (location) {
        return location;
      }
    }

    return null;
  }

  getGeoCodes(code: string): LocationCodes {
    if (code.length === 6) {
      return { province: code.slice(0, 2), district: code.slice(0, 4), commune: code };
    } else if (code.length === 4) {
      return { province: code.slice(0, 2), district: code.slice(0, 4) };
    } else if (code.length === 2) {
      return { province: code };
    } else {
      return {};
    }
  }

  makeFullAddress(location: { address?: string; provinceCode?: string; districtCode?: string; communeCode?: string }): string {
    let addrs = [];
    let { address, provinceCode, districtCode, communeCode } = location;

    address && addrs.push(address);
    let commune = this.getCommune({ code: communeCode });
    if (commune) {
      addrs.push(commune.name);
      districtCode = commune.district.code;
    }
    let district = this.getDistrict({ code: districtCode });
    if (district) {
      addrs.push(district.name);
      provinceCode = district.province.code;
    }
    let province = this.getProvince({ code: provinceCode });
    if (province) {
      addrs.push(province.name);
    }

    return addrs.join(', ');
  }
}

export default new GeoLocation();
