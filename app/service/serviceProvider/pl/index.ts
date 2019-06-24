import url from 'url';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { ApiResult, getDefaultApiResult, ResultCode } from '../../../core/model/ResultCode';
import { ProductFilterData } from '../../../core/useCase/searchProduct/filter';
import { ProductSortData } from '../../../core/useCase/searchProduct/sort';

class PLService {
  protocol: string = 'http';
  host: string = 'listing.teko.com';

  async search(
    query: string,
    filter: ProductFilterData,
    sort: ProductSortData,
    offset: number,
    limit: number
  ): Promise<ApiResult> {
    let r = getDefaultApiResult([]);
    try {
      let page = Math.floor(offset / limit);
      let response = await axios.get(
        url.format({
          protocol: this.protocol,
          host: this.host,
          pathname: 'api/search',
          query: {
            q: query,
            _page: page,
            channel: 'pv_showroom',
            visitorId: 'test-test-test-test'
          }
        })
      );

      if (response.status === 200) {
        r.code = ResultCode.Success;
        r.data = response.data.result.products;
      } else {
        r.message = response.statusText;
      }
    } catch (error) {
      r.message = (<AxiosError>error).message;
    }

    return r;
  }
}

export default new PLService();
