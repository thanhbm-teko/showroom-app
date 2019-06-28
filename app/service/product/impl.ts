import { FullInfoProduct, PartialInfoProduct } from '../../core/model/product';
import { ResultCode, getDefaultApiResult } from '../../core/model/ResultCode';
import { ProductService, ProductSearchResult, ProductDetailResult } from '../../core/service/product/interface';
import { ProductFilterData } from '../../core/useCase/searchProduct/filter';
import { ProductSortData } from '../../core/useCase/searchProduct/sort';
import Teko from '../serviceProvider';
import Adapter from '../serviceAdapter';
import { runApiParallel } from '../serviceUtil';

export class ProductServiceImpl implements ProductService {
  name: 'Product';

  async search(
    query: string,
    filter: ProductFilterData,
    sort: ProductSortData,
    offset: number,
    limit: number
  ): Promise<ProductSearchResult> {
    let r = await Teko.PSService.search(query, filter, sort, offset, limit);
    r.data = r.data.map((p: PS.Product) => Adapter.PS.convertProduct(<PartialInfoProduct>{}, p));
    return r;
  }

  async getDetail(sku: string): Promise<ProductDetailResult> {
    let [pvisRes, magentoRes] = await runApiParallel([
      () => Teko.PvisService.getProductDetail(sku),
      () => Teko.MagentoService.getProductDetail(sku)
    ]);

    let r = pvisRes;
    if (pvisRes.code === ResultCode.Success) {
      r.data = Adapter.Pvis.convertProduct(null, pvisRes.data);
      if (magentoRes.code === ResultCode.Success) {
        r.data = Adapter.Magento.convertProduct(r.data, magentoRes.data);
      }
    }

    return r;
  }
}
