import url from 'url';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { ApiResult, getDefaultApiResult, ResultCode } from '../../../core/model/ResultCode';

class PvisService {
  protocol: string = 'https';
  host: string = 'pvis.teko.vn';

  async getProductDetail(sku: string): Promise<ApiResult> {
    let r = getDefaultApiResult();
    try {
      let response: AxiosResponse = await axios.get(
        url.format({
          protocol: this.protocol,
          host: this.host,
          pathname: `api/products/${sku}`,
          query: {
            DISABLE_SIGN: 2018
          }
        })
      );

      if (response.status === 200) {
        r.code = ResultCode.Success;
        r.data = response.data;
      } else {
        r.message = response.statusText;
      }
    } catch (error) {
      r.message = (<AxiosError>error).message;
    }

    return r;
  }
}

export default new PvisService();
