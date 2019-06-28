import { FullInfoProduct, PartialInfoProduct } from '../../core/model/product';
import { ResultCode, getDefaultApiResult } from '../../core/model/ResultCode';
import { ProductService, ProductSearchResult, ProductDetailResult } from '../../core/service/product/interface';
import { ProductFilterData } from '../../core/useCase/searchProduct/filter';
import { ProductSortData } from '../../core/useCase/searchProduct/sort';
import Teko from '../serviceProvider';
import Adapter from '../serviceAdapter';
import { SearchRequestBuilder } from '../serviceProvider/pl/SearchRequestBuilder';

export class ProductServiceImplV2 implements ProductService {
  name: 'Product';

  async search(
    query: string,
    filter: ProductFilterData,
    sort: ProductSortData,
    offset: number,
    limit: number
  ): Promise<ProductSearchResult> {
    let page = Math.floor(offset / limit);
    let searchRequest = new SearchRequestBuilder('pv_showroom', 'CP09', 'test-test-test-test')
      .query(query)
      .filterCategories([filter.category])
      .filterByPrice(filter.priceFrom, filter.priceTo)
      .sortBy(sort.mode, sort.stockLocation)
      .orderBy(sort.isAscending ? 'asc' : 'desc')
      .setPage(page)
      .build();

    let r = await Teko.PLService.search(searchRequest);
    r.data = r.data.map((p: PL.Product) => Adapter.PL.convertProduct(<PartialInfoProduct>{}, p));
    return r;
  }

  async getDetail(sku: string): Promise<ProductDetailResult> {
    let r = await Teko.PLService.getProductDetail(sku);
    r.data = r.data.map((p: PL.Product) => Adapter.PL.convertProduct(<PartialInfoProduct>{}, p));
    return r;
  }
}
