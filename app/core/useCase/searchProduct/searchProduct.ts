import { PartialInfoProduct } from '../../model/Product';
import { ResultCode } from '../../model/ResultCode';
import ServiceLocator from '../../service/serviceLocator';
import { ProductFilterData, getInitialFilterData } from './filter';
import { ProductSortData, getInitialSortData } from './sort';

export const DEFAULT_LIMIT = 10;

export interface ProductSearchData {
  results: PartialInfoProduct[];
  offset: number;
  limit: number;
  query: string;
  filter: ProductFilterData;
  sort: ProductSortData;
  lastResultCode: ResultCode;
}

export function getInitialSearchData(): ProductSearchData {
  return {
    results: [],
    offset: 0,
    limit: DEFAULT_LIMIT,
    query: '',
    filter: getInitialFilterData(),
    sort: getInitialSortData(),
    lastResultCode: ResultCode.Success
  };
}

export function setQuery(searchData: ProductSearchData, query: string): ProductSearchData {
  return { ...searchData, query: query.trim() };
}

export async function searchProduct(searchData: ProductSearchData): Promise<ProductSearchData> {
  let newSearchData = { ...searchData };
  let { query, filter, sort, limit } = searchData;
  let res = await ServiceLocator.getProductService().search(query, filter, sort, 0, limit);

  if (res.code === ResultCode.Success) {
    newSearchData.results = res.data;
    newSearchData.offset = searchData.limit;
  } else {
    newSearchData = getInitialSearchData();
  }

  newSearchData.lastResultCode = res.code;
  return newSearchData;
}

export async function searchMoreProduct(searchData: ProductSearchData): Promise<ProductSearchData> {
  let newSearchData = { ...searchData };
  let { query, filter, sort, offset, limit } = searchData;
  let res = await ServiceLocator.getProductService().search(query, filter, sort, offset, limit);

  if (res.code === ResultCode.Success) {
    newSearchData.results = [...searchData.results, ...res.data];
    newSearchData.offset += searchData.limit;
  }

  newSearchData.lastResultCode = res.code;
  return newSearchData;
}
