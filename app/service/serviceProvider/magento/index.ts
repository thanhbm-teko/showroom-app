import url from 'url';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { ApiResult, getDefaultApiResult, ResultCode } from '../../../core/model/ResultCode';

class MagentoService {
  protocol: string = 'http';
  host: string = 'phongvu.vn';

  async getProductDetail(sku: string): Promise<ApiResult> {
    let r = getDefaultApiResult();
    try {
      let response: AxiosResponse = await axios.get(
        url.format({
          protocol: this.protocol,
          host: `${this.host}`,
          pathname: '/api-v2/product/list',
          query: {
            sku
          }
        })
      );

      if (response.status === 200) {
        r.code = ResultCode.Success;
        r.data = response.data.data[0];
      } else {
        r.message = response.statusText;
      }
    } catch (error) {
      r.message = (<AxiosError>error).message;
    }

    return r;
  }
}

export default new MagentoService();
