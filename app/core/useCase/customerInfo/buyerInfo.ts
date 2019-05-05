import GeoLocation, { Province, Location } from '../geoLocation/geoLocation';
import ServiceLocator from '../../service/serviceLocator';
import { Customer } from '../../model/customer';
import { ResultCode } from '../../model/ResultCode';
import { VoidFunc } from '../../model/Function';

export type ResultsChooseCallback = (foundCustomers: Customer[]) => Promise<Customer>;
export type ErrorCallback = (errorMessage: string) => void;

export const SCOPES_MAP: { [scopeCode: number]: string } = {
  1: 'Công việc'
};

export interface CustomerSearchCallbacks {
  chooseOneOfResults: ResultsChooseCallback;
  alertNoResults: VoidFunc;
  alertError: ErrorCallback;
}

export interface BuyerInfoData extends Customer {
  commune: string;
  district: string;
  province: string;
  provinces: Province[];
  districts: Location[];
  communes: Location[];
}

export function getInitialBuyerInfoData(): BuyerInfoData {
  return {
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
    provinces: GeoLocation.getProvinces(),
    districts: [],
    communes: []
  };
}

export function setName(buyerInfo: BuyerInfoData, name: string): BuyerInfoData {
  return {
    ...buyerInfo,
    name: name.trim()
  };
}

export function setProvince(buyerInfo: BuyerInfoData, provinceCode: string): BuyerInfoData {
  let province = GeoLocation.getProvince({ code: provinceCode });
  let districts = GeoLocation.getDistrictsOfProvince(provinceCode);
  let communes = GeoLocation.getCommunesOfDistrict(districts[0].code);

  return {
    ...buyerInfo,
    province: province.name,
    provinceCode: province.code,
    district: districts[0].name,
    districtCode: districts[0].code,
    commune: communes.length > 0 ? communes[0].name : '',
    communeCode: communes.length > 0 ? communes[0].code : '',
    districts,
    communes
  };
}

export function setDistrict(buyerInfo: BuyerInfoData, districtCode: string): BuyerInfoData {
  let district = GeoLocation.getDistrict({ code: districtCode });
  let communes = GeoLocation.getCommunesOfDistrict(districtCode);

  return {
    ...buyerInfo,
    district: district.name,
    districtCode: district.code,
    commune: communes.length > 0 ? communes[0].name : '',
    communeCode: communes.length > 0 ? communes[0].code : '',
    communes
  };
}

export function setCommune(buyerInfo: BuyerInfoData, communeCode: string): BuyerInfoData {
  let commune = GeoLocation.getCommune({ code: communeCode });
  return {
    ...buyerInfo,
    commune: commune.name,
    communeCode: commune.code
  };
}

export function setAddress(buyerInfo: BuyerInfoData, address: string): BuyerInfoData {
  return {
    ...buyerInfo,
    address: address.trim()
  };
}

export function setScope(buyerInfo: BuyerInfoData, scopeCode: number): BuyerInfoData {
  return {
    ...buyerInfo,
    scopeCode,
    scope: SCOPES_MAP[scopeCode]
  };
}

export async function setPhone(
  buyerInfo: BuyerInfoData,
  phone: string,
  callbacks: CustomerSearchCallbacks
): Promise<BuyerInfoData> {
  phone = phone.trim();
  let buyer: Customer = <Customer>{};
  let res = await ServiceLocator.getCustomerService().search(phone);
  if (res.code === ResultCode.Success) {
    if (res.data.length === 0) {
      callbacks.alertNoResults();
    } else if (res.data.length === 1) {
      buyer = res.data[0];
    } else {
      buyer = await callbacks.chooseOneOfResults(res.data);
    }
  } else {
    callbacks.alertError(res.message);
  }

  return {
    ...buyerInfo,
    ...populateGeoLocationInfo(buyerInfo, buyer),
    ...buyer,
    phone
  };
}

function populateGeoLocationInfo(buyerInfo: BuyerInfoData, buyer: Customer): BuyerInfoData {
  if (buyer.communeCode) {
    buyerInfo = setCommune(buyerInfo, buyer.communeCode);
  }
  if (buyer.districtCode) {
    buyerInfo = setDistrict(buyerInfo, buyer.districtCode);
  }
  if (buyer.provinceCode) {
    buyerInfo = setProvince(buyerInfo, buyer.provinceCode);
  }

  return buyerInfo;
}
