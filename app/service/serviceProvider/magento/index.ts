import url from 'url';
import { ApiResult } from '../../apiDefine';
import Client from '../../client';

export async function getProductDetail(sku: string): Promise<ApiResult> {
  return Client.request({
    method: 'get',
    url: url.format({
      ...Client.getServerConfig('magento'),
      pathname: '/api-v2/product/list',
      query: {
        sku
      }
    })
  });
}
