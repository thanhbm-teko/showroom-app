import { Service } from '../serviceLocator';
import { ResultCode, ApiResult } from '../../model/ResultCode';
import { PartialInfoProduct, FullInfoProduct } from '../../model/Product';
import { ProductFilterData } from '../../useCase/searchProduct/filter';
import { ProductSortData } from '../../useCase/searchProduct/sort';

export interface ProductDetailResult extends ApiResult {
  data: FullInfoProduct;
}

export type GetProductDetailFunc = (sku: string) => Promise<ProductDetailResult>;

export interface ProductSearchResult extends ApiResult {
  data: PartialInfoProduct[];
}

export type SearchProductFunc = (
  query: string,
  filter: ProductFilterData,
  sort: ProductSortData,
  offset: number,
  limit: number
) => Promise<ProductSearchResult>;

export interface ProductService extends Service {
  search: SearchProductFunc;
  getDetail: GetProductDetailFunc;
}
