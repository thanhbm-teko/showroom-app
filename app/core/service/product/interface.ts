import { Service } from '../serviceLocator';
import { ResultCode } from '../../model/ResultCode';
import { PartialInfoProduct, FullInfoProduct } from '../../model/Product';
import { ProductFilterData } from '../../useCase/searchProduct/filter';
import { ProductSortData } from '../../useCase/searchProduct/sort';

export interface ProductDetailResult {
  code: ResultCode;
  data: FullInfoProduct;
}

export type GetProductDetailFunc = (sku: string) => Promise<ProductDetailResult>;

export interface ProductSearchResult {
  code: ResultCode;
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
