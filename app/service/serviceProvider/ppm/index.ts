import url from 'url';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { ApiResult, getDefaultApiResult, ResultCode } from '../../../core/model/ResultCode';

class PPMService {
  protocol: string = 'http';
  host: string = 'dev-ppm.phongvu.vn';

  async getPromotions(): Promise<ApiResult> {
    let r = getDefaultApiResult([]);
    try {
      let response = await axios.get(
        url.format({
          protocol: this.protocol,
          host: this.host,
          pathname: 'promotions',
          query: {
            channel: 'phong_vu_showroom'
          }
        })
      );

      if (response.status === 200) {
        r.code = ResultCode.Success;
        r.data = response.data.result.promotions;
      } else {
        r.message = response.statusText;
      }
    } catch (error) {
      r.message = (<AxiosError>error).message;
    }

    return r;
  }
}

export default new PPMService();
