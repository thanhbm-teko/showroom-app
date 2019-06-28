import url from 'url';
import { ApiResult } from '../../apiDefine';
import Client from '../../client';

export async function getPromotions(): Promise<ApiResult> {
  return Client.request({
    method: 'get',
    url: url.format({
      ...Client.getServerConfig('ppm'),
      pathname: 'promotions',
      query: {
        channel: 'phong_vu_showroom'
      }
    })
  });
}
