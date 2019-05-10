import url from 'url';
import axios, { AxiosError } from 'axios';
import { FullInfoProduct } from '../../core/model/product';
import { ResultCode, getDefaultApiResult } from '../../core/model/ResultCode';
import { ProductService, ProductSearchResult, ProductDetailResult } from '../../core/service/product/interface';
import { ProductFilterData } from '../../core/useCase/searchProduct/filter';
import { ProductSortData } from '../../core/useCase/searchProduct/sort';
import Util from '../../core/util';
import PhongVu from '../serviceProvider';
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
    try {
      let page = Math.floor(offset / limit);
      let response = await axios.get(
        url.format({
          protocol: 'http',
          host: 'search.phongvu.vn',
          pathname: 'api',
          query: {
            query,
            page,
            mode: 'operator',
            channelId: 'offline',
            userId: Util.String.generateUuid()
          }
        })
      );

      if (response.status === 200) {
        r.code = ResultCode.Success;
        r.data = response.data.data.data.products;
      } else {
        r.message = response.statusText;
      }
    } catch (error) {
      r.message = (<AxiosError>error).message;
    }

    return r;
  }

  async getDetail(sku: string): Promise<ProductDetailResult> {
    let product: FullInfoProduct = <FullInfoProduct>{};
    let r = getDefaultApiResult();
    r = await PhongVu.PvisService.getProductDetail(sku);
    product = Adapter.Pvis.convertProduct(null, r.data);
    r = await PhongVu.MagentoService.getProductDetail(sku);
    product = Adapter.Magento.convertProduct(product, r.data);
    r.data = product;
    return r;
  }
}

export default new ProductServiceImpl();
