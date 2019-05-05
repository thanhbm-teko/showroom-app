import url from 'url';
import axios from 'axios';
import { ResultCode } from '../../core/model/ResultCode';
import { ProductService, ProductSearchResult, ProductDetailResult } from '../../core/service/product/interface';
import { ProductFilterData } from '../../core/useCase/searchProduct/filter';
import { ProductSortData } from '../../core/useCase/searchProduct/sort';
import Util from '../../core/util';

class ProductServiceImpl implements ProductService {
  name: 'Product';
  async search(
    query: string,
    filter: ProductFilterData,
    sort: ProductSortData,
    offset: number,
    limit: number
  ): Promise<ProductSearchResult> {
    let page = Math.floor(offset / limit);
    let resp = await axios.get(
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

    if (resp.status === 200) {
      return {
        code: ResultCode.Success,
        data: resp.data.data.data.products
      };
    } else {
      return {
        code: ResultCode.Failure,
        data: []
      };
    }
  }

  getDetail(sku: string): Promise<ProductDetailResult> {
    return new Promise((resolve, reject) => {
      resolve({
        code: ResultCode.Success,
        data: null
      });
    });
  }
}

export default new ProductServiceImpl();
