import { FullInfoProduct, PartialInfoProduct } from '../../core/model/product';
import { ResultCode, ApiResult, getDefaultApiResult } from '../../core/model/ResultCode';
import { ProductService, ProductSearchResult, ProductDetailResult } from '../../core/service/product/interface';
import { ProductFilterData } from '../../core/useCase/searchProduct/filter';
import { ProductSortData } from '../../core/useCase/searchProduct/sort';
import Teko from '../serviceProvider';
import Adapter from '../serviceAdapter';

class ProductServiceImpl implements ProductService {
  name: 'Product';
  async search(
    query: string,
    filter: ProductFilterData,
    sort: ProductSortData,
    offset: number,
    limit: number
  ): Promise<ProductSearchResult> {
    let r = getDefaultApiResult([]);
    r = await Teko.PSService.search(query, filter, sort, offset, limit);
    r.data = r.data.map((p: PS.Product) => Adapter.PS.convertProduct(<PartialInfoProduct>{}, p));
    return r;
  }

  async getDetail(sku: string): Promise<ProductDetailResult> {
    let getAsiaDetailJob = new Promise<ApiResult>(async resolve => {
      let r = await Teko.PvisService.getProductDetail(sku);
      resolve(r);
    });

    let getMagentoDetailJob = new Promise<ApiResult>(async resolve => {
      let r = await Teko.MagentoService.getProductDetail(sku);
      resolve(r);
    });

    let [pvisRes, magentoRes] = await Promise.all([getAsiaDetailJob, getMagentoDetailJob]);
    let product: FullInfoProduct = <FullInfoProduct>{};
    let r = getDefaultApiResult();

    r = pvisRes;
    if (pvisRes.code === ResultCode.Success) {
      product = Adapter.Pvis.convertProduct(null, pvisRes.data);
    }
    if (magentoRes.code === ResultCode.Success) {
      product = Adapter.Magento.convertProduct(product, magentoRes.data);
    }
    r.data = product;
    return r;
  }
}

export default new ProductServiceImpl();
